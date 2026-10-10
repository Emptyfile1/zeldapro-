import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SEG = 14; // segments per rod arc
const CS = 18; // segments per interior arc
const rnd = () => Math.random() - 0.5;

/**
 * Icosahedron of solid metal rods with a hollow core and a slow electric pulse.
 * Drag to rotate. Respects prefers-reduced-motion. Needs: npm i three
 */
export const Polyhedron = ({ className = '' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvas = renderer.domElement;
    canvas.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;touch-action:none';
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
    camera.position.set(0, 0, 8.5);
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(3, 5, 4);
    scene.add(dl);
    const p1 = new THREE.PointLight(0x5a7dff, 2.4, 16);
    p1.position.set(-4, 2, 4);
    scene.add(p1);
    const p2 = new THREE.PointLight(0xff5fd0, 1.8, 16);
    p2.position.set(4, -2, 4);
    scene.add(p2);

    const UP = new THREE.Vector3(0, 1, 0);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0x2b3558, metalness: 0.85, roughness: 0.28, emissive: 0x0c1640 });
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x4a5a96, metalness: 0.8, roughness: 0.2, emissive: 0x1a2a70 });
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const geos = [];

    // soft glow sprite texture (subtle halo effect)
    const gc = document.createElement('canvas');
    gc.width = gc.height = 128;
    {
      const g = gc.getContext('2d');
      const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      r.addColorStop(0, 'rgba(255,255,255,1)');
      r.addColorStop(0.3, 'rgba(255,255,255,0.35)');
      r.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = r;
      g.fillRect(0, 0, 128, 128);
    }
    const glowTex = new THREE.CanvasTexture(gc);
    const mkGlow = (color, opacity) =>
      new THREE.SpriteMaterial({ map: glowTex, color, opacity, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false });
    const glowMats = [mkGlow(0x5a8dff, 0.4), mkGlow(0xff6bd6, 0.4)];
    const haloMat = mkGlow(0x3b5bff, 0.14);

    const holder = new THREE.Group();
    holder.rotation.set(0.4, 0.3, 0);
    scene.add(holder);

    // unique vertices + 30 edges of the icosahedron
    const src = new THREE.IcosahedronGeometry(2);
    const E = new THREE.EdgesGeometry(src).attributes.position;
    const N = [];
    const key = new Map();
    const edges = [];
    const idOf = (k) => {
      const p = new THREE.Vector3().fromBufferAttribute(E, k);
      const s = p.toArray().map((x) => x.toFixed(2)).join();
      if (!key.has(s)) { key.set(s, N.length); N.push(p); }
      return key.get(s);
    };
    for (let k = 0; k < E.count; k += 2) edges.push({ a: idOf(k), b: idOf(k + 1), f: 0 });

    const COL = [0x4d7dff, 0xb55cff, 0xff6bd6].map((c) => new THREE.Color(c));
    const CORE = new THREE.Color(0xcfeaff);
    const CH = new THREE.Color(0x7fd8ff);

    edges.forEach((e) => {
      const A = N[e.a], B = N[e.b];
      const d = B.clone().sub(A);
      const len = d.length();
      d.normalize();
      const g = new THREE.CylinderGeometry(0.085, 0.085, len, 20);
      geos.push(g);
      const m = new THREE.Mesh(g, rodMat);
      m.position.copy(A).add(B).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(UP, d);
      holder.add(m);
      e.A = A; e.B = B;
      e.u = d.clone().cross(Math.abs(d.y) < 0.9 ? UP : new THREE.Vector3(1, 0, 0)).normalize();
      e.v = d.clone().cross(e.u);
      e.c = COL[Math.floor(Math.random() * 3)];
      e.ph = (N[e.a].distanceTo(N[0]) + N[e.b].distanceTo(N[0])) * 0.45;
    });
    const sphere = new THREE.SphereGeometry(0.17, 24, 16);
    geos.push(sphere);
    const glows = [];
    N.forEach((p, k) => {
      const n = new THREE.Mesh(sphere, nodeMat);
      n.position.copy(p);
      holder.add(n);
      const sp = new THREE.Sprite(glowMats[k % 2]);
      sp.position.copy(p);
      sp.scale.setScalar(0.8);
      holder.add(sp);
      glows.push(sp);
    });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(7.5);
    holder.add(halo);
    const nf = new Float32Array(N.length);

    // arcs that jump across the hollow core
    const chords = Array.from({ length: 7 }, () => ({ a: 0, b: 0, f: 0 }));
    const pick = (c) => { c.a = Math.floor(Math.random() * N.length); c.b = (c.a + 1 + Math.floor(Math.random() * (N.length - 1))) % N.length; };
    chords.forEach(pick);

    const nSeg = edges.length * 2 * SEG + chords.length * CS;
    const pos = new Float32Array(nSeg * 6);
    const col = new Float32Array(nSeg * 6);
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    lg.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geos.push(lg);
    holder.add(new THREE.LineSegments(lg, lineMat));

    const pts = Array.from({ length: CS + 1 }, () => new THREE.Vector3());
    let w = 0, T = 0;
    const sm = (s, i, j) => 0.5 * Math.sin(T * 0.7 + s * 12.9 + i * 1.9 + j * 4.7) + 0.25 * Math.sin(T * 1.3 + s * 7.1 + i * 3.3 + j * 2.9);
    const bolt = (A, B, u, v, seg, rad, amp, color, k, s) => {
      const th = s * 2.4 + T * 0.15, cx = Math.cos(th), sx = Math.sin(th);
      for (let i = 0; i <= seg; i++) {
        const t = i / seg, tp = Math.sin(Math.PI * t), p = pts[i];
        p.copy(A).lerp(B, t);
        if (u) p.addScaledVector(u, cx * rad + sm(s, i, 0) * amp * tp).addScaledVector(v, sx * rad + sm(s, i, 1) * amp * tp);
        else { p.x += sm(s, i, 0) * amp * tp; p.y += sm(s, i, 1) * amp * tp; p.z += sm(s, i, 2) * amp * tp; }
      }
      for (let i = 0; i < seg; i++) {
        pos.set([pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z], w * 6);
        const r = color.r * k, g = color.g * k, b = color.b * k;
        col.set([r, g, b, r, g, b], w * 6);
        w++;
      }
    };
    const zap = () => {
      w = 0;
      nf.fill(0);
      edges.forEach((e, i) => {
        e.f = Math.pow(0.5 + 0.5 * Math.sin(T - e.ph), 3); // slow pulse sweeping across the lattice
        const k = 0.14 + 0.86 * e.f;
        bolt(e.A, e.B, e.u, e.v, SEG, 0.1, 0.07, CORE, k, i + 1);
        bolt(e.A, e.B, e.u, e.v, SEG, 0.11, 0.2, e.c, k * 0.9, i + 50);
        nf[e.a] = Math.max(nf[e.a], e.f);
        nf[e.b] = Math.max(nf[e.b], e.f);
      });
      chords.forEach((c, i) => {
        const f = Math.pow(Math.max(0, Math.sin(T * 0.6 + i * 0.9)), 2);
        if (f < 0.01 && c.f >= 0.01) pick(c);
        c.f = f;
        bolt(N[c.a], N[c.b], null, null, CS, 0, 0.5, CH, f * 0.9, i + 120);
      });
      lg.attributes.position.needsUpdate = true;
      lg.attributes.color.needsUpdate = true;
      glows.forEach((g, k) => g.scale.setScalar(0.75 + 0.35 * nf[k])); // gentle swell as the pulse passes
    };

    const render = () => renderer.render(scene, camera);
    const resize = () => {
      const W = mount.clientWidth || 1, H = mount.clientHeight || 1;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.position.z = camera.aspect > 1 ? 8.5 : 8.5 + (1 - camera.aspect) * 9;
      camera.updateProjectionMatrix();
      render();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let drag = false, px = 0, py = 0;
    const down = (e) => { drag = true; px = e.clientX; py = e.clientY; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; };
    const up = () => { drag = false; canvas.style.cursor = 'grab'; };
    const move = (e) => {
      if (!drag) return;
      holder.rotation.y += (e.clientX - px) * 0.01;
      holder.rotation.x += (e.clientY - py) * 0.01;
      px = e.clientX; py = e.clientY;
      if (still) render();
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('pointermove', move);

    let raf = 0, last = performance.now(), acc = 0;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now; acc += dt; T = now / 1000;
      if (!drag) holder.rotation.y += dt * 0.4;
      if (acc > 0.033) { acc = 0; zap(); }
      render();
    };
    zap();
    resize();
    if (!still) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('pointermove', move);
      geos.forEach((g) => g.dispose());
      src.dispose();
      glowTex.dispose(); glowMats.forEach((m) => m.dispose()); haloMat.dispose();
      rodMat.dispose(); nodeMat.dispose(); lineMat.dispose();
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
};
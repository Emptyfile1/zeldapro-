import React, { useEffect, useRef, useState } from 'react';

// Kept the original export name so existing imports don't break.
// `PolyhedronVisual` is an alias if you'd rather rename it at the call site.
export const HypercubeVisual = () => {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ isDown: false, startX: 0, startY: 0 });
  const rotRef = useRef({ x: 0.35, y: -0.55 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 900);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles moving along fiber-optic cables
    const particles = Array.from({ length: 45 }, () => ({
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.006,
      cableIndex: Math.floor(Math.random() * 5),
      size: 1.5 + Math.random() * 2.5,
      color: ['#38BDF8', '#818CF8', '#C084FC', '#F472B6', '#34D399'][Math.floor(Math.random() * 5)],
    }));

    // Ambient floating dust particles
    const dustList = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 0.8 + Math.random() * 2,
      baseAlpha: 0.2 + Math.random() * 0.5,
    }));

    // ---- Icosahedron geometry (12 vertices, 30 edges) ----
    const phi = (1 + Math.sqrt(5)) / 2;
    const RADIUS = 1.45; // tuned so it reads about as large as the old cube
    const raw = [];
    [-1, 1].forEach((a) =>
      [-1, 1].forEach((b) => {
        raw.push([0, a, b * phi]);
        raw.push([a, b * phi, 0]);
        raw.push([b * phi, 0, a]);
      })
    );
    const outerVertices = raw.map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return { x: (x / len) * RADIUS, y: (y / len) * RADIUS, z: (z / len) * RADIUS };
    });

    // Inner polyhedron (scaled copy, same vertex order so spokes map 1:1)
    const innerScale = 0.52;
    const innerVertices = outerVertices.map((v) => ({
      x: v.x * innerScale,
      y: v.y * innerScale,
      z: v.z * innerScale,
    }));

    // Edges = every vertex pair at the minimum distance
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    let minD = Infinity;
    for (let i = 0; i < outerVertices.length; i++) {
      for (let j = i + 1; j < outerVertices.length; j++) {
        minD = Math.min(minD, dist(outerVertices[i], outerVertices[j]));
      }
    }
    const polyEdges = [];
    for (let i = 0; i < outerVertices.length; i++) {
      for (let j = i + 1; j < outerVertices.length; j++) {
        if (dist(outerVertices[i], outerVertices[j]) < minD * 1.05) polyEdges.push([i, j]);
      }
    }

    let time = 0;

    const render = () => {
      time += 0.015;

      if (!mouseRef.current.isDown) {
        rotRef.current.y += 0.004;
        rotRef.current.x = 0.3 + Math.sin(time * 0.5) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.32;
      const cy = height * 0.44;
      const scale = Math.min(width, height) * 0.22;

      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);
      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);

      const project = (p) => {
        // Rotate around Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y;

        // Rotate around X
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;
        const x2 = x1;

        // Perspective
        const fov = 3.8;
        const pScale = fov / (fov + z2);

        return {
          x: cx + x2 * scale * pScale,
          y: cy + y2 * scale * pScale,
          z: z2,
        };
      };

      // 1. Background ambient glow
      const bgGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, scale * 2.8);
      bgGlow.addColorStop(0, 'rgba(124, 58, 237, 0.22)');
      bgGlow.addColorStop(0.35, 'rgba(37, 99, 235, 0.14)');
      bgGlow.addColorStop(0.7, 'rgba(6, 182, 212, 0.06)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient dust
      dustList.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        ctx.fillStyle = `rgba(167, 139, 250, ${d.baseAlpha * (0.6 + 0.4 * Math.sin(time + d.x))})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Project vertices
      const projOuter = outerVertices.map(project);
      const projInner = innerVertices.map(project);

      // Right-most anchor point from which fiber optics emanate
      let maxAnchor = projOuter[0];
      [...projOuter, ...projInner].forEach((p) => {
        if (p.x > maxAnchor.x) maxAnchor = p;
      });

      // Target 1: IoT beacon (upper right)
      const beaconX = width * 0.72;
      const beaconY = height * 0.26;

      // Target 2: autonomous vehicle (lower right)
      const carX = width * 0.74;
      const carY = height * 0.62;

      const cables = [
        {
          start: { x: maxAnchor.x, y: maxAnchor.y },
          cp1: { x: maxAnchor.x + 90, y: maxAnchor.y - 80 },
          cp2: { x: beaconX - 70, y: beaconY + 60 },
          end: { x: beaconX, y: beaconY },
          color: '#38BDF8',
        },
        {
          start: { x: maxAnchor.x, y: maxAnchor.y - 15 },
          cp1: { x: maxAnchor.x + 130, y: maxAnchor.y - 40 },
          cp2: { x: beaconX - 50, y: beaconY + 20 },
          end: { x: beaconX + 5, y: beaconY - 10 },
          color: '#818CF8',
        },
        {
          start: { x: maxAnchor.x, y: maxAnchor.y + 10 },
          cp1: { x: maxAnchor.x + 80, y: maxAnchor.y + 40 },
          cp2: { x: carX - 100, y: carY - 40 },
          end: { x: carX - 30, y: carY },
          color: '#C084FC',
        },
        {
          start: { x: maxAnchor.x, y: maxAnchor.y + 25 },
          cp1: { x: maxAnchor.x + 120, y: maxAnchor.y + 80 },
          cp2: { x: carX - 80, y: carY + 20 },
          end: { x: carX, y: carY + 15 },
          color: '#F472B6',
        },
        {
          start: { x: maxAnchor.x - 20, y: maxAnchor.y + 35 },
          cp1: { x: maxAnchor.x + 100, y: maxAnchor.y + 110 },
          cp2: { x: carX - 40, y: carY + 60 },
          end: { x: carX + 35, y: carY + 20 },
          color: '#34D399',
        },
      ];

      cables.forEach((c) => {
        // Outer soft glow
        ctx.strokeStyle = c.color;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(c.start.x, c.start.y);
        ctx.bezierCurveTo(c.cp1.x, c.cp1.y, c.cp2.x, c.cp2.y, c.end.x, c.end.y);
        ctx.stroke();

        // Core bright wire
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(c.start.x, c.start.y);
        ctx.bezierCurveTo(c.cp1.x, c.cp1.y, c.cp2.x, c.cp2.y, c.end.x, c.end.y);
        ctx.stroke();
      });

      // Photons along cables
      particles.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const c = cables[p.cableIndex % cables.length];

        const u = 1 - p.t;
        const tt = p.t * p.t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * p.t;

        const px = uuu * c.start.x + 3 * uu * p.t * c.cp1.x + 3 * u * tt * c.cp2.x + ttt * c.end.x;
        const py = uuu * c.start.y + 3 * uu * p.t * c.cp1.y + 3 * u * tt * c.cp2.y + ttt * c.end.y;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // 3. IoT beacon tower with wireless pulse waves
      ctx.save();
      ctx.translate(beaconX, beaconY);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.lineWidth = 1.8;
      ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';

      ctx.beginPath();
      ctx.roundRect(-8, 0, 16, 45, [4, 4, 1, 1]);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -6, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#38BDF8';
      ctx.fill();

      for (let i = 1; i <= 3; i++) {
        const waveProgress = (time * 1.5 + i * 0.7) % 3;
        const waveRadius = 12 + waveProgress * 14;
        const waveAlpha = Math.max(0, 1 - waveProgress / 3);

        ctx.strokeStyle = `rgba(56, 189, 248, ${waveAlpha * 0.75})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, -6, waveRadius, -Math.PI * 0.75, -Math.PI * 0.25);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Connected autonomous vehicle hologram
      ctx.save();
      ctx.translate(carX, carY);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.75)';
      ctx.lineWidth = 1.8;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';

      ctx.beginPath();
      ctx.moveTo(-50, 20);
      ctx.lineTo(-45, 8);
      ctx.lineTo(-30, 0);
      ctx.lineTo(-10, -12);
      ctx.lineTo(20, -12);
      ctx.lineTo(40, 6);
      ctx.lineTo(54, 12);
      ctx.lineTo(54, 20);
      ctx.lineTo(42, 20);
      ctx.arc(32, 20, 10, 0, Math.PI, true);
      ctx.lineTo(-22, 20);
      ctx.arc(-32, 20, 10, 0, Math.PI, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      const drawWheel = (wx, wy) => {
        ctx.fillStyle = '#0F172A';
        ctx.beginPath();
        ctx.arc(wx, wy, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#67E8F9';
        ctx.beginPath();
        ctx.arc(wx, wy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      };
      drawWheel(32, 20);
      drawWheel(-32, 20);

      ctx.fillStyle = '#34D399';
      ctx.beginPath();
      ctx.arc(5, -15, 3, 0, Math.PI * 2);
      ctx.fill();

      const beamAlpha = 0.25 + 0.15 * Math.sin(time * 4);
      const beamGrad = ctx.createLinearGradient(54, 15, 110, 15);
      beamGrad.addColorStop(0, `rgba(56, 189, 248, ${beamAlpha})`);
      beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(54, 12);
      ctx.lineTo(105, -5);
      ctx.lineTo(105, 32);
      ctx.lineTo(54, 18);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 5. Polyhedron lattice
      const drawEdges = (pArr, color, alpha, widthVal) => {
        polyEdges.forEach(([i, j]) => {
          const a = pArr[i];
          const b = pArr[j];

          // Outer bloom
          ctx.strokeStyle = color;
          ctx.globalAlpha = alpha * 0.4;
          ctx.lineWidth = widthVal * 2.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          // Core laser
          ctx.globalAlpha = alpha;
          ctx.lineWidth = widthVal;
          ctx.strokeStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        });
      };

      // Spokes between inner and outer polyhedron
      for (let i = 0; i < outerVertices.length; i++) {
        const outP = projOuter[i];
        const inP = projInner[i];

        ctx.strokeStyle = '#A855F7';
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(outP.x, outP.y);
        ctx.lineTo(inP.x, inP.y);
        ctx.stroke();

        ctx.strokeStyle = '#E879F9';
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(outP.x, outP.y);
        ctx.lineTo(inP.x, inP.y);
        ctx.stroke();
      }

      // Outer struts (cyan) and inner struts (magenta)
      drawEdges(projOuter, '#06B6D4', 0.85, 2.0);
      drawEdges(projInner, '#EC4899', 0.9, 1.6);

      // 6. Glass nodes at vertices
      const drawGlassNode = (p, baseSize, color) => {
        const nodeSize = baseSize * (1 + p.z * 0.2);

        const flare = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, nodeSize * 2.6);
        flare.addColorStop(0, color);
        flare.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
        flare.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = flare;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize * 2.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.roundRect(p.x - nodeSize / 2, p.y - nodeSize / 2, nodeSize, nodeSize, 3);
        ctx.fill();

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize * 0.25, 0, Math.PI * 2);
        ctx.fill();
      };

      // Slightly smaller nodes than the cube had, since there are 12 per shell instead of 8
      projInner.forEach((p) => drawGlassNode(p, 8, 'rgba(236, 72, 153, 0.9)'));
      projOuter.forEach((p) => drawGlassNode(p, 12, 'rgba(56, 189, 248, 0.95)'));

      // Center singularity core
      const centerNode = project({ x: 0, y: 0, z: 0 });
      const corePulse = 18 + Math.sin(time * 3) * 6;
      const coreGrad = ctx.createRadialGradient(
        centerNode.x, centerNode.y, 0,
        centerNode.x, centerNode.y, corePulse * 3
      );
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.2, '#C084FC');
      coreGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.3)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, corePulse * 3, 0, Math.PI * 2);
      ctx.fill();

      // 7. Floor reflection
      const floorY = height * 0.76;
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.filter = 'blur(4px)';
      projOuter.forEach((p) => {
        if (p.y > cy) {
          const distFromFloor = p.y - floorY;
          const reflY = floorY - distFromFloor * 0.6;
          if (reflY > floorY - 50) {
            const reflNodeY = floorY + (p.y - cy) * 0.5;
            ctx.fillStyle = '#818CF8';
            ctx.beginPath();
            ctx.ellipse(p.x, reflNodeY, 18, 5, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      ctx.restore();

      // Floor shimmer line
      ctx.strokeStyle = 'rgba(229, 224, 216, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height - 1);
      ctx.lineTo(width, height - 1);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Pointer events cover mouse, touch and pen
  const handlePointerDown = (e) => {
    mouseRef.current.isDown = true;
    mouseRef.current.startX = e.clientX;
    mouseRef.current.startY = e.clientY;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!mouseRef.current.isDown) return;
    const dx = e.clientX - mouseRef.current.startX;
    const dy = e.clientY - mouseRef.current.startY;
    rotRef.current.y += dx * 0.008;
    // Vertical tilt only for mouse/pen; on touch, vertical movement belongs to page scroll
    if (e.pointerType !== 'touch') rotRef.current.x += dy * 0.008;
    mouseRef.current.startX = e.clientX;
    mouseRef.current.startY = e.clientY;
  };

  const handlePointerUp = (e) => {
    mouseRef.current.isDown = false;
    if (e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-[500px] lg:min-h-[750px] overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={(e) => {
        setIsHovered(false);
        handlePointerUp(e);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Interactive hint overlay */}
      <div
        className={`absolute bottom-6 left-8 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-80' : 'opacity-40'
        }`}
      >
        <span className="text-[11px] tracking-[0.16em] uppercase font-mono-code text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          Drag to Rotate
        </span>
      </div>
    </div>
  );
};

export const PolyhedronVisual = HypercubeVisual;
export default HypercubeVisual;
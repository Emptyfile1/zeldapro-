import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Global components
import { Navbar } from './Components/Nav.jsx';
// import Footer from './Components/Footer'; // uncomment if you have a footer

// Pages (file names match your Pages folder exactly)
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Service from './Pages/Service.jsx';
import Contact from './Pages/Contact.jsx';

// Scrolls to the top whenever the page changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />

      <Navbar onOpenContact={() => navigate('/contact')} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}
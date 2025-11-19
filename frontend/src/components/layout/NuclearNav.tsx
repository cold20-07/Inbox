import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NuclearNav() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 200;
      if (shouldBeScrolled !== scrolled) {
        setScrolled(shouldBeScrolled);
      }

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-5 bg-black/10 z-50">
        <div
          className="h-full bg-hotpink transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
            ? 'bg-white border-b-4 md:border-b-8 border-black shadow-thick animate-slam'
            : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-2xl md:text-3xl font-display group relative"
          >
            <span className={`${scrolled ? 'text-black' : 'text-white'} group-hover:animate-glitch`}>
              INBOX
            </span>
          </Link>



          {/* CTA */}
          <Link to="/dashboard">
            <button className="group relative">
              <div className={`absolute inset-0 ${scrolled ? 'bg-hotpink' : 'bg-white'} translate-x-1 translate-y-1 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5`} />
              <div className={`relative ${scrolled ? 'bg-white text-black' : 'bg-black text-white'} px-4 py-2 md:px-6 md:py-3 text-base md:text-lg font-display border-2 border-black transition-all group-hover:scale-105 group-active:scale-95`}>
                Get Started
              </div>
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}

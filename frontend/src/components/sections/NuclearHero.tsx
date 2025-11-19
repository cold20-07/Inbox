import { useEffect, useRef, useState } from 'react';

export default function NuclearHero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Chaotic background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 -right-40 w-96 h-96 bg-hotpink rotate-12"
          style={{ transform: `translateY(${scrollY * 0.3}px) rotate(12deg)` }}
        />
        <div
          className="absolute bottom-40 -left-20 w-80 h-80 bg-electric rotate-45"
          style={{ transform: `translateY(${scrollY * 0.5}px) rotate(45deg)` }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-lime -rotate-12"
          style={{ transform: `translateY(${scrollY * 0.4}px) rotate(-12deg)` }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 pt-32 pb-20">
        {/* MASSIVE asymmetric headline */}
        <div className="max-w-7xl">
          <h1 className="font-display text-6xl sm:text-massive md:text-nuclear leading-none tracking-crush">
            <span className="block text-white">Your inbox</span>
            <span className="block text-white">is </span>
            <span className="block text-chaos">chaos</span>
          </h1>

          <p className="mt-8 md:mt-12 text-lg sm:text-2xl md:text-4xl text-white/80 font-body max-w-2xl">
            847 hours saved. Zero bullshit. Pure email domination.
          </p>

          {/* HUGE CTA button */}
          <a href="/dashboard?action=analyze">
            <button className="mt-12 md:mt-16 group relative cursor-pointer">
              <div className="absolute inset-0 bg-hotpink translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              <div className="relative bg-white px-8 py-6 md:px-12 md:py-8 text-xl md:text-2xl lg:text-3xl font-display border-4 border-black transition-transform group-hover:scale-[1.02] group-active:scale-95">
                Fix my inbox now →
              </div>
            </button>
          </a>
        </div>

        {/* Email mockup - breaking container (hidden on mobile) */}
        <div
          className="hidden lg:block absolute right-0 top-1/4 w-[600px] rotate-3"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotate(3deg)`,
            right: '-100px'
          }}
        >
          <div className="bg-white border-4 border-black shadow-brutal-color p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border-2 border-black p-4 bg-gray-50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-electric" />
                    <div className="flex-1">
                      <div className="h-3 bg-black w-32 mb-2" />
                      <div className="h-2 bg-gray-400 w-48" />
                    </div>
                  </div>
                  <div className="h-2 bg-gray-300 w-full mb-1" />
                  <div className="h-2 bg-gray-300 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Aggressive scroll indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="text-white text-center">
          <div className="text-4xl md:text-6xl mb-2">↓</div>
          <div className="text-base md:text-xl font-display">SEE HOW IT WORKS</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Brain, Mail, Mailbox, Smartphone } from 'lucide-react';

export default function BentoFeatures() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [count, setCount] = useState(847);

  return (
    <div className="py-32 px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Chaotic bento grid */}
        <div className="grid grid-cols-12 gap-6 auto-rows-[200px]">
          
          {/* Card 1: AI Summaries - The Bold One */}
          <div 
            className={`col-span-12 md:col-span-6 row-span-2 bg-black text-white p-6 md:p-8 border-4 border-black relative overflow-hidden transition-all duration-300 ${
              hoveredCard === 1 ? 'z-20 scale-105 shadow-brutal-color' : hoveredCard !== null ? 'opacity-60' : ''
            }`}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative z-10">
              <Brain className="w-12 h-12 md:w-16 md:h-16 mb-4 text-lime" strokeWidth={2.5} />
              <h3 className="text-3xl md:text-4xl font-display mb-4">AI Summaries</h3>
              <div className="font-mono text-xs md:text-sm bg-white/10 p-3 md:p-4 border-2 border-white/20">
                <div className="text-lime">{'{'}</div>
                <div className="ml-4 text-neon-blue">"summary": "Meeting at 3pm"</div>
                <div className="ml-4 text-hotpink">"priority": "high"</div>
                <div className="text-lime">{'}'}</div>
              </div>
            </div>
            {hoveredCard === 1 && (
              <div className="absolute bottom-4 left-6 md:left-8 text-white/60 font-mono text-xs md:text-sm animate-slam">
                &gt; Generating summary...
              </div>
            )}
          </div>

          {/* Card 2: Speed - The Minimal One */}
          <div 
            className={`col-span-12 md:col-span-3 row-span-1 bg-white border-4 border-black p-6 md:p-8 flex flex-col items-center justify-center transition-all duration-300 ${
              hoveredCard === 2 ? 'z-20 scale-105 shadow-brutal' : hoveredCard !== null ? 'opacity-60' : ''
            }`}
            onMouseEnter={() => {
              setHoveredCard(2);
              let current = 0;
              const interval = setInterval(() => {
                current += 23;
                if (current >= 847) {
                  setCount(847);
                  clearInterval(interval);
                } else {
                  setCount(current);
                }
              }, 30);
            }}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="text-6xl md:text-8xl font-display mb-2">{count}</div>
            <div className="text-xs md:text-sm text-gray-600 text-center">hours saved by users</div>
          </div>

          {/* Card 3: Categories - The Visual One */}
          <div 
            className={`col-span-12 md:col-span-3 row-span-1 bg-lime border-4 border-black p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${
              hoveredCard === 3 ? 'z-20 scale-105 shadow-brutal' : hoveredCard !== null ? 'opacity-60' : ''
            }`}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="text-xl md:text-2xl font-display mb-4">Smart Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['Work', 'Personal', 'Urgent', 'Later'].map((cat, i) => (
                <div 
                  key={cat}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-black text-white font-accent text-xs md:text-sm border-2 border-black animate-drift"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Actions - The Interactive One */}
          <div 
            className={`col-span-12 md:col-span-4 row-span-2 bg-hotpink border-4 border-black p-6 md:p-8 transition-all duration-300 ${
              hoveredCard === 4 ? 'z-20 scale-105 shadow-brutal' : hoveredCard !== null ? 'opacity-60' : ''
            }`}
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="text-2xl md:text-3xl font-display mb-6 text-white">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-white text-black px-4 py-3 md:px-6 md:py-4 font-display text-lg md:text-xl border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform">
                Archive
              </button>
              <button className="w-full bg-black text-white px-4 py-3 md:px-6 md:py-4 font-display text-lg md:text-xl border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-transform">
                Delete
              </button>
            </div>
            <div className="mt-6 text-white font-mono text-xs md:text-sm">
              12,847 emails archived today
            </div>
          </div>

          {/* Card 5: Integration - The Trust One */}
          <div 
            className={`col-span-12 md:col-span-5 row-span-1 bg-electric border-4 border-black p-6 md:p-8 transition-all duration-300 ${
              hoveredCard === 5 ? 'z-20 scale-105 shadow-brutal' : hoveredCard !== null ? 'opacity-60' : ''
            }`}
            onMouseEnter={() => setHoveredCard(5)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="text-xl md:text-2xl font-display mb-4 text-white">Works with</h3>
            <div className="flex gap-4 md:gap-6 items-center">
              <Mail className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={2.5} />
              <Mailbox className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={2.5} />
            </div>
            <div className="mt-4 text-white/80 text-xs md:text-sm">Gmail • Outlook • Everything</div>
          </div>

          {/* Card 6: Mobile - The Device One */}
          <div 
            className={`col-span-12 md:col-span-3 row-span-1 bg-deepurple border-4 border-black p-6 md:p-8 flex items-center justify-center transition-all duration-300 ${
              hoveredCard === 6 ? 'z-20 scale-105 shadow-brutal rotate-3' : hoveredCard !== null ? 'opacity-60' : ''
            }`}
            onMouseEnter={() => setHoveredCard(6)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="text-center">
              <Smartphone className="w-12 h-12 md:w-16 md:h-16 mb-2 text-white mx-auto" strokeWidth={2.5} />
              <div className="text-white font-display text-lg md:text-xl">Mobile Ready</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

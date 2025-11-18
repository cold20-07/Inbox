import { useState } from 'react';
import { Flame, DollarSign } from 'lucide-react';

export default function NuclearPricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1000);
  };

  return (
    <div className="py-32 px-8 bg-black relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-explode"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#FF006E', '#0000FF', '#CCFF00'][Math.floor(Math.random() * 3)],
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Annual toggle */}
        <div className="flex justify-center mb-16">
          <button
            onClick={handleToggle}
            className="relative group"
          >
            <div className="flex items-center gap-6 bg-white px-12 py-6 border-4 border-white">
              <span className={`text-2xl font-display ${!isAnnual ? 'text-black' : 'text-gray-400'}`}>
                Monthly
              </span>
              <div className="relative w-20 h-10 bg-black border-4 border-black">
                <div 
                  className={`absolute top-0 w-10 h-full bg-hotpink transition-all duration-300 ${
                    isAnnual ? 'left-10' : 'left-0'
                  }`}
                />
              </div>
              <span className={`text-2xl font-display ${isAnnual ? 'text-black' : 'text-gray-400'}`}>
                Annual
              </span>
            </div>
            {isAnnual && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-lime px-6 py-3 border-4 border-black font-display text-2xl animate-slam whitespace-nowrap flex items-center gap-2">
                Save $108/year! <DollarSign className="w-6 h-6" strokeWidth={3} />
              </div>
            )}
          </button>
        </div>

        {/* Pricing cards - staggered */}
        <div className="relative h-[800px]">
          {/* Free tier - top left */}
          <div className="absolute top-0 left-0 w-80 bg-gray-200 border-4 border-gray-400 p-8 opacity-60">
            <div className="text-sm font-display text-gray-600 mb-4">FREE</div>
            <div className="text-6xl font-display mb-6 text-gray-700">$0</div>
            <div className="space-y-3 mb-8">
              <div className="text-gray-500 line-through">AI Summaries</div>
              <div className="text-gray-500 line-through">Smart Categories</div>
              <div className="text-gray-700">1 Inbox</div>
            </div>
            <button className="w-full bg-gray-400 text-gray-700 px-6 py-4 font-display border-2 border-gray-500">
              Start here (but upgrade soon)
            </button>
          </div>

          {/* Pro tier - center, HUGE */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] bg-gradient-to-br from-hotpink via-electric to-deepurple border-8 border-black p-12 shadow-brutal-color animate-pulse-glow hover:scale-110 transition-transform duration-300">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-lime px-8 py-4 border-4 border-black font-display text-3xl animate-bounce flex items-center gap-2">
              MOST POPULAR <Flame className="w-8 h-8" strokeWidth={3} />
            </div>
            
            <div className="text-2xl font-display text-white mb-4">PRO</div>
            <div className="text-[120px] font-display leading-none text-white mb-8">
              ${isAnnual ? '9' : '19'}
            </div>
            <div className="text-white/80 mb-8">per month</div>
            
            <div className="space-y-4 mb-12">
              {['AI Summaries', 'Smart Categories', 'Quick Actions', 'Unlimited Inboxes', 'Priority Support'].map((feature, i) => (
                <div 
                  key={feature}
                  className="text-white text-xl font-display animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  ✓ {feature}
                </div>
              ))}
            </div>
            
            <button className="w-full group relative">
              <div className="absolute inset-0 bg-white translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              <div className="relative bg-black text-white px-8 py-6 text-2xl font-display border-4 border-white">
                Get Pro Now →
              </div>
            </button>
          </div>

          {/* Enterprise tier - bottom right, mysterious */}
          <div className="absolute bottom-0 right-0 w-96 bg-black border-4 border-deepurple p-8 shadow-neon text-deepurple hover:scale-105 transition-transform duration-300">
            <div className="text-sm font-display mb-4">ENTERPRISE</div>
            <div className="text-5xl font-display mb-6">Let's talk</div>
            <div className="space-y-3 mb-8 opacity-60">
              <div>Everything in Pro</div>
              <div>Custom integrations</div>
              <div>Dedicated support</div>
              <div>??? Hidden features</div>
            </div>
            <button className="w-full bg-deepurple text-white px-6 py-4 font-display border-4 border-deepurple hover:bg-white hover:text-deepurple transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

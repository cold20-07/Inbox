import NuclearNav from '../components/layout/NuclearNav';
import NuclearHero from '../components/sections/NuclearHero';
import BentoFeatures from '../components/sections/BentoFeatures';
import NuclearPricing from '../components/sections/NuclearPricing';
import CustomCursor from '../components/ui/CustomCursor';

export default function NuclearLanding() {
  return (
    <div className="bg-white">
      <CustomCursor />
      <NuclearNav />
      <NuclearHero />
      <BentoFeatures />
      <NuclearPricing />
      
      {/* Nuclear Footer */}
      <footer className="bg-black text-white py-20 px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="text-6xl font-display mb-6">INBOX</div>
              <p className="text-2xl text-white/60 mb-8">
                Made with spite for messy inboxes
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="text-4xl font-display mb-4">Links</div>
              <a href="#" className="block text-2xl hover:text-hotpink transition-colors">Features</a>
              <a href="#" className="block text-2xl hover:text-electric transition-colors">Pricing</a>
              <a href="#" className="block text-2xl hover:text-lime transition-colors">About</a>
              <a href="#" className="block text-2xl hover:text-deepurple transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t-4 border-white/20">
            <p className="text-white/60 font-mono">
              © 2024 Inbox Unclutter. Made by humans (AI helped a bit)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

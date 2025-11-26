import React from 'react';
import { Star, ChefHat, Clock } from 'lucide-react';

const Hero = ({ scrollToSection }) => {
  return (
    <section id="home" className="relative pt-20 min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop"
          alt="Restaurant"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
              <Star className="text-yellow-400" size={20} fill="currentColor" />
              <span className="text-sm font-medium">5-Star Rated Restaurant</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <span className="block mb-2">Experience</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-relaxed">
                Culinary Magic
              </span>
            </h1>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
            Where passion meets perfection. Indulge in our chef's masterpieces crafted with the finest ingredients.
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center pt-8">
            <button
              onClick={() => scrollToSection('menu')}
              className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full font-bold text-sm sm:text-base md:text-lg overflow-hidden shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <span className="relative z-10">Explore Menu</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-white/10 hover:border-purple-500/50 transition-all shadow-lg"
            >
              Order Now
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 max-w-2xl mx-auto pt-16 px-4">
            {[
              { icon: ChefHat, label: 'Expert Chefs', value: '15+' },
              { icon: Star, label: 'Signature Dishes', value: '50+' },
              { icon: Clock, label: 'Years Experience', value: '20+' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full mb-2 sm:mb-3">
                  <stat.icon className="text-purple-400" size={18} />
                </div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

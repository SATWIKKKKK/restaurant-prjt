import React from 'react';
import MenuItem from './MenuItem';

const MenuSection = ({ menuItems, addToCart }) => {
  return (
    <section id="menu" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-sm font-semibold text-purple-400">OUR SPECIALTIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            Signature <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Dishes</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            Every dish tells a story of passion, creativity, and excellence
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;

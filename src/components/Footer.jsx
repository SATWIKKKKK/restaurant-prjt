import React from 'react';
import { ChefHat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <ChefHat size={20} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Bichitra Restro
          </span>
        </div>
        <p className="text-gray-500">© 2025 Bichitra Restro. All rights reserved. Crafted with passion and love.</p>
      </div>
    </footer>
  );
};

export default Footer;

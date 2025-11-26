import React from 'react';
import { Star, Plus } from 'lucide-react';

const MenuItem = ({ item, addToCart }) => {
  return (
    <div className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-orange-500/0 group-hover:from-purple-500/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
      
      <div className="relative overflow-hidden h-56">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/10 shadow-lg">
          {item.category}
        </div>
        
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full flex items-center space-x-1 border border-white/10 shadow-lg">
          <Star className="text-yellow-400" size={14} fill="currentColor" />
          <span className="text-sm font-bold">{item.rating}</span>
        </div>
      </div>

      <div className="relative p-6">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            ${item.price}
          </div>
          <button
            onClick={() => addToCart(item)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95"
          >
            <Plus size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;

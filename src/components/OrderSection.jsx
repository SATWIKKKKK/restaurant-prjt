import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const OrderSection = ({ cart, updateQuantity, getTotalPrice, scrollToSection }) => {
  return (
    <section id="order" className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
            Your <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Order</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">Complete your culinary journey</p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full mb-6">
                <ShoppingCart size={64} className="text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
              <p className="text-gray-400 mb-8">Start adding some delicious items</p>
              <button
                onClick={() => scrollToSection('menu')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-400">${item.price} each</p>
                    </div>
                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center active:scale-95"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-xl w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center active:scale-95"
                      >
                        <Plus size={16} />
                      </button>
                      <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent ml-4 w-20 sm:w-24 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex justify-between items-center text-2xl sm:text-3xl font-bold">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                    ${getTotalPrice()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderSection;

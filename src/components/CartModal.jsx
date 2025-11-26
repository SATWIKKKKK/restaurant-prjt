import React from 'react';
import { X, ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';

const CartModal = ({ 
  isCartOpen, 
  setIsCartOpen, 
  cart, 
  updateQuantity, 
  getTotalPrice, 
  orderSuccess, 
  formData, 
  setFormData, 
  handleSubmitOrder 
}) => {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-purple-500/20 animate-slideUp">
        <div className="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
          {orderSuccess ? (
            <div className="text-center py-12 sm:py-20 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full mb-4 sm:mb-6 animate-bounce">
                <CheckCircle size={48} className="text-green-500 sm:w-16 sm:h-16" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Order Placed Successfully!</h3>
              <p className="text-gray-400 text-base sm:text-lg">We'll prepare your delicious meal right away.</p>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full mb-4 sm:mb-6">
                <ShoppingCart size={48} className="text-gray-500 sm:w-16 sm:h-16" />
              </div>
              <p className="text-lg sm:text-xl text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-base sm:text-lg mb-1 truncate">{item.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">${item.price} each</p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center active:scale-95"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-lg sm:text-xl w-6 sm:w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center active:scale-95"
                      >
                        <Plus size={14} />
                      </button>
                      <span className="font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent ml-2 sm:ml-4 w-16 sm:w-20 md:w-24 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-center text-xl sm:text-2xl md:text-3xl font-bold mb-8">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                    ${getTotalPrice()}
                  </span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                />
                <textarea
                  placeholder="Delivery Address"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 resize-none"
                />
                <button
                  onClick={handleSubmitOrder}
                  className="w-full py-4 sm:py-5 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-orange-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  Place Order - ${getTotalPrice()}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;

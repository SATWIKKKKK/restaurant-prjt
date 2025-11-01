import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Plus, Minus, CheckCircle, ChefHat, Clock, Star, MapPin, Phone, Mail } from 'lucide-react';

const RestaurantWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      id: 1,
      name: 'Truffle Mushroom Risotto',
      category: 'Main Course',
      description: 'Creamy arborio rice with wild mushrooms and black truffle oil',
      price: 24.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1476124369976-fdbb4f003e8c?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Grilled Salmon Teriyaki',
      category: 'Main Course',
      description: 'Fresh Atlantic salmon with honey teriyaki glaze and sesame seeds',
      price: 28.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Wagyu Beef Burger',
      category: 'Burgers',
      description: 'Premium wagyu beef with caramelized onions, aged cheddar, and truffle aioli',
      price: 22.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Margherita Pizza',
      category: 'Pizza',
      description: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, and basil',
      price: 18.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Caesar Salad',
      category: 'Starters',
      description: 'Crisp romaine lettuce, parmesan crisps, croutons, and classic Caesar dressing',
      price: 12.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      price: 9.99,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop'
    }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSubmitOrder = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all fields');
      return;
    }
    
    const orderData = {
      customer: formData,
      items: cart,
      total: getTotalPrice(),
      timestamp: new Date().toISOString()
    };

    console.log('Order submitted:', orderData);
    
    setOrderSuccess(true);
    setCart([]);
    setFormData({ name: '', email: '', phone: '', address: '' });
    
    setTimeout(() => {
      setOrderSuccess(false);
      setIsCartOpen(false);
    }, 3000);
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-orange-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-xl shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full blur-md"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center">
                  <ChefHat className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Luxé Bistro
                </h1>
                <p className="text-xs text-gray-400">Culinary Excellence</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['home', 'menu', 'order', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium transition-all relative group ${
                    activeSection === section 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 transition-all ${
                    activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-110"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {['home', 'menu', 'order', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left capitalize font-medium text-gray-300 hover:text-purple-400 py-2"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative pt-20 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop"
            alt="Restaurant"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
                <Star className="text-yellow-400" size={20} fill="currentColor" />
                <span className="text-sm font-medium">5-Star Rated Restaurant</span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="block">Experience</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Culinary Magic
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Where passion meets perfection. Indulge in our chef's masterpieces crafted with the finest ingredients.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center pt-8">
              <button
                onClick={() => scrollToSection('menu')}
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full font-bold text-lg overflow-hidden"
              >
                <span className="relative z-10">Explore Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button
                onClick={() => scrollToSection('order')}
                className="px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
              >
                Order Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16">
              {[
                { icon: ChefHat, label: 'Expert Chefs', value: '15+' },
                { icon: Star, label: 'Signature Dishes', value: '50+' },
                { icon: Clock, label: 'Years Experience', value: '20+' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full mb-3">
                    <stat.icon className="text-purple-400" size={24} />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
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

      <section id="menu" className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/30 rounded-full mb-6">
              <span className="text-sm font-semibold text-purple-400">OUR SPECIALTIES</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Signature <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Dishes</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Every dish tells a story of passion, creativity, and excellence
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-orange-500/0 group-hover:from-purple-500/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
                
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/10">
                    {item.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1 border border-white/10">
                    <Star className="text-yellow-400" size={14} fill="currentColor" />
                    <span className="text-sm font-bold">{item.rating}</span>
                  </div>
                </div>

                <div className="relative p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                        ${item.price}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Your <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Order</span>
            </h2>
            <p className="text-xl text-gray-400">Complete your culinary journey</p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full mb-6">
                  <ShoppingCart size={64} className="text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Your cart is empty</h3>
                <p className="text-gray-400 mb-8">Start adding some delicious items</p>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div>
                <div className="space-y-4 mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-400">${item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold text-xl w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                          <Plus size={16} />
                        </button>
                        <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent ml-4 w-24 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between items-center text-3xl font-bold mb-8">
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

      <section id="contact" className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-5xl font-bold mb-8">
                Get In <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Touch</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12">
                We'd love to hear from you. Visit us or reach out for reservations and inquiries.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: 'Address', value: '123 Culinary Street, Food District, NY 10001' },
                  { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567' },
                  { icon: Mail, title: 'Email', value: 'hello@luxebistro.com' },
                  { icon: Clock, title: 'Hours', value: 'Mon-Sun: 11:00 AM - 11:00 PM' }
                ].map((contact, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <contact.icon className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-400 mb-1">{contact.title}</h3>
                      <p className="text-gray-300">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-8">Follow Our Journey</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social, i) => (
                  <button
                    key={social}
                    className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl font-semibold hover:border-purple-500/50 hover:bg-white/10 transition-all"
                  >
                    {social}
                  </button>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/30 rounded-2xl p-8">
                <h4 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h4>
                <p className="text-gray-400 mb-6">Get exclusive offers and updates</p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center">
              <ChefHat size={20} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Luxé Bistro
            </span>
          </div>
          <p className="text-gray-500">© 2025 Luxé Bistro. All rights reserved. Crafted with passion and love.</p>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-purple-500/20">
            <div className="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-white/10 px-8 py-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
              {orderSuccess ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full mb-6">
                    <CheckCircle size={64} className="text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Order Placed Successfully!</h3>
                  <p className="text-gray-400 text-lg">We'll prepare your delicious meal right away.</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full mb-6">
                    <ShoppingCart size={64} className="text-gray-500" />
                  </div>
                  <p className="text-xl text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-4 mb-8">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-400">${item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-xl w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
                          >
                            <Plus size={16} />
                          </button>
                          <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent ml-4 w-24 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6 mb-8">
                    <div className="flex justify-between items-center text-3xl font-bold mb-8">
                      <span>Total:</span>
                      <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                        ${getTotalPrice()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all placeholder-gray-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all placeholder-gray-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all placeholder-gray-500"
                    />
                    <textarea
                      placeholder="Delivery Address"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all placeholder-gray-500 resize-none"
                    />
                    <button
                      onClick={handleSubmitOrder}
                      className="w-full py-5 bg-gradient-to-r from-purple-600 to-orange-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                    >
                      Place Order - ${getTotalPrice()}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantWebsite;

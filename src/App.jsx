import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import OrderSection from './components/OrderSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

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
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-orange-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <Navbar
        scrollY={scrollY}
        activeSection={activeSection}
        cart={cart}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsCartOpen={setIsCartOpen}
        scrollToSection={scrollToSection}
      />

      <Hero scrollToSection={scrollToSection} />

      <MenuSection menuItems={menuItems} addToCart={addToCart} />

      <OrderSection 
        cart={cart} 
        updateQuantity={updateQuantity} 
        getTotalPrice={getTotalPrice} 
        scrollToSection={scrollToSection} 
      />

      <ContactSection />

      <Footer />

      <CartModal
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
        orderSuccess={orderSuccess}
        formData={formData}
        setFormData={setFormData}
        handleSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
};

export default RestaurantWebsite;

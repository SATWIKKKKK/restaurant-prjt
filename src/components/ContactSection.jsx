import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus(''), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeStatus('invalid');
      setTimeout(() => setSubscribeStatus(''), 3000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscribeStatus('success');
        setEmail('');
      } else {
        setSubscribeStatus('apiError');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeStatus('apiError');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSubscribeStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              Get In <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-12">
              We'd love to hear from you. Visit us or reach out for reservations and inquiries.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Address', value: 'Bhubaneshwar, Odisha' },
                { icon: Phone, title: 'Phone', value: '+91-9064226986' },
                { icon: Mail, title: 'Email', value: 'satwikchandra65@gmail.com' },
                { icon: Clock, title: 'Hours', value: 'Mon-Sun: 11:00 AM - 11:00 PM' }
              ].map((contact, i) => (
                <div key={i} className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/30 transition-all shadow-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <contact.icon className="text-purple-400" size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-purple-400 mb-1 text-sm sm:text-base">{contact.title}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm break-words">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/30 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">Get exclusive offers and updates</p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-orange-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                
                {subscribeStatus === 'success' && (
                  <p className="text-green-400 text-sm animate-fadeIn">
                    ✓ Successfully subscribed! Check your email.
                  </p>
                )}
                {subscribeStatus === 'error' && (
                  <p className="text-red-400 text-sm animate-fadeIn">
                    ✗ Please enter your email address.
                  </p>
                )}
                {subscribeStatus === 'invalid' && (
                  <p className="text-red-400 text-sm animate-fadeIn">
                    ✗ Please enter a valid email address.
                  </p>
                )}
                {subscribeStatus === 'apiError' && (
                  <p className="text-red-400 text-sm animate-fadeIn">
                    ✗ Unable to subscribe. Please make sure the backend server is running.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

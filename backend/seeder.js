require('dotenv').config();
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

// Connect to DB
connectDB();

const menuItems = [
  {
    name: 'Truffle Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms and black truffle oil',
    price: 24.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1476124369976-fdbb4f003e8c?w=400&h=300&fit=crop',
    ingredients: ['Arborio Rice', 'Wild Mushrooms', 'Truffle Oil', 'Parmesan', 'White Wine'],
    isVegetarian: true,
    calories: 450,
    prepTime: 25,
    rating: 4.8,
    available: true,
    featured: true
  },
  {
    name: 'Grilled Salmon Teriyaki',
    description: 'Fresh Atlantic salmon with honey teriyaki glaze and sesame seeds',
    price: 28.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    ingredients: ['Atlantic Salmon', 'Teriyaki Sauce', 'Honey', 'Sesame Seeds', 'Rice'],
    spiceLevel: 'mild',
    calories: 520,
    prepTime: 20,
    rating: 4.9,
    available: true,
    featured: true
  },
  {
    name: 'Wagyu Beef Burger',
    description: 'Premium wagyu beef with caramelized onions, aged cheddar, and truffle aioli',
    price: 22.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    ingredients: ['Wagyu Beef', 'Aged Cheddar', 'Truffle Aioli', 'Caramelized Onions', 'Brioche Bun'],
    calories: 680,
    prepTime: 15,
    rating: 4.7,
    available: true,
    featured: true
  },
  {
    name: 'Margherita Pizza',
    description: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, and basil',
    price: 18.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    ingredients: ['Pizza Dough', 'San Marzano Tomatoes', 'Fresh Mozzarella', 'Basil', 'Olive Oil'],
    isVegetarian: true,
    calories: 520,
    prepTime: 12,
    rating: 4.6,
    available: true,
    featured: true
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan crisps, croutons, and classic Caesar dressing',
    price: 12.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing', 'Anchovies'],
    isVegetarian: false,
    calories: 320,
    prepTime: 10,
    rating: 4.5,
    available: true
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 9.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla Ice Cream'],
    isVegetarian: true,
    calories: 450,
    prepTime: 15,
    rating: 5.0,
    available: true,
    featured: true
  },
  {
    name: 'Lobster Bisque',
    description: 'Rich and creamy lobster soup with cognac and herbs',
    price: 16.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    ingredients: ['Lobster', 'Cream', 'Cognac', 'Tomato Paste', 'Herbs'],
    isGlutenFree: true,
    calories: 380,
    prepTime: 20,
    rating: 4.8,
    available: true
  },
  {
    name: 'Chicken Tikka Masala',
    description: 'Tender chicken in a rich, creamy tomato-based curry sauce',
    price: 21.99,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    ingredients: ['Chicken', 'Tomato Sauce', 'Cream', 'Tikka Masala Spices', 'Basmati Rice'],
    spiceLevel: 'medium',
    calories: 580,
    prepTime: 30,
    rating: 4.7,
    available: true
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany();
    await User.deleteMany();

    // Insert menu items
    await MenuItem.insertMany(menuItems);

    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@luxebistro.com',
      password: 'admin123',
      phone: '+1234567890',
      role: 'admin'
    });

    // Create test customer
    await User.create({
      name: 'John Doe',
      email: 'customer@example.com',
      password: 'customer123',
      phone: '+1987654321',
      role: 'customer'
    });

    console.log('✅ Data imported successfully!');
    console.log('📧 Admin: admin@luxebistro.com / admin123');
    console.log('📧 Customer: customer@example.com / customer123');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await MenuItem.deleteMany();
    await User.deleteMany();

    console.log('✅ Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

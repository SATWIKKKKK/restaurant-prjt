// server.js - Express Backend Server
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Orders database file path
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

// Initialize data directory and orders file
const initializeDatabase = async () => {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    try {
      await fs.access(ORDERS_FILE);
    } catch {
      await fs.writeFile(ORDERS_FILE, JSON.stringify([], null, 2));
      console.log('Created orders.json file');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Read orders from file
const readOrders = async () => {
  try {
    const data = await fs.readFile(ORDERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
};

// Write orders to file
const writeOrders = async (orders) => {
  try {
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing orders:', error);
    return false;
  }
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Restaurant API Server', 
    status: 'running',
    endpoints: {
      orders: '/api/orders',
      placeOrder: 'POST /api/orders',
      getOrder: 'GET /api/orders/:id'
    }
  });
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await readOrders();
    res.json({ 
      success: true, 
      count: orders.length,
      orders 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching orders',
      error: error.message 
    });
  }
});

// Get single order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const orders = await readOrders();
    const order = orders.find(o => o.id === req.params.id);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    res.json({ 
      success: true, 
      order 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching order',
      error: error.message 
    });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items, total } = req.body;
    
    // Validation
    if (!customer || !customer.name || !customer.email || !customer.phone || !customer.address) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required customer information' 
      });
    }
    
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order must contain at least one item' 
      });
    }
    
    // Create new order
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customer,
      items,
      total: parseFloat(total),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Read existing orders and add new one
    const orders = await readOrders();
    orders.push(newOrder);
    
    // Save to file
    const saved = await writeOrders(orders);
    
    if (!saved) {
      throw new Error('Failed to save order');
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully',
      order: newOrder 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error creating order',
      error: error.message 
    });
  }
});

// Update order status
app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'preparing', 'ready', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }
    
    const orders = await readOrders();
    const orderIndex = orders.findIndex(o => o.id === req.params.id);
    
    if (orderIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    
    const saved = await writeOrders(orders);
    
    if (!saved) {
      throw new Error('Failed to update order');
    }
    
    res.json({ 
      success: true, 
      message: 'Order updated successfully',
      order: orders[orderIndex] 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating order',
      error: error.message 
    });
  }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const orders = await readOrders();
    const filteredOrders = orders.filter(o => o.id !== req.params.id);
    
    if (orders.length === filteredOrders.length) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    const saved = await writeOrders(filteredOrders);
    
    if (!saved) {
      throw new Error('Failed to delete order');
    }
    
    res.json({ 
      success: true, 
      message: 'Order deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting order',
      error: error.message 
    });
  }
});

// Start server
const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Orders stored in: ${ORDERS_FILE}`);
  });
};

startServer();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Enable CORS
app.use(cors());
// Parse JSON request body
app.use(express.json());

// In-memory data store (replace with a real database in production)
const users = [];
const services = [
  {
    id: "1",
    name: "Cleaning",
    description: "Professional home cleaning services",
    icon: "broom",
    price: "From ₹999/hr",
    rating: 4.8
  },
  {
    id: "2",
    name: "Cooking",
    description: "Skilled chefs for all your cooking needs",
    icon: "cooking-pot",
    price: "From ₹1200/hr",
    rating: 4.7
  },
  {
    id: "3",
    name: "Driver",
    description: "Professional drivers for all your needs",
    icon: "car",
    price: "From ₹800/hr",
    rating: 4.5
  },
  {
    id: "4",
    name: "Plumbing",
    description: "Expert plumbers for any plumbing issue",
    icon: "shower-head",
    price: "From ₹1500/hr",
    rating: 4.9
  },
  {
    id: "5",
    name: "Electrical",
    description: "Skilled electricians at your service",
    icon: "lamp-desk",
    price: "From ₹1800/hr",
    rating: 4.8
  },
  {
    id: "6",
    name: "Helper",
    description: "General assistance for various tasks",
    icon: "hand-helping",
    price: "From ₹600/hr",
    rating: 4.6
  },
  {
    id: "7",
    name: "Dusting",
    description: "Thorough dusting and cleaning services",
    icon: "trash",
    price: "From ₹800/hr",
    rating: 4.5
  },
  {
    id: "8",
    name: "Laundry",
    description: "Professional laundry and ironing services",
    icon: "washing-machine",
    price: "From ₹1000/hr",
    rating: 4.7
  }
];

const providers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    service: "Cleaning",
    rating: 4.8,
    reviews: 124,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    price: "₹999/hr",
    location: "Delhi NCR",
    available: true
  },
  {
    id: "2",
    name: "Priya Sharma",
    service: "Cleaning",
    rating: 4.9,
    reviews: 89,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    price: "₹1200/hr",
    location: "Mumbai",
    available: true
  },
  {
    id: "3",
    name: "Amit Singh",
    service: "Cleaning",
    rating: 4.7,
    reviews: 56,
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    price: "₹850/hr",
    location: "Bangalore",
    available: false
  }
];

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

// Helper function to generate JWT tokens
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Routes
app.get('/api/services', (req, res) => {
  res.json(services);
});

app.get('/api/service-providers/:serviceId', (req, res) => {
  const { serviceId } = req.params;
  // In a real app, filter by serviceId
  res.json(providers);
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      mobile
    };
    
    users.push(user);
    
    // Generate token
    const token = generateToken(user);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Demo login for testing
    if (email === "demo@example.com" && password === "password") {
      const user = {
        id: "demo123",
        name: "Demo User",
        email: "demo@example.com"
      };
      const token = generateToken(user);
      return res.json({
        success: true,
        token,
        user
      });
    }
    
    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user);
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/book-service', authenticateToken, (req, res) => {
  try {
    const { serviceId, providerId, date, address, paymentMethod } = req.body;
    
    // In a real app, save to database
    const bookingId = Date.now().toString();
    
    // Simulate a 10% chance of failure
    if (Math.random() > 0.1) {
      return res.json({
        success: true,
        bookingId,
        message: 'Booking confirmed!'
      });
    } else {
      return res.status(500).json({ message: 'Booking failed' });
    }
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/register-provider', (req, res) => {
  try {
    const providerData = req.body;
    
    // In a real app, save to database
    
    // Simulate a 10% chance of failure
    if (Math.random() > 0.1) {
      res.json({ success: true });
    } else {
      res.status(500).json({ message: 'Registration failed' });
    }
  } catch (error) {
    console.error('Provider registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  // Simple chatbot responses
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    res.json({ message: "Hello! How can I help you with our home services today?" });
  } else if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost")) {
    res.json({ message: "Our service prices start from ₹600/hour for helpers to ₹1800/hour for specialized services like electrical work." });
  } else {
    res.json({ message: "Thanks for your message! Our team will help you with your query." });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

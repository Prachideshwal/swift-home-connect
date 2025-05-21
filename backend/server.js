
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

// Enable CORS
app.use(cors());
// Parse JSON request body
app.use(express.json());

// MongoDB connection string
const MONGODB_URI = "mongodb+srv://prachideshwal15:115599@cluster0.2desqwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let db;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    db = client.db("home_services");
    
    // Initialize collections if they don't exist
    await initializeCollections();
    
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
}

// Initialize collections with sample data if empty
async function initializeCollections() {
  // Check if services collection is empty and add sample data
  const servicesCount = await db.collection('services').countDocuments();
  if (servicesCount === 0) {
    await db.collection('services').insertMany([
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
    ]);
    console.log("Added sample services");
  }

  // Check if providers collection is empty and add sample data
  const providersCount = await db.collection('providers').countDocuments();
  if (providersCount === 0) {
    await db.collection('providers').insertMany([
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
    ]);
    console.log("Added sample providers");
  }
}

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

// Helper function to generate JWT tokens
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
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
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.collection('services').find().toArray();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/service-providers/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await db.collection('services').findOne({ id: serviceId });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    const providers = await db.collection('providers')
      .find({ service: service.name })
      .toArray();
      
    res.json(providers);
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      mobile,
      createdAt: new Date()
    });
    
    const user = {
      _id: result.insertedId,
      name,
      email
    };
    
    // Generate token
    const token = generateToken(user);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
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
        _id: "demo123",
        name: "Demo User",
        email: "demo@example.com"
      };
      const token = generateToken(user);
      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    }
    
    // Find user
    const user = await db.collection('users').findOne({ email });
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
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/book-service', authenticateToken, async (req, res) => {
  try {
    const { serviceId, providerId, date, address, paymentMethod } = req.body;
    
    // Validate service and provider exist
    const service = await db.collection('services').findOne({ id: serviceId });
    const provider = await db.collection('providers').findOne({ id: providerId });
    
    if (!service || !provider) {
      return res.status(404).json({ message: 'Service or provider not found' });
    }
    
    // Create booking
    const booking = {
      userId: req.user.id,
      serviceId,
      providerId,
      serviceName: service.name,
      providerName: provider.name,
      date,
      address,
      paymentMethod,
      status: 'pending',
      createdAt: new Date()
    };
    
    const result = await db.collection('bookings').insertOne(booking);
    
    res.json({
      success: true,
      bookingId: result.insertedId,
      message: 'Booking confirmed!'
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/register-provider', async (req, res) => {
  try {
    const providerData = req.body;
    
    const result = await db.collection('provider_applications').insertOne({
      ...providerData,
      status: 'pending',
      createdAt: new Date()
    });
    
    res.json({ 
      success: true,
      applicationId: result.insertedId
    });
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

// Connect to MongoDB first, then start the server
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB. Server not started.', err);
  });

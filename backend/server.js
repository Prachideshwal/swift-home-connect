
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb+srv://prachideshwal15:115599@cluster0.2desqwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(mongoURI);
let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    db = client.db('home_services_app');
    
    // Initialize collections if they don't exist
    await initializeCollections();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function initializeCollections() {
  try {
    // Check if services collection exists and has data
    const servicesCount = await db.collection('services').countDocuments();
    if (servicesCount === 0) {
      // Seed services data
      await seedServicesData();
    }
  } catch (error) {
    console.error('Error initializing collections:', error);
  }
}

async function seedServicesData() {
  const services = [
    {
      name: "Cleaning",
      description: "Professional home cleaning services",
      icon: "broom",
      price: "999",
      rating: 4.8
    },
    {
      name: "Cooking",
      description: "Skilled chefs for all your cooking needs",
      icon: "cooking-pot",
      price: "1200",
      rating: 4.7
    },
    {
      name: "Driver",
      description: "Professional drivers for all your needs",
      icon: "car",
      price: "800",
      rating: 4.5
    },
    {
      name: "Plumbing",
      description: "Expert plumbers for any plumbing issue",
      icon: "shower-head",
      price: "1500",
      rating: 4.9
    },
    {
      name: "Electrical",
      description: "Skilled electricians at your service",
      icon: "lamp-desk",
      price: "1800",
      rating: 4.8
    },
    {
      name: "Helper",
      description: "General assistance for various tasks",
      icon: "hand-helping",
      price: "600",
      rating: 4.6
    },
    {
      name: "Dusting",
      description: "Thorough dusting and cleaning services",
      icon: "trash",
      price: "800",
      rating: 4.5
    },
    {
      name: "Laundry",
      description: "Professional laundry and ironing services",
      icon: "washing-machine",
      price: "1000",
      rating: 4.7
    }
  ];

  await db.collection('services').insertMany(services);
  console.log('Services data seeded successfully');
}

// JWT Secret
const JWT_SECRET = "home-services-app-secret";

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// API Routes
// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.collection('services').find({}).toArray();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// Get service providers for a specific service
app.get('/api/service-providers/:serviceId', async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await db.collection('services').findOne({ _id: new ObjectId(serviceId) });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // For demo purposes, we'll return mock service providers
    const serviceProviders = [
      {
        id: "1",
        name: "Rajesh Kumar",
        service: service.name,
        rating: 4.8,
        reviews: 124,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        price: `₹${service.price}/hr`,
        location: "Delhi NCR",
        available: true
      },
      {
        id: "2",
        name: "Priya Sharma",
        service: service.name,
        rating: 4.9,
        reviews: 89,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        price: `₹${parseInt(service.price) + 200}/hr`,
        location: "Mumbai",
        available: true
      },
      {
        id: "3",
        name: "Amit Singh",
        service: service.name,
        rating: 4.7,
        reviews: 56,
        image: "https://randomuser.me/api/portraits/men/56.jpg",
        price: `₹${parseInt(service.price) - 150}/hr`,
        location: "Bangalore",
        available: false
      }
    ];
    
    res.json(serviceProviders);
  } catch (error) {
    console.error('Error fetching service providers:', error);
    res.status(500).json({ message: 'Error fetching service providers' });
  }
});

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    
    // Validation
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      mobile,
      createdAt: new Date(),
    };
    
    await db.collection('users').insertOne(newUser);
    
    // Generate JWT
    const token = jwt.sign({ id: newUser._id, email }, JWT_SECRET, { expiresIn: '24h' });
    
    // Return success without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find user
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT
    const token = jwt.sign({ id: user._id, email }, JWT_SECRET, { expiresIn: '24h' });
    
    // Return success without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Book a Service (Protected)
app.post('/api/book-service', authenticateToken, async (req, res) => {
  try {
    const { serviceId, providerId, date, address, paymentMethod } = req.body;
    const userId = req.user.id;
    
    // Validation
    if (!serviceId || !providerId || !date || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Create booking
    const booking = {
      userId,
      serviceId,
      providerId,
      date: new Date(date),
      address,
      paymentMethod: paymentMethod || 'online',
      status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
      createdAt: new Date()
    };
    
    const result = await db.collection('bookings').insertOne(booking);
    
    res.status(201).json({
      message: 'Service booked successfully',
      bookingId: result.insertedId,
      success: true
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Error booking service', success: false });
  }
});

// Register as Provider
app.post('/api/register-provider', async (req, res) => {
  try {
    const { name, email, mobile, services, experience, address, idProof } = req.body;
    
    // Validation
    if (!name || !email || !mobile || !services || !experience || !address) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    // Check if already registered
    const existingProvider = await db.collection('providers').findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ 
        message: 'You are already registered as a provider', 
        success: false
      });
    }
    
    // Create new provider
    const newProvider = {
      name,
      email,
      mobile,
      services,
      experience,
      address,
      idProof,
      status: 'pending', // Requires admin approval
      createdAt: new Date()
    };
    
    await db.collection('providers').insertOne(newProvider);
    
    res.status(201).json({
      message: 'Provider registration successful. Your application is under review.',
      success: true
    });
  } catch (error) {
    console.error('Provider registration error:', error);
    res.status(500).json({ 
      message: 'Error during provider registration', 
      success: false 
    });
  }
});

// Chat bot API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    // Simple chatbot responses
    let response;
    
    if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
      response = "Hello! How can I help you with our home services today?";
    } else if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost") || message.toLowerCase().includes("rate")) {
      response = "Our service prices start from ₹600/hour for helpers to ₹1800/hour for specialized services like electrical work. You can see specific pricing on each service page.";
    } else if (message.toLowerCase().includes("booking") || message.toLowerCase().includes("book")) {
      response = "To book a service, simply browse our service categories, select a provider, and choose your preferred time. You can pay online or via cash on delivery!";
    } else if (message.toLowerCase().includes("cancel")) {
      response = "You can cancel a booking up to 2 hours before the scheduled time without any charges. Please go to 'My Bookings' to cancel.";
    } else if (message.toLowerCase().includes("payment") || message.toLowerCase().includes("pay")) {
      response = "We accept both online payments and cash on delivery. You can choose your preferred payment method during checkout.";
    } else if (message.toLowerCase().includes("cash") || message.toLowerCase().includes("cod")) {
      response = "Yes, we do offer cash on delivery option for all our services. You can select this option at checkout.";
    } else {
      response = "Thanks for your message! Our team will help you with your query. In the meantime, feel free to browse our services or check our FAQ section.";
    }
    
    res.json({ message: response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: "Sorry, I couldn't process your request at the moment." });
  }
});

// Provider location tracking (for live tracking feature)
app.get('/api/provider-location/:bookingId', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    
    // In a real app, this would fetch the current location from a real-time database
    // For demo, we'll return a location with some randomness
    res.json({
      lat: 28.6139 + (Math.random() * 0.01), // Delhi coordinates with randomness
      lng: 77.2090 + (Math.random() * 0.01)
    });
  } catch (error) {
    console.error('Error getting provider location:', error);
    res.status(500).json({ message: 'Error fetching provider location' });
  }
});

// Start the server
async function startServer() {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();

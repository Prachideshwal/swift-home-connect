
// This file would contain all API calls in a production app
// For now, we'll mock the data

import { toast } from "@/components/ui/sonner";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: string;
  rating: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  image: string;
  price: string;
  location: string;
  available: boolean;
}

export interface Booking {
  id: string;
  service: string;
  provider: string;
  date: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: string;
  paymentMethod: "online" | "cod";
}

// Mock Services Data
export const getServices = async (): Promise<Service[]> => {
  return [
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
};

// Mock Service Providers
export const getServiceProviders = async (serviceId: string): Promise<ServiceProvider[]> => {
  // In a real app, this would filter based on the serviceId
  return [
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
};

// Book a service
export const bookService = async (
  serviceId: string,
  providerId: string,
  date: Date,
  address: string,
  paymentMethod: 'online' | 'cod' = 'online'
): Promise<boolean> => {
  // In a real app, this would make an API call to create a booking
  console.log("Booking service:", { serviceId, providerId, date, address, paymentMethod });
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Simulate success (with 10% chance of failure for demo)
  const success = Math.random() > 0.1;
  
  if (success) {
    if (paymentMethod === 'online') {
      // Here we would normally redirect to a payment gateway
      toast.success("Redirecting to payment gateway...");
      // Simulate payment process
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    toast.success("Booking confirmed! Check your bookings for details.");
  } else {
    toast.error("Booking failed. Please try again.");
  }
  
  return success;
};

// Simulated provider location for tracking
export const getProviderLocation = async (bookingId: string): Promise<{lat: number, lng: number}> => {
  // This would normally fetch the current location from a real-time database
  // For demo, we'll return a location near the destination with some randomness
  return {
    lat: 28.6139 + (Math.random() * 0.01), // Delhi coordinates
    lng: 77.2090 + (Math.random() * 0.01)
  };
};

// Provider registration
export const registerAsProvider = async (formData: any): Promise<boolean> => {
  // In a real app, this would register the provider in the database
  console.log("Registering provider:", formData);
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Simulate success (with 10% chance of failure for demo)
  const success = Math.random() > 0.1;
  
  if (success) {
    toast.success("Registration successful! We'll review your application and get back to you soon.");
  } else {
    toast.error("Registration failed. Please try again.");
  }
  
  return success;
};

// Chat bot api mock
export const sendChatMessage = async (message: string): Promise<string> => {
  // In a real app, this would send the message to a chatbot API
  console.log("Sending chat message:", message);
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Simple chatbot responses
  if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
    return "Hello! How can I help you with our home services today?";
  } else if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost") || message.toLowerCase().includes("rate")) {
    return "Our service prices start from ₹600/hour for helpers to ₹1800/hour for specialized services like electrical work. You can see specific pricing on each service page.";
  } else if (message.toLowerCase().includes("booking") || message.toLowerCase().includes("book")) {
    return "To book a service, simply browse our service categories, select a provider, and choose your preferred time. You can pay online or via cash on delivery!";
  } else if (message.toLowerCase().includes("cancel")) {
    return "You can cancel a booking up to 2 hours before the scheduled time without any charges. Please go to 'My Bookings' to cancel.";
  } else if (message.toLowerCase().includes("payment") || message.toLowerCase().includes("pay")) {
    return "We accept both online payments and cash on delivery. You can choose your preferred payment method during checkout.";
  } else if (message.toLowerCase().includes("cash") || message.toLowerCase().includes("cod")) {
    return "Yes, we do offer cash on delivery option for all our services. You can select this option at checkout.";
  } else {
    return "Thanks for your message! Our team will help you with your query. In the meantime, feel free to browse our services or check our FAQ section.";
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<boolean> => {
  // In a real app, this would authenticate against a backend
  console.log("Logging in user:", { email });
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Simple validation
  if (!email || !password) {
    toast.error("Please enter both email and password");
    return false;
  }
  
  // Demo authentication - in real app this would check against a database
  if (email === "demo@example.com" && password === "password") {
    toast.success("Login successful!");
    localStorage.setItem("user", JSON.stringify({ email, name: "Demo User" }));
    return true;
  }
  
  toast.error("Invalid email or password");
  return false;
};

// Register user
export const registerUser = async (name: string, email: string, password: string, mobile: string): Promise<boolean> => {
  // In a real app, this would register a user in the database
  console.log("Registering user:", { name, email, mobile });
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Simple validation
  if (!name || !email || !password || !mobile) {
    toast.error("Please fill all required fields");
    return false;
  }
  
  // Check if mobile is 10 digits (India format)
  if (!/^\d{10}$/.test(mobile)) {
    toast.error("Please enter a valid 10-digit mobile number");
    return false;
  }
  
  // Demo registration - in real app this would save to a database
  toast.success("Registration successful! You can now login.");
  return true;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem("user");
  toast.success("Logged out successfully");
};

// Get current user
export const getCurrentUser = (): { email: string, name: string } | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

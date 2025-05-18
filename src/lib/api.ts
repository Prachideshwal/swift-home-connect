
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
}

// Mock Services Data
export const getServices = async (): Promise<Service[]> => {
  return [
    {
      id: "1",
      name: "Cleaning",
      description: "Professional home cleaning services",
      icon: "broom",
      price: "From $20/hr",
      rating: 4.8
    },
    {
      id: "2",
      name: "Cooking",
      description: "Skilled chefs for all your cooking needs",
      icon: "cooking-pot",
      price: "From $25/hr",
      rating: 4.7
    },
    {
      id: "3",
      name: "Driver",
      description: "Professional drivers for all your needs",
      icon: "car",
      price: "From $18/hr",
      rating: 4.5
    },
    {
      id: "4",
      name: "Plumbing",
      description: "Expert plumbers for any plumbing issue",
      icon: "shower-head",
      price: "From $35/hr",
      rating: 4.9
    },
    {
      id: "5",
      name: "Electrical",
      description: "Skilled electricians at your service",
      icon: "lamp-desk",
      price: "From $40/hr",
      rating: 4.8
    },
    {
      id: "6",
      name: "Helper",
      description: "General assistance for various tasks",
      icon: "hand-helping",
      price: "From $15/hr",
      rating: 4.6
    },
    {
      id: "7",
      name: "Dusting",
      description: "Thorough dusting and cleaning services",
      icon: "trash",
      price: "From $18/hr",
      rating: 4.5
    },
    {
      id: "8",
      name: "Laundry",
      description: "Professional laundry and ironing services",
      icon: "washing-machine",
      price: "From $22/hr",
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
      name: "Alex Johnson",
      service: "Cleaning",
      rating: 4.8,
      reviews: 124,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      price: "$22/hr",
      location: "Downtown",
      available: true
    },
    {
      id: "2",
      name: "Maria Garcia",
      service: "Cleaning",
      rating: 4.9,
      reviews: 89,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      price: "$25/hr",
      location: "Westside",
      available: true
    },
    {
      id: "3",
      name: "James Smith",
      service: "Cleaning",
      rating: 4.7,
      reviews: 56,
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      price: "$20/hr",
      location: "Northside",
      available: false
    }
  ];
};

// Book a service
export const bookService = async (
  serviceId: string,
  providerId: string,
  date: Date,
  address: string
): Promise<boolean> => {
  // In a real app, this would make an API call to create a booking
  console.log("Booking service:", { serviceId, providerId, date, address });
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Simulate success (with 10% chance of failure for demo)
  const success = Math.random() > 0.1;
  
  if (success) {
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
    lat: 40.7128 + (Math.random() * 0.01),
    lng: -74.006 + (Math.random() * 0.01)
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
  } else if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost")) {
    return "Our service prices start from $15/hour for helpers to $40/hour for specialized services like electrical work. You can see specific pricing on each service page.";
  } else if (message.toLowerCase().includes("booking") || message.toLowerCase().includes("book")) {
    return "To book a service, simply browse our service categories, select a provider, and choose your preferred time. It's quick and easy!";
  } else if (message.toLowerCase().includes("cancel")) {
    return "You can cancel a booking up to 2 hours before the scheduled time without any charges. Please go to 'My Bookings' to cancel.";
  } else {
    return "Thanks for your message! Our team will help you with your query. In the meantime, feel free to browse our services or check our FAQ section.";
  }
};

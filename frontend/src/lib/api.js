
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for making API requests
const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    method,
    headers,
  };
  
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }
    
    return result;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

// Get all services
export const getServices = async () => {
  try {
    const response = await apiRequest('/services');
    return response;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
};

// Get service providers for a specific service
export const getServiceProviders = async (serviceId) => {
  try {
    const response = await apiRequest(`/service-providers/${serviceId}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch service providers:", error);
    return [];
  }
};

// User registration
export const registerUser = async (name, email, password, mobile) => {
  try {
    await apiRequest('/register', 'POST', { name, email, password, mobile });
    
    // Auto login after registration
    localStorage.setItem("user", JSON.stringify({ email, name }));
    return true;
  } catch (error) {
    console.error("Registration error:", error);
    return false;
  }
};

// User login
export const loginUser = async (email, password) => {
  try {
    const response = await apiRequest('/login', 'POST', { email, password });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

// User logout
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Book a service
export const bookService = async (serviceId, providerId, date, address, paymentMethod = 'online') => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await apiRequest(
      '/book-service', 
      'POST', 
      { serviceId, providerId, date, address, paymentMethod },
      token
    );
    
    return response.success;
  } catch (error) {
    console.error("Booking error:", error);
    return false;
  }
};

// Register as a service provider
export const registerAsProvider = async (formData) => {
  try {
    const response = await apiRequest('/register-provider', 'POST', formData);
    return response.success;
  } catch (error) {
    console.error("Provider registration failed:", error);
    return false;
  }
};

// Chat bot api
export const sendChatMessage = async (message) => {
  try {
    const response = await apiRequest('/chat', 'POST', { message });
    return response.message;
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I couldn't process your request at the moment.";
  }
};

// Simulated provider location for tracking
export const getProviderLocation = async (bookingId) => {
  // This would normally fetch from the backend
  // For this example, we'll just return mock coordinates
  return {
    lat: 28.6139 + (Math.random() * 0.01),
    lng: 77.2090 + (Math.random() * 0.01)
  };
};

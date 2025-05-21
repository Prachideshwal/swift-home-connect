
# Home Services Backend

## Setup

1. Install dependencies:
```
npm install
```

2. Start the server:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/register` - Register a new user
- POST `/api/login` - Login a user

### Services
- GET `/api/services` - Get all services
- GET `/api/service-providers/:serviceId` - Get service providers for a service

### Bookings
- POST `/api/book-service` - Book a service (requires authentication)

### Providers
- POST `/api/register-provider` - Register as a service provider

### Chat
- POST `/api/chat` - Send a message to the chatbot

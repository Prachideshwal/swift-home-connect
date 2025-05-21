
# Swift Home Connect - Service Booking Application

A full-stack JavaScript application for booking home services, with a React frontend and Node.js/Express backend.

## Project Structure

```
.
├── frontend/         # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
└── backend/          # Express backend API
    ├── server.js     # Main server file
    └── package.json  # Backend dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

The frontend will run on http://localhost:8080

## Demo Credentials

For testing purposes, you can use the following demo credentials:

- Email: demo@example.com
- Password: password

## Features

- User authentication (register/login)
- Browse services and service providers
- Book services
- Live tracking of service providers
- Provider registration
- Chat support

## Technologies Used

### Frontend
- React
- React Router
- TanStack Query (React Query)
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- Embla Carousel

### Backend
- Node.js
- Express
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

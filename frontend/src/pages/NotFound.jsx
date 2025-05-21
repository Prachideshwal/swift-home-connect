
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="text-6xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">404</div>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-xl text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/">
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              Go back home
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline">
              View services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

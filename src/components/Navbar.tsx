
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  User, 
  LogIn,
  LogOut
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                Swift<span className="text-brand-blue">Home</span>Connect
              </span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-brand-blue transition-colors">
                Home
              </Link>
              <Link to="/services" className="px-3 py-2 text-sm font-medium hover:text-brand-blue transition-colors">
                Services
              </Link>
              <Link to="/become-provider" className="px-3 py-2 text-sm font-medium hover:text-brand-blue transition-colors">
                Become a Provider
              </Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium hover:text-brand-blue transition-colors">
                About
              </Link>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className="cursor-pointer">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90" onClick={() => navigate('/register')}>
                  <User className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
            
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={toggleMenu}>
                {isOpen ? <X /> : <Menu />}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/services" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link to="/become-provider" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}>
              Become a Provider
            </Link>
            <Link to="/about" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}>
              About
            </Link>
            {!isAuthenticated && (
              <>
                <Link to="/login"
                  className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register"
                  className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

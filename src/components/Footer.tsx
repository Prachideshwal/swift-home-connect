
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
                Swift<span className="text-brand-blue">Home</span>Connect
              </span>
            </Link>
            <p className="text-gray-500 text-sm">
              Your one-stop solution for all home services. Quality services at your fingertips.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/cleaning" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/plumbing" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/services/electrical" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  Electrical
                </Link>
              </li>
              <li>
                <Link to="/services/cooking" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  Cooking
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  View All
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/become-provider" className="text-gray-500 hover:text-brand-blue transition-colors text-sm">
                  Join as Provider
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-500 flex items-center text-sm">
                <Phone size={16} className="mr-2" /> +1 (555) 123-4567
              </li>
              <li className="text-gray-500 flex items-center text-sm">
                <Mail size={16} className="mr-2" /> support@swifthomeconnect.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Swift Home Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

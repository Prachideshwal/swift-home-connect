
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useRef } from 'react';

export default function Banner() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselApi = useRef(null);
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/services');
  };
  
  const serviceCategories = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Painting",
    "Carpentry",
    "AC Repair"
  ];

  // Set up carousel API reference
  const onCarouselCreated = (api) => {
    carouselApi.current = api;
    
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  };

  // Autoplay logic
  useEffect(() => {
    if (!carouselApi.current) return;
    
    const interval = setInterval(() => {
      if (currentSlide === serviceCategories.length - 1) {
        carouselApi.current?.scrollTo(0);
      } else {
        carouselApi.current?.next();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentSlide, serviceCategories.length]);
  
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Expert Home Services at Your <span className="text-brand-blue">Fingertips</span>
            </h1>
            
            <div className="h-10 overflow-hidden">
              <Carousel
                opts={{
                  loop: true,
                  skipSnaps: false,
                  duration: 10
                }}
                className="w-full"
                setApi={onCarouselCreated}
              >
                <CarouselContent>
                  {serviceCategories.map((category, i) => (
                    <CarouselItem key={i} className="basis-full">
                      <p className="text-lg md:text-xl text-brand-blue font-medium">
                        Need {category}? We've got you covered.
                      </p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            
            <p className="text-gray-600 text-lg">
              Book trusted professionals for all your home service needs across India.
            </p>
            
            <form onSubmit={handleSearch} className="flex space-x-2 max-w-md">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text" 
                  placeholder="Enter your location in India" 
                  className="pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 whitespace-nowrap">
                <Search className="h-4 w-4 mr-2" />
                Find Services
              </Button>
            </form>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-2">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-green-500 mr-1"></div>
                <span>Verified Experts</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-blue-500 mr-1"></div>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-purple-500 mr-1"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-yellow-500 mr-1"></div>
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
              alt="Home services" 
              className="rounded-lg shadow-xl object-cover h-96 w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Live Tracking</p>
                  <p className="text-xs text-gray-500">Know exactly when your service provider will arrive</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <p className="text-sm font-semibold text-brand-blue">50+</p>
                <p className="text-xs text-gray-500">Cities in India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

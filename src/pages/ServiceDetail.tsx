
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { Service, ServiceProvider, getServices, getServiceProviders, bookService } from '@/lib/api';
import { Loader2, MapPin, Star, Clock, ArrowRight, CheckCircle } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [address, setAddress] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  useEffect(() => {
    const loadServiceAndProviders = async () => {
      try {
        const services = await getServices();
        const serviceData = services.find(s => s.id === id);
        
        if (serviceData) {
          setService(serviceData);
          const providersData = await getServiceProviders(id || '');
          setProviders(providersData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to load service details:", error);
        setLoading(false);
      }
    };
    
    loadServiceAndProviders();
  }, [id]);
  
  const handleBookService = async () => {
    if (!service || !selectedProvider || !date || !address) {
      alert("Please select a provider, date, and enter your address");
      return;
    }
    
    setIsBooking(true);
    
    try {
      const result = await bookService(service.id, selectedProvider, date, address);
      
      if (result) {
        setBookingComplete(true);
        
        // In a real app, we'd navigate to a booking confirmation page
        setTimeout(() => {
          navigate('/bookings/' + Math.floor(Math.random() * 1000));
        }, 3000);
      } else {
        setIsBooking(false);
      }
      
    } catch (error) {
      console.error("Failed to book service:", error);
      setIsBooking(false);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-64 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
              <div>
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!service) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="mb-6 text-gray-600">The service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/services')} className="bg-brand-blue hover:bg-brand-blue/90">
            Browse All Services
          </Button>
        </div>
      </Layout>
    );
  }
  
  if (bookingComplete) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="mb-6 text-gray-600 text-lg">
            Your {service.name} service has been booked successfully.
          </p>
          <p className="mb-10 text-gray-600">
            You will be redirected to your booking details page...
          </p>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/')} variant="outline" className="mx-2">
              Return to Home
            </Button>
            <Button onClick={() => navigate('/bookings')} className="bg-brand-blue hover:bg-brand-blue/90 mx-2">
              View My Bookings
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{service.name} Services</h1>
          <p className="mt-2 text-gray-600">
            Book professional {service.name.toLowerCase()} services for your home or office
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left content */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About {service.name} Services</h2>
                <p className="text-gray-700 mb-4">
                  Our professional {service.name.toLowerCase()} services are designed to provide you 
                  with high-quality, reliable assistance whenever you need it. Our verified experts bring all 
                  necessary equipment and skills to ensure excellent results.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Flexible Hours</p>
                      <p className="text-xs text-gray-500">Morning to evening availability</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{service.rating} Average Rating</p>
                      <p className="text-xs text-gray-500">Based on customer reviews</p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-3">What's included:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Professional, vetted service providers</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">All necessary equipment and supplies</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Satisfaction guarantee</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Real-time provider tracking</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* Service Providers */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose a Service Provider</h2>
              
              <RadioGroup value={selectedProvider || ''} onValueChange={setSelectedProvider}>
                <div className="space-y-4">
                  {providers.map((provider) => (
                    <div key={provider.id} className="flex">
                      <RadioGroupItem 
                        value={provider.id} 
                        id={`provider-${provider.id}`}
                        className="sr-only peer"
                      />
                      <Label
                        htmlFor={`provider-${provider.id}`}
                        className="flex flex-1 items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-brand-blue peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-brand-blue"
                      >
                        <div className="flex flex-1 items-center">
                          <Avatar className="h-16 w-16 mr-4">
                            <AvatarImage src={provider.image} />
                            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium">{provider.name}</h3>
                              <p className="font-semibold">{provider.price}</p>
                            </div>
                            <div className="flex items-center text-sm mb-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span>{provider.rating} ({provider.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{provider.location}</span>
                              <span className="mx-2">•</span>
                              <span>{provider.available ? 'Available Today' : 'Next Available: Tomorrow'}</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-2" />
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
          
          {/* Booking sidebar */}
          <div>
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Book {service.name} Service</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="border rounded-md"
                        disabled={(date) => {
                          // Disable dates in the past
                          return date < new Date();
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Your Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter your full address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      className="w-full bg-brand-blue hover:bg-brand-blue/90" 
                      disabled={!selectedProvider || !date || !address || isBooking}
                      onClick={handleBookService}
                    >
                      {isBooking ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Book Now'
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-500">
                      <p>Starting from {service.price}</p>
                      <p className="mt-1">Free cancellation up to 2 hours before</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

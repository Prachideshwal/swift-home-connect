
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
import { useToast } from '@/components/ui/use-toast';
import { Service, ServiceProvider, getServices, getServiceProviders, bookService, createStripeCheckout } from '@/lib/api';
import { Loader2, MapPin, Star, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [address, setAddress] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  
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
      toast({
        title: "Missing information",
        description: "Please select a provider, date, and enter your address",
        variant: "destructive"
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to book a service",
        variant: "destructive"
      });
      navigate('/login', { state: { from: `/services/${id}` } });
      return;
    }
    
    setIsBooking(true);
    
    try {
      if (paymentMethod === 'online') {
        // Create Stripe checkout session
        const result = await createStripeCheckout({
          serviceId: service.id,
          providerId: selectedProvider,
          date: date.toISOString(),
          address,
          price: service.price.replace('₹', '').replace('/hr', '')
        });
        
        if (result && result.url) {
          // Redirect to Stripe checkout
          window.location.href = result.url;
        } else {
          throw new Error("Failed to create payment session");
        }
      } else {
        // Cash on delivery flow
        const result = await bookService(service.id, selectedProvider, date, address, paymentMethod);
        
        if (result) {
          setBookingComplete(true);
          
          setTimeout(() => {
            navigate('/bookings/' + Math.floor(Math.random() * 1000));
          }, 3000);
        } else {
          throw new Error("Booking failed");
        }
      }
    } catch (error) {
      console.error("Failed to process booking:", error);
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
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
          <p className="mb-2 text-gray-600">
            Payment Method: {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
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
            <Card className="border-t-4 border-t-brand-blue">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About {service.name} Services</h2>
                <p className="text-gray-700 mb-4">
                  Our professional {service.name.toLowerCase()} services are designed to provide you 
                  with high-quality, reliable assistance whenever you need it. Our verified experts bring all 
                  necessary equipment and skills to ensure excellent results.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Flexible Hours</p>
                      <p className="text-xs text-gray-500">Morning to evening availability</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                      <Star className="h-5 w-5" />
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
                              <p className="font-semibold">₹{provider.price.replace('₹', '').replace('$', '')}</p>
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
              <Card className="border-t-4 border-t-brand-blue shadow-lg">
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
                        placeholder="Enter your full address in India"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'online' | 'cod')}>
                        <div className="flex items-center space-x-2 border p-3 rounded-md mb-2 hover:bg-gray-50">
                          <RadioGroupItem value="online" id="payment-online" />
                          <Label htmlFor="payment-online" className="cursor-pointer flex items-center">
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" rx="4" fill="#635BFF"/>
                              <path d="M13.6 11.25H10.4C10.0687 11.25 9.8 11.5187 9.8 11.85V12.15C9.8 12.4813 10.0687 12.75 10.4 12.75H13.6C13.9313 12.75 14.2 12.4813 14.2 12.15V11.85C14.2 11.5187 13.9313 11.25 13.6 11.25Z" fill="white"/>
                              <path d="M14.8 7.5H9.2C7.8745 7.5 6.8 8.5745 6.8 9.9V14.1C6.8 15.4255 7.8745 16.5 9.2 16.5H14.8C16.1255 16.5 17.2 15.4255 17.2 14.1V9.9C17.2 8.5745 16.1255 7.5 14.8 7.5ZM15.8 14.1C15.8 14.6864 15.3864 15.1 14.8 15.1H9.2C8.6136 15.1 8.2 14.6864 8.2 14.1V9.9C8.2 9.3136 8.6136 8.9 9.2 8.9H14.8C15.3864 8.9 15.8 9.3136 15.8 9.9V14.1Z" fill="white"/>
                            </svg>
                            Online Payment (Stripe)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                          <RadioGroupItem value="cod" id="payment-cod" />
                          <Label htmlFor="payment-cod" className="cursor-pointer flex items-center">
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="24" height="24" rx="4" fill="#22C55E"/>
                              <path d="M15.5 9.5H8.5C7.67157 9.5 7 10.1716 7 11V15C7 15.8284 7.67157 16.5 8.5 16.5H15.5C16.3284 16.5 17 15.8284 17 15V11C17 10.1716 16.3284 9.5 15.5 9.5Z" stroke="white" strokeWidth="1.5"/>
                              <path d="M14.5 12C14.5 11.4477 14.0523 11 13.5 11C12.9477 11 12.5 11.4477 12.5 12C12.5 12.5523 12.9477 13 13.5 13C14.0523 13 14.5 12.5523 14.5 12Z" fill="white"/>
                              <path d="M9 7.5L7 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                              <path d="M15 7.5L17 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            Cash on Delivery
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button 
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-lg py-6" 
                      disabled={!selectedProvider || !date || !address || isBooking}
                      onClick={handleBookService}
                    >
                      {isBooking ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Book Now'
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-500">
                      <p>Starting from ₹{service.price.replace('₹', '').replace('$', '')}</p>
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

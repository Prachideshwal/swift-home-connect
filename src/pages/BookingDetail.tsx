
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import LiveTracking from '@/components/LiveTracking';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Clock, Phone, MessageCircle, Star } from 'lucide-react';

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we'd fetch the booking details from an API
  const booking = {
    id: id || '123',
    service: 'Cleaning',
    status: 'confirmed',
    date: new Date(),
    time: '10:00 AM - 12:00 PM',
    address: 'F-123, Sector 22, Noida, Uttar Pradesh, 201301, India',
    price: '₹1,200.00',
    provider: {
      name: 'Rajesh Kumar',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      phone: '+91 9876543210',
      rating: 4.9
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Booking #{booking.id}</h1>
            <div className="flex items-center mt-2">
              <Badge 
                variant={booking.status === 'confirmed' ? 'outline' : 'destructive'}
                className={
                  booking.status === 'confirmed' 
                    ? 'bg-green-50 text-green-700 hover:bg-green-50 border-green-200' 
                    : ''
                }
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
              <span className="text-gray-500 text-sm ml-2">
                Booked on {formatDate(new Date())}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            {booking.status === 'confirmed' && (
              <Button variant="destructive">
                Cancel Booking
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Live tracking */}
            <LiveTracking 
              bookingId={booking.id} 
              providerName={booking.provider.name} 
              estimatedArrival={booking.time.split('-')[0].trim()}
            />
            
            {/* Booking details */}
            <Card className="border-t-4 border-t-brand-blue">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <Calendar className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">
                        {formatDate(booking.date)}, {booking.time}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <MapPin className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium">Service Location</p>
                      <p className="text-gray-600">{booking.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-2 rounded-full mr-3">
                      <Clock className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.service} Service</p>
                      <p className="text-gray-600">
                        Standard {booking.service.toLowerCase()} service, 2 hours
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>{booking.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹216.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹1,416.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Provider info */}
          <div>
            <Card className="border-t-4 border-t-brand-blue">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Service Provider</h2>
                
                <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={booking.provider.image} />
                    <AvatarFallback>{booking.provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{booking.provider.name}</p>
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{booking.provider.rating}</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Professional {booking.service.toLowerCase()} expert
                    </p>
                  </div>
                </div>
                
                <Button className="w-full mb-2 bg-brand-blue hover:bg-brand-blue/90">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Provider
                </Button>
                
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>

                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600 mb-1">Service Provider Rating</p>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= Math.floor(booking.provider.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{booking.provider.rating}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}


import { useEffect, useState } from 'react';
import { getServices } from '@/lib/api';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FeaturedCarousel() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        // Get featured/popular services or just use all for now
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load services:", error);
        setLoading(false);
      }
    };
    
    loadServices();
  }, []);
  
  if (loading) {
    return (
      <div className="w-full">
        <Carousel>
          <CarouselContent>
            {[...Array(4)].map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="space-y-4 w-full">
                        <Skeleton className="h-40 w-full rounded-md" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }
  
  // Image placeholders based on service type
  const getServiceImage = (service) => {
    const images = {
      "Cleaning": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3",
      "Cooking": "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3",
      "Driver": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3",
      "Plumbing": "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?ixlib=rb-4.0.3",
      "Electrical": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3",
      "Helper": "https://images.unsplash.com/photo-1590649632971-184a95e955c9?ixlib=rb-4.0.3",
      "Dusting": "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3",
      "Laundry": "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3"
    };
    
    return images[service.name] || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3";
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {services.map((service) => (
          <CarouselItem key={service._id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
              <Link to={`/services/${service._id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={getServiceImage(service)} 
                      alt={service.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-brand-blue">Popular</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 truncate">{service.name}</h3>
                    <div className="flex items-center text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                      ))}
                      <span className="text-gray-600 text-sm ml-1">({Math.floor(Math.random() * 100) + 50} reviews)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-brand-blue">₹{service.price}/hr</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 lg:-left-6" />
      <CarouselNext className="-right-4 lg:-right-6" />
    </Carousel>
  );
}

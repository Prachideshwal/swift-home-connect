
import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { Service, getServices } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServiceGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}

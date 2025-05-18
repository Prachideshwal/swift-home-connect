
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getProviderLocation } from '@/lib/api';

interface LiveTrackingProps {
  bookingId: string;
  providerName: string;
  estimatedArrival: string;
}

export default function LiveTracking({ bookingId, providerName, estimatedArrival }: LiveTrackingProps) {
  const [coordinates, setCoordinates] = useState<{ lat: number, lng: number } | null>(null);
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getProviderLocation(bookingId);
        setCoordinates(location);
      } catch (error) {
        console.error("Failed to get provider location:", error);
      }
    };
    
    // Initial fetch
    fetchLocation();
    
    // Update every 10 seconds
    const interval = setInterval(fetchLocation, 10000);
    
    return () => {
      clearInterval(interval);
    };
  }, [bookingId]);
  
  // Note: In a real implementation, we'd integrate with a maps API like Google Maps or Mapbox
  // This is a simplified placeholder that would be replaced with an actual map
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 bg-brand-blue/10">
          <h3 className="font-medium text-lg">Live Location</h3>
          <p className="text-sm text-gray-600">Tracking service provider: {providerName}</p>
          <p className="text-sm font-medium">Estimated arrival: {estimatedArrival}</p>
        </div>
        
        <div className="bg-gray-200 h-64 w-full relative">
          {/* Placeholder for map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-600">
              Map loading... {coordinates && `(${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)})`}
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 text-center animate-pulse-slow">
          <p className="text-sm">
            Your service provider is on the way. 
            <br />
            <span className="font-medium">Currently {Math.floor(Math.random() * 10) + 1} minutes away</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

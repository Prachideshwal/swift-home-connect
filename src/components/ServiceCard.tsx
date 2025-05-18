
import { Link } from 'react-router-dom';
import { 
  Broom, 
  Car, 
  ShowerHead, 
  LampDesk, 
  WashingMachine, 
  Trash, 
  User,
  CookingPot
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/lib/api';

// Map service names to icons
const iconMap: Record<string, React.ReactNode> = {
  'broom': <Broom className="h-6 w-6" />,
  'car': <Car className="h-6 w-6" />,
  'shower-head': <ShowerHead className="h-6 w-6" />,
  'lamp-desk': <LampDesk className="h-6 w-6" />,
  'washing-machine': <WashingMachine className="h-6 w-6" />,
  'trash': <Trash className="h-6 w-6" />,
  'hand-helping': <User className="h-6 w-6" />,
  'cooking-pot': <CookingPot className="h-6 w-6" />,
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { id, name, description, icon, price, rating } = service;
  
  return (
    <Link to={`/services/${id}`}>
      <Card className="service-card h-full">
        <CardContent className="p-6">
          <div className="mb-4 bg-blue-50 rounded-full h-12 w-12 flex items-center justify-center text-brand-blue">
            {iconMap[icon]}
          </div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </CardContent>
        <CardFooter className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">
          <p className="text-sm font-semibold">{price}</p>
          <Badge variant="outline" className="bg-white">
            ★ {rating}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}

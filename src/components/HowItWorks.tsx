
import { CheckCircle, Calendar, MapPin, CreditCard } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-6 w-6 text-white" />,
      title: "Search Service",
      description: "Browse through our wide range of professional home services."
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      title: "Book Appointment",
      description: "Choose a convenient time slot that works for you."
    },
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Track Provider",
      description: "Track your service provider in real-time as they arrive."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Service Delivered",
      description: "Relax as our experts efficiently complete your service."
    }
  ];
  
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Swift Home Connect makes booking home services simple and convenient
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-brand-blue flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10">
                  <div className="absolute right-0 -top-1 h-2.5 w-2.5 rounded-full bg-brand-blue"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Import Search icon
import { Search } from 'lucide-react';

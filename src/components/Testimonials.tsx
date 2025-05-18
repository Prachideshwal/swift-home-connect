
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homeowner, Delhi",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      content: "The cleaning service was excellent! The professionals arrived on time and did a thorough job. My home has never looked better. I'll definitely be using Swift Home Connect again."
    },
    {
      name: "Rahul Patel",
      role: "Apartment Owner, Mumbai",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      content: "The plumber fixed my leaking sink in no time. Very professional and knowledgeable. The live tracking feature was particularly helpful as I knew exactly when they would arrive."
    },
    {
      name: "Ananya Singh",
      role: "Business Owner, Bangalore",
      image: "https://randomuser.me/api/portraits/women/54.jpg",
      content: "We use Swift Home Connect for all our office maintenance needs. The electrician they sent was skilled and efficient. Their booking system is so convenient!"
    },
    {
      name: "Vikram Mehta",
      role: "Property Manager, Chennai",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Managing maintenance for multiple properties was a nightmare until I found Swift Home Connect. Now everything is streamlined, from booking to payment. Highly recommended!"
    },
    {
      name: "Divya Kapoor",
      role: "Homeowner, Pune",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      content: "The AC repair service was prompt and professional. The technician explained everything clearly and fixed the issue quickly. The transparent pricing is what I appreciate the most."
    }
  ];
  
  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="bg-white hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 border-2 border-brand-blue">
                        <AvatarImage src={testimonial.image} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mt-4">{testimonial.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="mx-2" />
            <CarouselNext className="mx-2" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

// Star icon component
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}

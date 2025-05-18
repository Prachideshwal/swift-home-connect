
import Layout from '@/components/Layout';
import Banner from '@/components/Banner';
import ServiceGrid from '@/components/ServiceGrid';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FeaturedCarousel from '@/components/FeaturedCarousel';

export default function Index() {
  return (
    <Layout>
      {/* Hero Banner */}
      <Banner />
      
      {/* Featured Services Carousel */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Services</h2>
            <Link to="/services">
              <Button variant="link" className="text-brand-blue">
                View All
              </Button>
            </Link>
          </div>
          <FeaturedCarousel />
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              From cleaning to repairs, find the perfect service for your home needs
            </p>
          </div>
          <ServiceGrid />
          <div className="mt-10 text-center">
            <Link to="/services">
              <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Provider CTA */}
      <section className="py-12 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Become a Service Provider</h2>
                <p className="text-gray-600 mb-6">
                  Join our network of trusted professionals. Set your own rates, choose your schedule, and grow your business.
                </p>
                <Link to="/become-provider">
                  <Button className="bg-brand-blue hover:bg-brand-blue/90">
                    Register Now
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                  alt="Service provider" 
                  className="rounded-lg object-cover h-64 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* App Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Why Choose Swift Home Connect</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best home service experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 12 2 2 4-4"></path>
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                All service providers undergo thorough background checks and verification.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v14"></path>
                  <path d="m10 8 4 4"></path>
                  <path d="m10 12 4-4"></path>
                  <path d="M22 11.32a10 10 0 0 0-20.003 0"></path>
                  <path d="M22 19.32a10 10 0 0 1-8.48 0"></path>
                  <path d="M2 19.32a10 10 0 0 0 8.48 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
              <p className="text-gray-600">
                Track your service provider in real-time as they arrive at your doorstep.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                If you're not satisfied with the service, we'll make it right.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

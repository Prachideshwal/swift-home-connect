
import Layout from '@/components/Layout';
import ProviderRegistrationForm from '@/components/ProviderRegistrationForm';

export default function BecomeProvider() {
  return (
    <Layout>
      <div className="bg-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Become a Service Provider</h1>
          <p className="mt-2 text-gray-600">
            Join our network of professionals and grow your business
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Earn More</h3>
            <p className="text-gray-600">
              Set your own rates and work as much as you want. You keep the majority of what you earn.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Flexible Schedule</h3>
            <p className="text-gray-600">
              Choose when you work. Accept jobs that fit your schedule and preferences.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Safety & Support</h3>
            <p className="text-gray-600">
              Our platform includes insurance coverage and 24/7 support for all providers.
            </p>
          </div>
        </div>
        
        <ProviderRegistrationForm />
      </div>
    </Layout>
  );
}

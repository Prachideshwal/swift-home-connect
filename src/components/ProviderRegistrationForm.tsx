
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { registerAsProvider } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';

export default function ProviderRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    serviceCategory: '',
    experience: '',
    description: '',
    hourlyRate: '',
    acceptTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, we'd handle file uploads to a server
    // For this demo, just mark as uploaded if files are selected
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(true);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await registerAsProvider(formData);
      if (result) {
        setIsSuccess(true);
        // In a real app, we'd redirect or show a confirmation screen
      }
    } catch (error) {
      console.error("Provider registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSuccess) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering as a service provider. Our team will review your application
              and contact you shortly.
            </p>
            <Button className="bg-brand-blue hover:bg-brand-blue/90" onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Register as a Service Provider</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name*</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name*</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address*</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City*</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="serviceCategory">Service Category*</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('serviceCategory', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="cooking">Cooking</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="helper">Helper/Assistance</SelectItem>
                <SelectItem value="dusting">Dusting</SelectItem>
                <SelectItem value="laundry">Laundry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience*</Label>
            <Select
              onValueChange={(value) => handleSelectChange('experience', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">Less than 1 year</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">More than 10 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Service Description*</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your services, skills, and expertise"
              className="min-h-[120px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)*</Label>
              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                placeholder="e.g. 25"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Upload Documents*</Label>
              <div className="border-2 border-dashed rounded-md p-4 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                <label htmlFor="fileUpload" className="flex flex-col items-center cursor-pointer w-full">
                  <Upload className={`h-6 w-6 ${fileUploaded ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className="mt-2 text-sm text-gray-500">
                    {fileUploaded ? 'File uploaded' : 'Upload ID & certifications'}
                  </span>
                  <input 
                    id="fileUpload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    multiple
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="acceptTerms" 
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => 
                setFormData((prev) => ({ ...prev, acceptTerms: checked === true }))
              }
            />
            <Label htmlFor="acceptTerms" className="text-sm font-normal">
              I agree to the <a href="#" className="text-brand-blue hover:underline">Terms of Service</a> and <a href="#" className="text-brand-blue hover:underline">Privacy Policy</a>
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-brand-blue/90" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Register as Provider'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

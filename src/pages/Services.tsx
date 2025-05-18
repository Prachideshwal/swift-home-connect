
import { useState } from 'react';
import Layout from '@/components/Layout';
import ServiceGrid from '@/components/ServiceGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { CheckIcon, FilterIcon, Search, ArrowUpDown } from 'lucide-react';

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([10, 50]);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  
  return (
    <Layout>
      <div className="bg-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Home Services</h1>
          <p className="mt-2 text-gray-600">
            Browse and book from our wide range of professional home services
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search for services..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="hidden md:block w-48">
              <Select onValueChange={setSortBy} defaultValue={sortBy}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <span>Sort By</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="md:hidden"
              onClick={toggleFilter}
            >
              <FilterIcon className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          
          {/* Mobile Filters */}
          {filterOpen && (
            <div className="mt-4 p-4 border rounded-md md:hidden">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mobile-sort">Sort By</Label>
                  <Select onValueChange={setSortBy} defaultValue={sortBy}>
                    <SelectTrigger id="mobile-sort">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}/hr</Label>
                  <Slider
                    defaultValue={priceRange}
                    min={10}
                    max={100}
                    step={5}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>
                
                <Button onClick={toggleFilter} className="w-full bg-brand-blue hover:bg-brand-blue/90">
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
          
          {/* Desktop Filters */}
          <div className="hidden md:flex mt-4 space-x-8 border-b pb-4">
            <div className="w-1/3">
              <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}/hr</Label>
              <Slider
                defaultValue={priceRange}
                min={10}
                max={100}
                step={5}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label>Rating</Label>
              <div className="flex mt-2 space-x-2">
                {[4, 3, 2].map((rating) => (
                  <Button key={rating} variant="outline" size="sm" className="h-8">
                    {rating}+ ★
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <ServiceGrid />
      </div>
    </Layout>
  );
}

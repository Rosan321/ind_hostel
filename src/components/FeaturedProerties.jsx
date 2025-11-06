'use client';

import SwiperButton from '@/lib/utils/swiperButton';
import Image from 'next/image';
import { useState } from 'react';

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const properties = [
    {
      id: 1,
      name: "Coxy Stay Hostel",
      location: "Mumbai, India",
      price: "₹8,000/month",
      description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "budget",
      amenities: ["WiFi", "AC", "Laundry"],
      images: "/images/coxy.png"
    },
    {
      id: 2,
      name: "Green Leaf Hostel",
      location: "Pune, India",
      price: "₹7,500/month",
      description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "budget",
      amenities: ["WiFi", "Parking", "Security"],
      images: "/images/g-leaf.png"
    },
    {
      id: 3,
      name: "Green Leaf Hostel",
      location: "Goa, India",
      price: "₹9,000/month",
      description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "premium",
      amenities: ["WiFi", "Pool", "Gym"],
      images: "/images/g_leaf.png"
    },
    {
      id: 4,
      name: "Ocean View Hostel",
      location: "Hyderabad, India",
      price: "₹8,500/month",
      description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "premium",
      amenities: ["WiFi", "AC", "TV"],
      images: "/images/ocean.png"
    }
  ];

  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(property => property.category === activeFilter);

  return (
    <section className="bg-gray-100 lg:pb-12 lg:pb-0 px-4 sm:px-8 lg:px-20">
      {/* Header Section */}
      <div className="mb-8 lg:mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Featured Properties</h2>
        <p className="text-base sm:text-lg text-gray-600">
          Hand-picked Hostels, PGs, and Hotels verified for comfort and safety
        </p>
      </div>

      {/* Filter Buttons (Scrollable) */}
      <div className="overflow-x-auto no-scrollbar mb-8">
        <div className="flex gap-4 min-w-max md:justify-center px-2">
          {['all', 'budget', 'premium', 'luxury'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-shrink-0 px-4 lg:px-6 py-2 lg:py-3 text-[#1A1A1A] rounded-full text-base font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-[#C7D800]'
                  : 'border border-gray-300 text-[#1A1A1A] hover:bg-[#C7D800]'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Property Image */}
            <div className="h-48 sm:h-56 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
              <Image
                src={property.images}
                alt={property.name}
                width={500}
                height={500}
                className='w-full h-full object-cover'
              />
            </div>
            
            {/* Property Details */}
            <div className="p-4">
              <h3 className="text-lg lg:text-xl font-bold text-[#1A1A1A] mb-2">{property.name}</h3>
              <p className="text-sm lg:text-base text-[#00BFA6] mb-2 flex items-center">
                {property.location}
              </p>
              <p className="text-[#666666] mb-3 text-xs lg:text-sm">{property.description}</p>
              
              {/* Amenities */}
              {/* <div className="flex flex-wrap gap-2 mb-3">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {amenity}
                  </span>
                ))}
              </div> */}
              <h4 className="text-base lg:text-lg font-semibold text-[#1A1A1A]">{property.price}</h4>
              
              {/* Price and Button */}
              {/* <div className="mt-8 flex justify-center items-center btn-wiper-bg">
                <Link href={`/stay/${property.id}`} className="btn-wiper-bg-content flex gap-2 px-6 py-2">
                  View Details
                  <ArrowRight />
                </Link>
              </div> */}
              <SwiperButton 
                id={property.id}
                title="View Details"
                className="xl:w-60 h-10 xl:h-14 text-sm sm:text-base mt-4 xl:mt-8 mx-auto mb-4 flex items-center justify-center"
                showIcon
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;

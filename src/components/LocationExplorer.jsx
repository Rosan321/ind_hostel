'use client';

import { cityHostels } from '@/lib/utils/cityHostels';
import Image from 'next/image';
import { useState } from 'react';

const LocationExplorer = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const cities = [
    { name: "Mumbai" },
    { name: "Hyderabad", image: "/images/hyderabad.jpg" },
    { name: "Pune", image: "/images/pune.jpg" },
    { name: "Goa", image: "/images/goa.jpg" },
    { name: "Jaipur", image: "/images/jaipur.jpg" },
    { name: "Delhi", image: "/images/delhi.jpg" }
  ];

  const currentHostels = cityHostels[selectedCity] || [];

  return (
    <section className="py-12 px-4 lg:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Our Locations</h2>
        <p className="text-lg text-gray-600 mb-8">Choose your city to find hostels near you</p>
        
        {/* City Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city.name)}
              className={`w-40 px-6 py-3 text-[#1A1A1A] rounded-full text-base font-semibold transition-all duration-300 cursor-pointer ${
                selectedCity === city.name
                  ? 'bg-[#C7D800] shadow-lg'
                  : 'border border-gray-300 hover:bg-[#cedf08]'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Image Left, Hotels Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto">
        {/* Left Side - City Image */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <Image
            src="/images/mum.png"
            alt='new'
            width={500}
            height={500}
            className='w-full h-full'
          />
        </div>

        {/* Right Side - Top Hostels */}
        <div className="bg-white rounded-2xl">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">Top Hostels in {selectedCity}</h3>

          {/* Hostels List */}
          <div className="space-y-6">
            {currentHostels.map((hostel) => (
              <div key={hostel.id}>
                <div className="flex gap-6 items-start mb-3">
                  <Image
                    src={hostel.image}
                    alt={hostel.name}
                    width={500}
                    height={500}
                    className='w-20 h-20'
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{hostel.name}</h4>
                    <p className="text-xl font-bold text-[#C7D800]">{hostel.price}</p>
                
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hostel.amenities.map((amenity, index) => (
                        <span 
                          key={index}
                          className="bg-gray-200 text-[#00BFA6] px-5 py-2 rounded-full text-sm font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          {currentHostels.length > 0 && (
            <button className="bg-[#00BFA6] hover:bg-[#11a793] text-white px-5 py-3 rounded-full font-semibold transition-colors duration-300 cursor-pointer">
              View All
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationExplorer;
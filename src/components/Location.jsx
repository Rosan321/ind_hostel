"use client";

import { ArrowRight, Link2 } from "lucide-react";

export default function LocationSection() {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow mt-6">
      <h3 className="text-2xl text-[#1A1A1A] font-bold mb-4">Find Us Easily</h3>

      <p className="text-[#666666] text-base mb-6">
        We're located in the heart of the city — close to public transport,
        eateries, and shopping streets
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Map Area */}
        <div className="space-y-6">
          <div className="aspect-video w-full h-full overflow-hidden rounded-lg">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30456.667134248048!2d78.463169!3d17.4077852!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1761975563874!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* Right Side - Location Details */}
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-xl text-[#1A1A1A] mb-4">
              Our Location
            </h4>
            <p className="text-[#666666] text-base">
              UrbanNest PG, Linking Road, Bandra West, Mumbai - 400050
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xl text-[#1A1A1A] mb-3">
              Nearby Essentials
            </h4>
            <div className="space-y-3 text-sm">
              {[
                { name: "Hill Road Market", distance: "500 m" },
                { name: "Starbucks", distance: "300 m" },
                { name: "Lilavati Hospital", distance: "2.1 km" },
                { name: "NM College", distance: "3.0 km" },
                { name: "Bandra Station", distance: "1.2 km" },
              ].map((place, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-gray-600 mr-4">{place.name}</span>-
                  <span className="text-gray-500 px-2 py-1 rounded text-xs ml-4">
                    {place.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="
    bg-[#F1FF51] 
    py-3 
    px-5 
    rounded-full 
    font-medium 
    transition-colors 
    flex 
    items-center 
    justify-center 
    gap-2 
    cursor-pointer
    mx-auto
    lg:mx-0
  "
          >
            <Link2 size={20} style={{ transform: "rotate(-45deg)" }} />
            <span>View on Google Maps</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

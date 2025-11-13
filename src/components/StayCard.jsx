import SwiperButton from "@/lib/utils/swiperButton";
import { Star } from "lucide-react";
import Image from "next/image";

export default function StayCard({ id, title, location, rating, price, imgs }) {
  return (
    <div className="relative bg-white shadow rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition w-full sm:max-w-md lg:max-w-lg">
      {/* Badge and Price Container */}
      <div className="absolute top-3 left-0 right-0 flex justify-between items-center z-10">
        {/* New Badge - Same size as price button */}
        <div className="relative">
          <svg 
            width="190" 
            height="60" 
            viewBox="0 0 320 100" 
            className="drop-shadow-lg h-7 w-auto sm:h-8"
          >
            {/* Badge path with curved indent on right side */}
            <path
              d="M 10 0 L 280 0 Q 250 25 250 50 Q 250 75 280 100 L 10 100 Q 0 100 0 90 L 0 10 Q 0 0 10 0 Z"
              fill="#00BFA6"
            />
          </svg>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center gap-1 pl-2 sm:pl-3">
            {/* Tag icon - Compact sizing */}
            <div className="relative">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-white transform -rotate-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                />
              </svg>
              {/* Small dot on tag */}
              <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-1 h-1 bg-white rounded-full"></div>
            </div>
            
            {/* Text - Compact sizing */}
            <span className="text-sm sm:text-base font-bold text-white tracking-wide">
              New
            </span>
          </div>
        </div>

        {/* Price Button - Responsive sizing */}
        <button className="bg-yellow-400 text-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-l-lg font-semibold text-xs sm:text-sm hover:bg-yellow-500 transition shadow">
          ₹{price}/mo
        </button>
      </div>

      {/* Image - Responsive height */}
      <Image
        src={imgs}
        alt={title}
        width={400}
        height={250}
        className="object-cover w-full h-40 sm:h-48 md:h-56"
      />

      {/* Content - Responsive padding and text */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{title}</h3>
          <p className="text-xs sm:text-sm text-[#00BFA6] py-2">{location}</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Free Wi-Fi • Meals • 24/7 Security
          </p>
        </div>

        <div className="mt-2 sm:mt-3 flex justify-between items-center">
          <span className="text-[#1A1A1A]font-medium text-xs sm:text-sm flex items-center gap-2">
            <Star size={15} className="fill-[#F1FF51] stroke-[#F1FF51]" /> {rating} (128 reviews)
          </span>
        </div>
      </div>
      <SwiperButton 
        id={id}
        title="Book Now"
        className="w-44 h-11 text-sm sm:text-base mx-auto mb-4"
        showIcon
      />

      {/* <Link href={`/stay/${id}`} className="bg-[#F1FF51] text-[#1A1A1A] text-base font-semibold rounded-full px-6 py-3 mx-auto flex items-center gap-2 mb-6 cursor-pointer">
        Book Now
        <ArrowRight size={18} />
      </Link> */}
    </div>
  );
}
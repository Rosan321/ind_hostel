"use client";

import { Heart, Star } from "lucide-react";
import Image from "next/image";
import SlideUp from "./animations/SlideUp";
import AnimatedCard from "./animations/AnimatedCard";
import SwiperButton from "@/lib/utils/swiperButton";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, deleteWishlist } from "@/lib/store/actions/wishlistActions";
import { toast } from "react-toastify";

export default function StayCard({ stay, rawData, similar }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  // Get wishlist state from Redux
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuth } = useSelector((state) => state.auth);
  
  // Use either stay or rawData
  const data = stay || rawData || similar;
  const accommodationId = data?._id;
  
  // Track local wishlist state
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check local storage first, then sync with Redux
  useEffect(() => {
    // Check localStorage for cached wishlist status
    const cachedWishlist = localStorage.getItem(`wishlist_${accommodationId}`);
    if (cachedWishlist !== null) {
      setIsInWishlist(cachedWishlist === 'true');
    } else if (wishlistItems?.some(item => 
      item.accommodationid?._id === accommodationId || 
      item.accommodationid === accommodationId
    )) {
      setIsInWishlist(true);
    }
  }, [accommodationId, wishlistItems]);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!isAuth) {
      toast.error("Please login to add to wishlist");
      return;
    }

    setIsLoading(true);
    
    try {
      if (isInWishlist) {
        // Find the wishlist item to get its ID (if available)
        const wishlistItem = wishlistItems?.find(item => 
          item.accommodationid?._id === accommodationId || 
          item.accommodationid === accommodationId
        );
        
        // Optimistic update - remove immediately
        setIsInWishlist(false);
        localStorage.setItem(`wishlist_${accommodationId}`, 'false');
        
        if (wishlistItem?._id) {
          await dispatch(deleteWishlist(wishlistItem._id)).unwrap();
        }
        toast.success("Removed from wishlist");
      } else {
        // Optimistic update - add immediately
        setIsInWishlist(true);
        localStorage.setItem(`wishlist_${accommodationId}`, 'true');
        
        const result = await dispatch(addToWishlist(accommodationId)).unwrap();
        
        // Update with actual wishlist ID from response if needed
        if (result?.data?._id) {
          // Store wishlist ID for future deletion
          localStorage.setItem(`wishlist_id_${accommodationId}`, result.data._id);
        }
        toast.success("Added to wishlist");
      }
    } catch (error) {
      // Revert on error
      setIsInWishlist(!isInWishlist);
      localStorage.setItem(`wishlist_${accommodationId}`, (!isInWishlist).toString());
      toast.error(error.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Format location
  const formatLocation = () => {
    if (data?.location?.address || data?.location?.city) {
      const address = data.location.address || "";
      const city = data.location.city || "";
      return `${address.charAt(0).toUpperCase() + address.slice(1)}, ${
        city.charAt(0).toUpperCase() + city.slice(1)
      }`;
    }
    return data?.location || "Location not specified";
  };

  // Format amenities
  const formatAmenities = () => {
    if (data?.amenities?.length > 0) {
      return data.amenities.slice(0, 3).map((item, index, arr) => (
        <span key={index}>
          {item?.charAt(0).toUpperCase() + item?.slice(1)}
          {index < arr.length - 1 && " • "}
        </span>
      ));
    }
    return "No amenities listed";
  };

  // Get price information
  const getPriceInfo = () => {
    const pricing = data?.pricing_ids?.[0]?.pricing?.[0] || 
                   data?.pricingData?.[0]?.pricing?.[0] || 
                   data?.pricing?.[0] || 
                   { price: "999", price_type: "night" };
    
    return {
      price: pricing.price,
      type: pricing.price_type
    };
  };

  const priceInfo = getPriceInfo();

  return (
    <div className="relative bg-white shadow rounded-2xl overflow-hidden flex flex-col w-full sm:max-w-md lg:max-w-lg hover:shadow-xl transition-shadow duration-300 group">
      {/* Badge and Price Container */}
      <div className="absolute top-3 left-0 right-0 flex justify-between items-center z-10">
        {/* Price on LEFT */}
        <button className="bg-[#0D0BA8] text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-r-lg font-bold text-sm sm:text-base shadow-lg">
          ₹{data?.maxPrice || priceInfo.price} /{" "}
          <span className="text-sm font-semibold">{priceInfo.type}</span>
        </button>

        {/* Wishlist (Heart) on RIGHT */}
        <button
          onClick={handleWishlistToggle}
          disabled={isLoading}
          className={`absolute top-2 right-0 flex items-center justify-center group mr-2 sm:mr-3 p-2 rounded-full cursor-pointer transition-all duration-300 ${
            isInWishlist 
              ? 'bg-rose-50 shadow-lg' 
              : 'bg-white shadow-xl'
          } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-110'}`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          ) : (
            <Heart
              size={28}
              strokeWidth={2}
              className={`transition-all duration-300 ${
                isInWishlist
                  ? "fill-rose-500 text-rose-500 stroke-rose-500"
                  : "text-gray-400 stroke-gray-400 group-hover:text-rose-400 group-hover:stroke-rose-400"
              } w-5 h-5 sm:w-5 sm:h-5`}
            />
          )}
        </button>
      </div>

      {/* Image Section */}
      <AnimatedCard delay={0.2} className="hover:shadow-lg">
        <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden">
          <Image
            src={data?.images_url?.[0] || data?.image || "/images/default-stay.jpg"}
            alt={data?.property_name || "Stay"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />
          {/* Featured Badge */}
          {data?.isFeatured && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded shadow">
              Featured
            </div>
          )}
        </div>
      </AnimatedCard>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
        <SlideUp delay={0.4}>
          <div>
            {/* Title */}
            <h3 className="font-bold text-[#1A1A1A] text-base sm:text-lg line-clamp-1">
              {data?.property_name || "Stay Name"}
            </h3>
            
            {/* Location */}
            <p className="text-xs sm:text-sm text-[#44475A] py-2 pb-6 line-clamp-1">
              {formatLocation()}
            </p>
            
            {/* Amenities */}
            <p className="text-xs sm:text-sm text-[#666666] mt-1 flex flex-wrap items-center gap-1 line-clamp-1">
              {formatAmenities()}
            </p>
          </div>
        </SlideUp>
        
        <SlideUp delay={0.4}>
          <div className="mt-2 sm:mt-3 flex justify-between items-center">
            {/* Rating */}
            <span className="text-[#1A1A1A] font-medium text-xs sm:text-sm flex items-center gap-2">
              <Star size={15} className="fill-[#0D0BA8] stroke-[#0D0BA8]" />{" "}
              {data?.averageRating?.toFixed(1) || "4.5"} 
              <span className="text-gray-500">
                ({data?.totalRatings || "0"} reviews)
              </span>
            </span>
            
            {/* Additional Info */}
            {data?.availableRooms && (
              <span className="text-xs text-green-600 font-medium">
                {data.availableRooms} rooms left
              </span>
            )}
          </div>
        </SlideUp>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <SwiperButton
          id={accommodationId}
          title="Book Now"
          className="w-1/2 sm:h-11 text-sm sm:text-base mx-auto"
          showIcon
        />
      </div>
    </div>
  );
}
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import SwiperButton from "@/lib/utils/swiperButton";
import { useEffect, useState } from "react";
import HoverLift from "./animations/HoverLift";
import ShuffleInOnScroll from "./animations/SuffleInOnScroll";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccomodation } from "@/lib/store/actions/accomodationActions";
import { Heart } from "lucide-react";
import { SpinnerLoader } from "./loader/SpinnerLoader";

// NEW: Import wishlist action
import { addToWishlist } from "@/lib/store/actions/wishlistActions";
import { toast } from "react-toastify";

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const dispatch = useDispatch();

  // EXISTING: Accommodation data (unchanged)
  const { accomodationData, loading } = useSelector(
    (state) => state.accomodation
  );

  // console.log(accomodationData)

  // NEW: Local state for instant UI updates
  const [localWishlist, setLocalWishlist] = useState(new Set());

  // EXISTING: Accommodation fetch (unchanged)
  useEffect(() => {
    dispatch(getAllAccomodation({ type: activeFilter.toLowerCase() }));
  }, [activeFilter]);

  // NEW: Handle wishlist toggle with instant UI update
  const handleWishlistToggle = async (propertyId) => {
    // INSTANT UI UPDATE: Toggle local state immediately
    const newWishlist = new Set(localWishlist);

    if (newWishlist.has(propertyId)) {
      newWishlist.delete(propertyId);
      setLocalWishlist(newWishlist);
      // If you have remove functionality, add it here later
    } else {
      newWishlist.add(propertyId);
      setLocalWishlist(newWishlist);

      // Call API in background
      try {
        const res = await dispatch(addToWishlist(propertyId)).unwrap();
        console.log(res);
        toast.success(res.message || "Added to wishlist");
      } catch (err) {
        // Revert on error
        newWishlist.delete(propertyId);
        setLocalWishlist(newWishlist);
        toast.error(err?.message || "Something went wrong");
      }
    }
  };

  // NEW: Check if property is in local wishlist
  const isPropertyInWishlist = (propertyId) => {
    return localWishlist.has(propertyId);
  };

  return (
    <section className="bg-gray-100 pb-12 px-4 sm:px-8 lg:px-20">
      {/* Header */}
      <ShuffleInOnScroll delay={0}>
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Trending hostels in your location
          </p>
        </div>
      </ShuffleInOnScroll>

      {/* Filters */}
      <ShuffleInOnScroll delay={0.1}>
        <div className="overflow-x-auto mb-8 no-scrollbar">
          <div className="flex gap-4 min-w-max md:justify-center">
            {["all", "budget", "premium", "luxury"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  activeFilter === filter
                    ? "bg-[#2A32FF] text-[#ffffff]"
                    : "border border-gray-300 text-gray-800 hover:bg-[#2A32FF] hover:border-[#2A32FF] hover:text-[#ffffff]"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </ShuffleInOnScroll>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        spaceBetween={25}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          480: { slidesPerView: 1.4 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-6 relative"
      >
        {loading ? (
          <>
            <SpinnerLoader />
          </>
        ) : accomodationData && accomodationData.length > 0 ? (
          accomodationData.map((property, index) => (
            <SwiperSlide key={property?._id || index}>
              <ShuffleInOnScroll delay={index * 0.1}>
                <HoverLift scale={1.03}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-md flex flex-col h-96 sm:h-[420px]">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={property?.images_url?.[0]}
                        alt={property?.property_name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out"
                      />
                      {/* MODIFIED: Heart button with instant wishlist update */}
                      <button
                        onClick={() => handleWishlistToggle(property?._id)}
                        className="absolute top-2 right-0 flex items-center justify-center group mr-2 sm:mr-3 bg-white shadow-2xl p-2 rounded-full cursor-pointer hover:bg-gray-50 transition-all duration-200"
                      >
                        <Heart
                          size={28}
                          strokeWidth={2}
                          className={`transition-all duration-300 group-hover:scale-110 
                            ${
                              isPropertyInWishlist(property?._id)
                                ? "fill-rose-500 text-rose-500 animate-pulse-once"
                                : "text-white stroke-[#666666]"
                            }
                            w-5 h-5 sm:w-5 sm:h-5
                          `}
                        />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <section className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {property?.property_name}
                        </h3>
                        <p className="text-sm text-[#2A32FF] mt-1">
                          (
                          {property?.property_type
                            ? property.property_type.charAt(0).toUpperCase() +
                              property.property_type.slice(1)
                            : ""}
                          )
                        </p>
                      </section>
                      <p className="text-sm text-[#44475A] mt-1">
                        {property?.location?.city
                          ? property.location.city.charAt(0).toUpperCase() +
                            property.location.city.slice(1)
                          : ""}
                      </p>
                      <p className="text-sm text-gray-600 mt-2 flex-grow line-clamp-3">
                        {property?.property_description}
                      </p>
                      <h4 className="font-semibold text-lg mt-3 text-gray-900">
                        {(property?.pricingData || property?.pricing_ids)?.[0]
                          ?.pricing?.[0] ? (
                          <>
                            ₹
                            {property.pricing_ids?.[0]?.pricing?.[0]?.price ||
                              property.pricingData?.[0]?.pricing?.[0]
                                ?.price}{" "}
                            /{" "}
                            <span className="text-sm">
                              {property.pricing_ids?.[0]?.pricing?.[0]
                                ?.price_type ||
                                property.pricingData?.[0]?.pricing?.[0]
                                  ?.price_type}
                            </span>
                          </>
                        ) : (
                          <p>No price</p>
                        )}
                      </h4>
                      <div className="mt-4">
                        <SwiperButton
                          id={property?._id}
                          title="View Details"
                          className="w-1/2 h-11 rounded-full bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center gap-2 transition-all duration-200 hover:border-gray-300"
                          showIcon
                        />
                      </div>
                    </div>
                  </div>
                </HoverLift>
              </ShuffleInOnScroll>
            </SwiperSlide>
          ))
        ) : (
          // Show "no data found" message
          <div className="w-full text-center py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="text-gray-400 mb-4">
                {/* You can add an icon here if you want */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-500">Try again !</p>
            </div>
          </div>
        )}
      </Swiper>

      {/* Custom Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="custom-pagination"></div>
      </div>

      {/* Add custom animation CSS */}
      <style jsx global>{`
        @keyframes pulse-once {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        .animate-pulse-once {
          animation: pulse-once 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProperties;

"use client";

import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Star, MapPin } from "lucide-react";
import SwiperButton from "@/lib/utils/swiperButton";
import { toast } from "react-toastify";

const WishListPage = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_ENDPOINTS.WISHLIST.WISHLIST_ALL);
      console.log("Fetched wishlist:", res.data.data.wishlist);
      setWishList(res.data.data.wishlist || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWishlist = async (wishlistItemId, accommodationId) => {
    try {
      setDeletingId(wishlistItemId);

      // Call DELETE API with wishlist item ID as query parameter
      await axiosInstance.delete(
        `${API_ENDPOINTS.WISHLIST.WISHLIST_DELETE}?wishlistid=${wishlistItemId}`
        // OR if your API expects it in the URL path:
        // `${API_ENDPOINTS.WISHLIST.WISHLIST_DELETE}/${wishlistItemId}`
      );

      // Remove from local state
      setWishList((prev) => prev.filter((item) => item._id !== wishlistItemId));

      // Show success message
      toast.success("Removed from wishlist", {
        icon: "💔",
      });
    } catch (error) {
      console.error("Error deleting from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0D0BA8]"></div>
      </div>
    );
  }

  if (wishList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="text-center">
          <Heart
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            strokeWidth={1}
          />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Your Wishlist is Empty
          </h3>
          <p className="text-gray-500 mb-6">
            Properties you like will appear here
          </p>
          <button
            onClick={() => (window.location.href = "/properties")}
            className="bg-[#0D0BA8] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-20 py-12">
      <section className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          My Wishlist
        </h1>
        <p className="text-[#666666]">
          All the places you’ve loved — hostels, PGs, and hotels saved for your
          next stay
        </p>
        <p className="text-gray-600 mb-6 md:mb-8">
          {wishList.length} {wishList.length === 1 ? "property" : "properties"}{" "}
          saved
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {wishList.map((item) => {
          const accommodation = item.accommodationId;
          const priceData = accommodation?.pricing_ids?.[0]?.pricing?.[0];
          const firstImage = accommodation?.images_url?.[0];
          const location = accommodation?.location;
          const accommodationId = accommodation?._id;

          return (
            <div
              key={item._id}
              className="relative bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col w-full hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Badge and Price Container */}
              <div className="absolute top-3 left-0 right-0 flex justify-between items-center z-10">
                {/* Price on LEFT */}
                {priceData && (
                  <div className="bg-[#0D0BA8] text-[#FFFFFF] px-2 py-1 sm:px-3 sm:py-1.5 rounded-r-lg font-bold text-sm sm:text-base">
                    ₹{priceData.price} /{" "}
                    <span className="text-sm font-semibold">
                      {priceData.price_type}
                    </span>
                  </div>
                )}

                {/* Wishlist (Heart) on RIGHT */}
                <button
                  onClick={() =>
                    handleDeleteWishlist(item._id, accommodationId)
                  }
                  disabled={deletingId === item._id}
                  className="absolute top-2 right-0 flex items-center justify-center group mr-2 sm:mr-3 bg-white shadow-2xl p-2 rounded-full cursor-pointer z-20 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  aria-label="Remove from wishlist"
                >
                  {deletingId === item._id ? (
                    <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Heart
                      size={20}
                      strokeWidth={2}
                      className="fill-rose-500 text-rose-500 transition-transform group-hover:scale-110"
                    />
                  )}
                </button>
              </div>

              {/* Image - Responsive height */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={firstImage || "/placeholder-image.jpg"}
                  alt={accommodation?.property_name || "Property"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content - Responsive padding and text */}
              <div className="p-4 flex flex-col flex-1">
                <div className="mb-3 flex-1">
                  <h3 className="font-bold text-gray-800 text-lg line-clamp-1 mb-1">
                    {accommodation?.property_name || "Property Name"}
                  </h3>

                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {location?.area && `${location.area}, `}
                      {location?.city &&
                        location.city.charAt(0).toUpperCase() +
                          location.city.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                    {accommodation?.room_types?.[0] ||
                      accommodation?.room_type ||
                      "Shared Accommodation"}
                  </p>

                  {/* Amenities */}
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-1">
                      {accommodation?.amenities
                        ?.slice(0, 3)
                        .map((amenity, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                          >
                            {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Footer with rating and verification */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star
                        size={16}
                        className="fill-[#0D0BA8] text-[#0D0BA8] mr-1"
                      />
                      <span className="text-gray-700 text-sm font-medium">
                        {/* Add actual rating when available */}
                        {/* {accommodation?.averageRating || "4.5"} ({accommodation?.totalRatings || "10"}) */}
                        4.5 (12)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {accommodation?.isverified && (
                        <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                          ✓ Verified
                        </span>
                      )}
                      {accommodation?.category_name && (
                        <span className="text-xs text-gray-500">
                          {accommodation.category_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="px-4 pb-4">
                {accommodationId ? (
                  <SwiperButton
                    id={accommodationId}
                    title="Book Now"
                    className="w-full h-11 text-sm sm:text-base"
                    showIcon
                  />
                ) : (
                  <button
                    disabled
                    className="w-full h-11 bg-gray-200 text-gray-500 rounded-lg text-sm sm:text-base cursor-not-allowed"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishListPage;

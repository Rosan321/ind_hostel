"use client"

import ImageThumbnail from "@/components/ImageThumbnail";
import Hero from "@/components/stay_by_city/Hero";
import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PropertiesData from "./PropertiesData";
import TypesOfRoom from "@/components/TypesOfRoom";
import { ReviewCard } from "@/components/ReviewCard";
import SimilarLike from "@/components/SimilarLike";
import { getAmenityIcon, getAmenityLabel } from "@/lib/utils/amenitiesHelper";
import LocationSection from "@/components/Location";

const StayData = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchAccommodation = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION}/${id}`
        );

        setData(res.data.data);
        setRelated(res.data.relatedAccommodations || []);
      } catch (err) {
        // console.error("Accommodation API error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodation();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  } // handled by Suspense

  if (error || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <p>Accommodation not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50">
      <Hero
        name={data?.property_name}
        location={data?.location?.city}
        verify={data?.isverified}
      />

      <section className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 mt-8 lg:mt-0">
        <div className="mx-auto space-y-12">
          <ImageThumbnail
            images={data?.allImages}
            mainImage={data?.images_url}
            data={data}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT */}
            <section className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <h1 className="text-2xl font-bold">{data?.property_name ? data?.property_name.charAt(0).toUpperCase() + data?.property_name.slice(1) : "Property Name"}</h1>
              <p className="text-sm text-gray-600 mb-4">
                {data?.location?.city ? data?.location?.city.charAt(0).toUpperCase() + data?.location?.city.slice(1) : "City"}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {data?.amenities?.slice(0, 4).map((amenity, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 text-xs bg-white px-4 py-2 rounded-full border"
                  >
                    {getAmenityIcon(amenity)}
                    {getAmenityLabel(amenity)}
                  </div>
                ))}
              </div>

              <p className="mb-6">{data?.property_description}</p>
              <PropertiesData data={data} />
            </section>

            {/* RIGHT */}
            <section className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl p-4 sm:p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Amenities & Facilities</h2>

              <div className="grid grid-cols-2 gap-3">
                {data?.amenities?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                  >
                    {getAmenityIcon(item)}
                    <span>{getAmenityLabel(item)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-10 space-y-10">
            <TypesOfRoom id={id} data={data} />
            <LocationSection data={data?.location} />
            <ReviewCard id={id} />
            <SimilarLike similar={related} />
          </section>
        </div>
      </section>
    </main>
  );
};

export default StayData;

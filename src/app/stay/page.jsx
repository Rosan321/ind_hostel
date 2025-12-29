// import ImageThumbnail from "@/components/ImageThumbnail";
// import Location from "@/components/Location";
// import { ReviewCard } from "@/components/ReviewCard";
// import SimilarLike from "@/components/SimilarLike";
// import Hero from "@/components/stay_by_city/Hero";
// import TypesOfRoom from "@/components/TypesOfRoom";
// import { API_ENDPOINTS } from "@/lib/api/api";
// import axiosInstance from "@/lib/axiosInstance";
// import PropertiesData from "./PropertiesData";
// import { getAmenityIcon, getAmenityLabel } from "@/lib/utils/amenitiesHelper";

// export async function generateStaticParams() {
//   try {
//     const response = await axiosInstance.get(
//       API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION,
//       {
//         params: { type: "all" },
//       }
//     );

//     const allAccommodations = response.data.data;

//     if (!Array.isArray(allAccommodations)) {
//       console.error("API did not return an array for static parameters.");
//       return [];
//     }

//     return allAccommodations.map((item) => ({
//       id: item?._id.toString(),
//     }));
//   } catch (error) {
//     console.error("Failed to fetch accommodation IDs for SSG:", error.message);
//     return [];
//   }
// }

// async function getAccommodationById(id) {
//   try {
//     const response = await axiosInstance.get(
//       `${API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION}/${id}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       `Failed to fetch accommodation with ID ${id}:`,
//       error.message
//     );
//     return null;
//   }
// }

// export default async function Page({ params }) {
//   const { id } = await params;
//   const stringId = id.toString();

//   const resData = await getAccommodationById(stringId);
//   const data = resData?.data;

//   // console.log(resData);

//   if (!data) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
//         <p>Accommodation not found.</p>
//       </main>
//     );
//   }

//   return (
//     <main className="bg-gray-50">
//       <Hero name={data?.property_name} location={data?.location?.city} verify={data?.isverified} />

//       {/* Image Section */}
//       <section className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 mt-8 lg:mt-0">
//         <div className="mx-auto space-y-12">
//           {/* Image Gallery */}
//           <ImageThumbnail
//             images={data.allImages}
//             mainImage={data.images_url}
//             data={data}
//           />

//           {/* Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//             {/* LEFT CONTENT */}
//             <article className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
//               <header>
//                 <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
//                   {data.property_name}
//                 </h1>
//                 <p className="text-sm sm:text-base text-[#666666] mb-4">
//                   {data.location.city
//                     ? data.location.city.charAt(0).toUpperCase() +
//                       data.location.city.slice(1)
//                     : ""}
//                 </p>
//               </header>

//               {/* Tags - Top 4 amenities */}
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {data?.amenities?.slice(0, 4).map((amenity, i) => (
//                   <div
//                     key={i}
//                     className="inline-flex items-center gap-2 text-xs sm:text-sm bg-[#FFF] text-[#44475A] px-4 py-2 rounded-full border border-[#E0E0E0]"
//                   >
//                     {getAmenityIcon(amenity)}
//                     <span>{getAmenityLabel(amenity)}</span>
//                   </div>
//                 ))}
//               </div>

//               <p className="text-sm sm:text-base text-[#1A1A1A] mb-6 leading-relaxed">
//                 {data.property_description}
//               </p>
//               <PropertiesData data={data} />
//             </article>

//             {/* RIGHT SIDEBAR - Amenities */}
//             <section className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
//               <div>
//                 <p className="text-[#44475A] text-sm font-semibold">AMENITIES</p>
//                 <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
//                   Amenities & Facilities
//                 </h2>
//                 <p className="text-[#666666] text-sm">
//                   All the essentials to make your stay comfortable
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mt-4">
//                 {data?.amenities?.length > 0 ? (
//                   data.amenities.map((item, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors duration-200 border border-gray-100"
//                     >
//                       <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-gray-200">
//                         {getAmenityIcon(item)}
//                       </div>
//                       <span className="text-sm text-[#666666] font-medium">
//                         {getAmenityLabel(item)}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="col-span-2 text-center py-8">
//                     <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-gray-100 rounded-full">
//                       <Shield className="w-6 h-6 text-gray-400" />
//                     </div>
//                     <h4 className="text-lg font-semibold text-gray-700">
//                       No Amenities Listed
//                     </h4>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Check with property for available facilities
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>
//           </div>

//           {/* More Sections */}
//           <section className="mt-10 space-y-10">
//             <TypesOfRoom id={stringId} data={data} />
//             <Location data={resData?.data?.location} />
//             <ReviewCard id={stringId} />
//             <SimilarLike similar={resData?.relatedAccommodations} />
//           </section>
//         </div>
//       </section>
//     </main>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { Suspense } from "react";
import StayData from "./StayData";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">
              Loading accommodation details...
            </p>
          </div>
        </main>
      }
    >
      <StayData />
    </Suspense>
  );
}

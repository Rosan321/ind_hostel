// import BookingConfirmation from "@/components/BookingConfirmation";

// // Fetch available IDs at build time
// export async function generateStaticParams() {
//   try {
//     // Option A: Fetch from API
//     const response = await fetch('https://your-api.com/rooms');
//     const rooms = await response.json();

//     // Option B: Fetch from database (if using server-side)
//     // const rooms = await db.rooms.findMany({ select: { id: true } });

//     return rooms.map(room => ({
//       id: room.id.toString()
//     }));
//   } catch (error) {
//     console.error('Failed to fetch rooms:', error);
//     return []; // Return empty array or fallback IDs
//   }
// }

// export default function Checkout({ params }) {
//   return (
//     <div>
//       <BookingConfirmation id={params.id} />
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////

// import BookingConfirmation from "@/components/BookingConfirmation";
// import { getAllPropertyIds, getPropertyById } from "@/lib/utils/properties";

// // Generate static params for all properties
// export async function generateStaticParams() {
//   return getAllPropertyIds();
// }

// // Only allow pre-defined IDs, return 404 for others
// export const dynamicParams = false;

// export default function Checkout({ params }) {
//   const property = getPropertyById(params.id);

//   // Handle case where property is not found
//   if (!property) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h1 className="text-2xl font-bold text-gray-900">Property Not Found</h1>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <BookingConfirmation
//         id={property.id}
//         pgName={property.name}
//         basePrice={property.basePrice}
//         location={property.location}
//       />
//     </div>
//   );
// }

///////////////////////////////////////////////////////////

import BookingConfirmation from "@/components/BookingConfirmation";
import { getAllPropertyIds, getPropertyById } from "@/lib/utils/properties";

export async function generateStaticParams() {
  return getAllPropertyIds();
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: `Book ${property.name} | Ind Hostel`,
    description: `Book your stay at ${property.name} in ${property.location}`,
  };
}

export default async function Checkout({ params }) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Property
          </h1>
          <p className="text-gray-600">
            The property ID is missing or invalid.
          </p>
        </div>
      </div>
    );
  }

  const property = getPropertyById(id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BookingConfirmation
        id={property.id}
        pgName={property.name}
        basePrice={property.basePrice}
        location={property.location}
      />
    </div>
  );
}

// import { API_ENDPOINTS } from '@/lib/api/api';
// import axiosInstance from '@/lib/axiosInstance';
// import { formattedDate } from '@/lib/utils/fromattedDate';
// import { Download, Star } from 'lucide-react';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// const BookDetail_2 = ({ bookDataDetails }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const [showDetails1, setShowDetails1] = useState(false);

//   const handleDownloadReceipt = async (id) => {
//   try {
//     const res = await axiosInstance.post(
//       `${API_ENDPOINTS.INVOICE.INVOICE}/${id}`,
//       {},
//       {
//         responseType: 'blob',
//       }
//     );

//     const blob = new Blob([res.data], { type: 'application/pdf' });
//     const url = window.URL.createObjectURL(blob);

//     toast.success("Receipt opened in new tab!");
//     // Open in new tab instead of downloading
//     window.open(url, '_blank');

//   } catch (error) {
//     console.error("Error:", error);
//     toast.error("Failed to open receipt");
//   }
// };

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//     setShowDetails1(false);
//   };

//   const toggleDetails1 = () => {
//     setShowDetails1(!showDetails1);
//     setShowDetails(false);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden space-y-6 py-6">
//       {/* Header */}
//       <div className="px-6">
//         <h1 className="text-xl font-bold text-gray-800 mb-2">
//           Booking Summary
//         </h1>

//         {/* <div className="mb-4">
//           <h2 className="font-semibold text-gray-800">{bookingData.propertyName}</h2>
//           <p className="text-gray-600 text-sm">{bookingData.location}</p>
//           <div className="inline-flex items-center gap-2 bg-[#0A0A8F14] py-1 px-2 rounded-full mt-1">
//             <Star size={18} stroke='#0D0BA8' fill='#0D0BA8' />
//             <span className="font-medium text-[#0D0BA8]">{bookingData.rating}</span>
//           </div>
//         </div> */}

//         {/* Total Amount */}
//         <div className="py-4">
//           <h3 className="text-3xl font-bold text-[#0D0BA8] mb-2">
//             ₹{bookDataDetails?.bookingamount}
//           </h3>
//           <p className="text-[#666666] text-sm">
//             Total Paid (incl. taxes & charges)
//           </p>
//         </div>
//       </div>

//       {/* Expandable Details */}
//       <div className="px-6">
//         <button
//           onClick={toggleDetails}
//           className="flex items-center justify-between w-full mb-4 text-left"
//         >
//           <span className="font-medium text-gray-800">Stay Details</span>
//           <span className="text-gray-500">
//             {showDetails ? '▲' : '▼'}
//           </span>
//         </button>

//         {showDetails && (
//           <div className="space-y-3 text-sm mb-4">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Check-in:</span>
//               <span className="font-medium">{formattedDate(bookDataDetails?.guestdetails?.stayinfo?.check_in)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-600">Check-out:</span>
//               <span className="font-medium">{formattedDate(bookDataDetails?.guestdetails?.stayinfo?.check_out)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-600">Guests:</span>
//               <span className="font-medium">{bookDataDetails?.guests}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-600">Room:</span>
//               <span className="font-medium">{bookDataDetails?.roomtype ? bookDataDetails?.roomtype?.slice(0, 1).toUpperCase() + bookDataDetails?.roomtype?.slice(1) : ""}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-600">Booking ID:</span>
//               <span className="font-medium">{bookDataDetails?.bookingId}</span>
//             </div>
//           </div>
//         )}

//         <div className='h-[1px] w-full bg-gray-200' />

//         <button
//           onClick={toggleDetails1}
//           className="flex items-center justify-between w-full my-4 text-left"
//         >
//           <span className="font-medium text-gray-800">Price Breakdown</span>
//           <span className="text-gray-500">
//             {showDetails1 ? '▲' : '▼'}
//           </span>
//         </button>

//         {showDetails1 && (
//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Room Price:</span>
//               <span className="font-medium">{bookDataDetails?.room_price} × {bookDataDetails?.days}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-600">Taxes & Fees:</span>
//               <span className="font-medium">{bookDataDetails?.paymentid?.tax}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-600">Discount:</span>
//               <span className="font-medium text-red-500">-{bookDataDetails?.discountamount}</span>
//             </div>
//           </div>
//         )}

//         {/* Total Row */}
//         <div className="my-3 p-3 bg-[#0D0BA81F] rounded-lg flex justify-between items-center">
//           <span className='text-sm font-semibold'>Total:</span>
//           <h3 className='text-lg font-bold'>₹{bookDataDetails?.bookingamount}</h3>
//         </div>

//         <div className='h-[1px] w-full bg-gray-200' />

//         <div className='space-y-4 mt-6 text-sm text-[#1A1A1A] font-bold'>
//           <p>Payment Information</p>
//           <section className='flex items-center justify-between'>
//             <p>Payment Method</p>
//             <p className='text-[#444444] font-semibold'>UPI(PhonePe)</p>
//           </section>
//           <section className='flex items-center justify-between'>
//             <p>Transaction Id</p>
//             <p className='text-[#444444] font-semibold'>{bookDataDetails?.paymentid?.paymentInfo?.razorpay_payment_id}</p>
//           </section>
//           <section className='flex items-center justify-between'>
//             <p>Paid On</p>
//             <p className='text-[#444444] font-semibold'>10 Nov 2025</p>
//           </section>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-3 mt-6 flex justify-center">
//           <button
//             onClick={()=>handleDownloadReceipt(bookDataDetails?.bookingId)}
//             className="bg-[#0D0BA8] text-white font-medium py-3 px-4 rounded-full transition duration-200 flex items-center justify-center gap-4 cursor-pointer"
//           >
//             <Download size={18} />
//             Download Receipt
//           </button>

//           {/* <button
//             onClick={handleContactHost}
//             className="w-full bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-4 rounded-lg border border-blue-600 transition duration-200 flex items-center justify-center"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             Contact Host
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetail_2;

/////////////////////////////////////////////////////////////////////////////

"use client"; // Must be client component

import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { formattedDate } from "@/lib/utils/fromattedDate";
import { Download, Star } from "lucide-react";
import React, { useState, useEffect } from "react"; // Added useEffect
import { toast } from "react-toastify";

const BookDetail_2 = ({ bookDataDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDetails1, setShowDetails1] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side

  // console.log(bookDataDetails);

  // This ensures code only runs on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadReceipt = async (id) => {
    // Double-check we're on client side
    if (!isClient) {
      toast.error("Please refresh and try again");
      return;
    }

    if (!id) {
      toast.error("No booking ID found");
      return;
    }

    setDownloading(true);

    try {
      const res = await axiosInstance({
        method: "POST",
        url: `${API_ENDPOINTS.INVOICE.INVOICE}/${id}`,
        responseType: "blob",
      });

      // Client-side only operations
      if (typeof window !== "undefined") {
        const blob = new Blob([res.data], { type: "application/pdf" });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `receipt-${id}.pdf`;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();

        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 100);
      }

      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error(
        error.response?.data?.message || "Failed to download receipt"
      );
    } finally {
      setDownloading(false);
    }
  };

  // Safer render - check for client-side before rendering browser-dependent UI
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden space-y-2 lg:space-y-6 py-6">
      {/* Header */}
      <div className="px-6">
        <h1 className="text-xl font-bold text-gray-800 lg:mb-2">
          Booking Summary
        </h1>

        {/* Total Amount */}
        <div className="py-2 lg:py-4">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#0D0BA8] mb-2">
            ₹{bookDataDetails?.bookingamount}
          </h3>
          <p className="text-[#666666] text-sm">
            Total Paid (incl. taxes & charges)
          </p>
        </div>
      </div>

      {/* Expandable Details */}
      <div className="px-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full mb-4 text-left"
        >
          <span className="font-medium text-gray-800">Stay Details</span>
          <span className="text-gray-500">{showDetails ? "▲" : "▼"}</span>
        </button>

        {showDetails && (
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-medium">
                {formattedDate(
                  bookDataDetails?.guestdetails?.stayinfo?.check_in
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-medium">
                {formattedDate(
                  bookDataDetails?.guestdetails?.stayinfo?.check_out
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Guests:</span>
              <span className="font-medium">{bookDataDetails?.guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Room:</span>
              <span className="font-medium">
                {bookDataDetails?.roomtype
                  ? bookDataDetails.roomtype.slice(0, 1).toUpperCase() +
                    bookDataDetails.roomtype.slice(1)
                  : ""}
              </span>
            </div>
            <div className="flex xl:flex-col 2xl:flex-row justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium">{bookDataDetails?.bookingId}</span>
            </div>
          </div>
        )}

        <div className="h-[1px] w-full bg-gray-200" />

        <button
          onClick={() => setShowDetails1(!showDetails1)}
          className="flex items-center justify-between w-full my-4 text-left"
        >
          <span className="font-medium text-gray-800">Price Breakdown</span>
          <span className="text-gray-500">{showDetails1 ? "▲" : "▼"}</span>
        </button>

        {showDetails1 && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Room Price:</span>
              <section className="flex gap-16">
                <span className="font-medium">({bookDataDetails?.days})</span>
                <span className="font-medium">
                  {bookDataDetails?.room_price}
                </span>
              </section>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Fees:</span>
              <span className="font-medium">
                {bookDataDetails?.paymentid?.tax}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium text-red-500">
                -{bookDataDetails?.discountamount}
              </span>
            </div>

            {/* Total Row */}
            <div className="my-3 p-3 bg-[#0D0BA81F] rounded-lg flex justify-between items-center">
              <span className="text-sm font-semibold">Total:</span>
              <h3 className="text-lg font-bold">
                ₹{bookDataDetails?.bookingamount}
              </h3>
            </div>
          </div>
        )}

        <div className="h-[1px] w-full bg-gray-200" />

        <div className="space-y-4 mt-6 text-sm text-[#1A1A1A] font-bold">
          <p className="text-lg">Payment Information</p>
          <section className="flex items-center justify-between">
            <p>Payment Method</p>
            <p className="text-[#444444] font-semibold">
              {bookDataDetails?.paymentid?.payment_mode}
            </p>
          </section>
          <section className="flex items-center justify-between">
            <p>Transaction Id</p>
            <p className="text-[#444444] font-semibold">
              {bookDataDetails?.paymentid?.paymentInfo?.razorpay_payment_id}
            </p>
          </section>
          <section className="flex items-center justify-between">
            <p>Paid On</p>
            <p className="text-[#444444] font-semibold">
              {new Date(
                bookDataDetails?.paymentid?.createdAt
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </section>
        </div>

        {/* Action Buttons - Only show download on client side */}
        {isClient && (
          <div className="space-y-3 mt-6 flex justify-center">
            <button
              onClick={() => handleDownloadReceipt(bookDataDetails?.bookingId)}
              disabled={downloading || !bookDataDetails?.bookingId}
              className="bg-[#0D0BA8] text-white font-medium py-3 px-4 rounded-full transition duration-200 flex items-center justify-center gap-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download Receipt
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail_2;

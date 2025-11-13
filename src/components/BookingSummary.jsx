// "use client";

// import { useMemo, useState } from "react";
// import { ArrowRight, CalendarDays, Headset, MapPin, Undo2, Wallet } from "lucide-react";
// import DatePicker from "react-datepicker";
// import { usePathname } from "next/navigation";
// import PricingSummary from "./PricingSummary";

// export default function BookingSummary({
//   basePrice = 2999,
//   pgName,
//   location,
//   formData = {},
// }) {
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const pathname = usePathname();
//   const isCheckout = pathname.includes("/checkout");
//   const { agreeToTerms = false } = formData;

//   const nights = useMemo(() => {
//     const d1 = new Date(checkIn);
//     const d2 = new Date(checkOut);
//     const diff = Math.max(0, Math.ceil((d2 - d1) / (1000 * 3600 * 24)));
//     return diff === 0 ? 1 : diff;
//   }, [checkIn, checkOut]);

//   const subtotal = useMemo(() => basePrice * nights, [basePrice, nights]);
//   const taxes = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
//   const total = subtotal + taxes;

//   // checkout version
//   if (isCheckout) {
//     return (
//       <aside className="w-full bg-white rounded-xl p-4 md:p-6 shadow sticky top-24">
//         <h3 className="text-xl md:text-2xl font-bold mb-6">Booking Summary</h3>

//         <div className="mb-6">
//           <h4 className="text-[#1A1A1A] font-bold">{pgName}</h4>
//           <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
//             <MapPin className="h-4 w-4" />
//             {location}
//           </p>
//         </div>

//         <div className="space-y-3 text-sm border-b border-gray-200 pb-4 mb-4">
//           <div className="flex items-center gap-18">
//             <span className="text-sm text-[#666666]">Check-in</span>
//             <ArrowRight size={18} className="text-[#666666]" />
//             <span className="text-[#1A1A1A] font-medium">12 Nov 2025</span>
//           </div>
//           <div className="flex items-center gap-16">
//             <span className="text-sm text-[#666666]">Check-out</span>
//             <ArrowRight size={18} className="text-[#666666]" />
//             <span className="text-[#1A1A1A] font-medium">15 Nov 2025</span>
//           </div>
//           <div className="flex items-center gap-20">
//             <span className="text-sm text-[#666666]">Guests</span>
//             <ArrowRight size={18} className="text-[#666666]" />
//             <span className="text-[#1A1A1A] font-medium">2 Adults</span>
//           </div>
//         </div>

//         <div className="flex gap-2 items-center mb-3">
//           <input
//             placeholder="Have a promo code?"
//             className="border border-gray-200 w-full sm:w-1/2 lg:w-full rounded px-3 py-2 text-sm outline-none"
//           />
//           <button className="bg-emerald-500 text-white px-3 py-2 rounded text-sm">
//             Apply
//           </button>
//         </div>

//         {/* ✅ unified */}
//         <PricingSummary
//           basePrice={basePrice}
//           nights={nights}
//           subtotal={subtotal}
//           taxes={taxes}
//           total={total}
//         />

//         <button
//           disabled={!agreeToTerms}
//           className={`w-full mt-6 py-3 rounded-full font-semibold bg-[#F1FF51] ${
//             agreeToTerms ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
//           }`}
//         >
//           Proceed to Payment
//         </button>
//         <div className="flex flex-col items-center gap-4 sm:gap-4 mt-4 lg:mt-8 text-xs text-[#666666] tracking-wide">
//           <p className="text-xs text-center">Payments are secure and encrypted. Free cancellation policies shown on next page</p>
//           <div className="text-[#666666] flex items-center justify-center gap-2 sm:gap-4 lg:gap-3">
//             <section className="flex items-center gap-1 md:gap-2">
//               <Wallet size={18} />
//               <p className="text-xs">Secure payments</p>
//             </section>
//             <section className="flex items-center gap-2">
//               <Undo2 size={18} />
//               <p className="text-xs">refund policy</p>
//             </section>
//             <section className="flex items-center gap-2">
//               <Headset size={18} />
//               <p className="text-xs">24/7 support</p>
//             </section>
//           </div>
//         </div>
//       </aside>
//     );
//   }

//   // default version
//   return (
//     <aside className="w-full bg-white rounded-xl p-6 shadow">
//       <h3 className="text-xl md:text-2xl font-bold mb-4">Booking Summary</h3>
//       <h2 className="text-3xl font-bold mb-3">
//         ₹{basePrice.toLocaleString()}{" "}
//         <span className="text-2xl font-normal">/ night</span>
//       </h2>
//       <div className="text-xs text-gray-500 mb-4">Includes meals & WiFi</div>

//       <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
//         <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-full border flex-1 h-12">
//           <CalendarDays size={24} className="text-gray-600" />
//           <DatePicker
//             selected={checkIn}
//             onChange={setCheckIn}
//             placeholderText="Check-in"
//             className="outline-none w-full"
//             minDate={new Date()}
//           />
//         </div>

//         <div className="hidden md:flex justify-center items-center">
//           <ArrowRight size={20} />
//         </div>

//         <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-full border flex-1 h-12">
//           <CalendarDays size={24} className="text-gray-600" />
//           <DatePicker
//             selected={checkOut}
//             onChange={setCheckOut}
//             placeholderText="Check-out"
//             className="outline-none w-full"
//             minDate={checkIn || new Date()}
//           />
//         </div>
//       </div>

//       {/* unified */}
//       <div className="my-8">
//         <PricingSummary
//           basePrice={basePrice}
//           nights={nights}
//           subtotal={subtotal}
//           taxes={taxes}
//           total={total}
//         />
//       </div>

//       <button className="bg-[#F1FF51] w-full py-3 rounded-full font-semibold">
//         Book Now
//       </button>
//     </aside>
//   );
// }


///////////////////////////////////////////////////////////////////////////////

"use client";

import { useState, useMemo } from "react";
import {
  CalendarDays,
  ArrowRight,
  CreditCard,
  RefreshCw,
  Headphones,
  Minus,
  Plus,
} from "lucide-react";
import { usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

const BookingSummary = ({ basePrice = 2999, listingType = "pg" }) => {
  const pathname = usePathname();

  // Hide on checkout page
  if (pathname && pathname.includes("/checkout")) return null;

  // States
  const [guests, setGuests] = useState(1);
  const [durationType, setDurationType] = useState("day"); // day | week | month
  const [coupon, setCoupon] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  // Type flags
  const isHotel = listingType === "hotel";
  const isPG = listingType === "pg" || listingType === "hostel";

  // 🔹 1. Calculate number of nights (or duration in days)
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  // 🔹 2. Define PG/Hostel pricing multipliers (base period values)
  const durationMultipliers = {
    day: 1,
    week: 7,
    month: 30,
  };

  // 🔹 3. Compute effective base price for selected stay type
  const calculatedBasePrice = useMemo(() => {
    if (isPG) return basePrice * durationMultipliers[durationType];
    return basePrice;
  }, [basePrice, durationType, isPG]);

  // 🔹 4. Compute final total dynamically
  const totalPrice = useMemo(() => {
    // PG pricing logic
    if (isPG) {
      if (checkIn && checkOut) {
        const totalDays = nights || 1;
        // convert total days into how many periods of selected type (e.g. 10 days = 1.4 weeks)
        const stayUnits = totalDays / durationMultipliers[durationType];
        return Math.round(calculatedBasePrice * stayUnits * guests);
      }
      // default (no dates selected)
      return Math.round(calculatedBasePrice * guests);
    }

    // Hotel pricing logic
    const totalNights = nights || 1;
    return Math.round(basePrice * totalNights * guests);
  }, [nights, guests, basePrice, calculatedBasePrice, durationType, durationMultipliers, checkIn, checkOut, isPG]);

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 py-6 space-y-4 sm:space-y-5 sticky top-24">
      <h3 className="text-lg font-semibold border-b border-gray-300 pb-4 sm:pb-6">
        Booking Summary
      </h3>

      {/* ✅ PG / Hostel Duration Selector */}
      {isPG && (
        <div className="flex items-center gap-2 justify-between">
          {["day", "week", "month"].map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 cursor-pointer transition-all
                ${
                  durationType === type && "text-[#1A1A1A]"}`}
            >
              <input
                type="radio"
                name="durationType"
                value={type}
                checked={durationType === type}
                onChange={() => setDurationType(type)}
                className="hidden"
              />
              <span className="w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center">
                {durationType === type && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </span>
              <span className="text-sm font-medium capitalize">
                Per / {type}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* ✅ Price Info */}
      <div>
        <h4 className="text-2xl font-bold">
          ₹{calculatedBasePrice.toLocaleString()}{" "}
          <span className="text-[#1A1A1A]">
            / {isPG ? durationType : "night"}
          </span>
        </h4>
        <p className="text-sm text-[#666666] mt-1">
          Includes meals & WiFi
        </p>
      </div>

      {/* ✅ Date Selection */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-full border flex-1 h-12">
          <CalendarDays size={24} className="text-gray-600" />
          <DatePicker
            selected={checkIn}
            onChange={(date) => {
              setCheckIn(date);
              if (checkOut && date > checkOut) setCheckOut(null);
            }}
            placeholderText="Check-in"
            className="outline-none w-full"
            minDate={new Date()}
          />
        </div>

        <div className="hidden md:flex justify-center items-center">
          <ArrowRight size={20} />
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-full border flex-1 h-12">
          <CalendarDays size={24} className="text-gray-600" />
          <DatePicker
            selected={checkOut}
            onChange={setCheckOut}
            placeholderText="Check-out"
            className="outline-none w-full"
            minDate={checkIn || new Date()}
          />
        </div>
      </div>

      {/* ✅ Guest Selector (for both hotel & PG) */}
      <div className="flex items-center justify-between mt-3">
        <p className="font-medium text-sm">Guests</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="border border-gray-300 rounded-full w-7 h-7 grid place-items-center bg-gray-100 hover:bg-gray-200"
          >
            <Minus size={14} />
          </button>
          <span className="text-xl font-semibold">{guests}</span>
          <button
            onClick={() => setGuests((g) => g + 1)}
            className="border border-gray-300 rounded-full w-7 h-7 grid place-items-center bg-gray-100 hover:bg-gray-200"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* ✅ Coupon Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Have a promo code?"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition">
          Apply
        </button>
      </div>

      {/* ✅ Total Summary */}
      <div className="border-t border-gray-300 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            {isPG ? "Total Amount:" : `Total (${nights || 1} night${nights > 1 ? "s" : ""}):`}
          </p>
          <h4 className="text-xl font-semibold">
            ₹{totalPrice.toLocaleString()}
          </h4>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Includes taxes and service fees
        </p>
      </div>

      {/* ✅ Book Now */}
      <div className="w-full sm:w-1/2 lg:w-full bg-blue-700 text-white text-center mx-auto py-3 rounded-full font-medium hover:bg-blue-800 transition-all cursor-pointer">
        <Link href="/checkout">
          Book Now
        </Link>
      </div>

      {/* ✅ Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500 pt-3">
        <div className="flex items-center gap-1">
          <CreditCard size={14} /> Secure payments
        </div>
        <div className="flex items-center gap-1">
          <RefreshCw size={14} /> Refund policy
        </div>
        <div className="flex items-center gap-1">
          <Headphones size={14} /> 24/7 support
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;


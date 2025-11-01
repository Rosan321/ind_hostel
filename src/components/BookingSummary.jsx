// "use client";

// import { useMemo, useState } from "react";
// import {
//   ArrowRight,
//   CalendarDays,
//   Headset,
//   Undo2,
//   Wallet,
// } from "lucide-react";
// import DatePicker from "react-datepicker";

// export default function BookingSummary({ basePrice = 2999 }) {
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [guests, setGuests] = useState(1);
//   const [promo, setPromo] = useState("");
//   const [appliedDiscount, setAppliedDiscount] = useState(0);

//   const nights = useMemo(() => {
//     const d1 = new Date(checkIn);
//     const d2 = new Date(checkOut);
//     const diff = Math.max(0, Math.ceil((d2 - d1) / (1000 * 3600 * 24)));
//     return diff === 0 ? 1 : diff;
//   }, [checkIn, checkOut]);

//   const subtotal = useMemo(() => basePrice * nights, [basePrice, nights]);
//   const discount = useMemo(() => appliedDiscount, [appliedDiscount]);
//   const taxes = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
//   const total = subtotal - discount + taxes;

//   function applyPromo() {
//     if (promo.trim().toUpperCase() === "SAVE10") {
//       setAppliedDiscount(Math.round(subtotal * 0.1));
//     } else if (promo.trim().toUpperCase() === "FLAT500") {
//       setAppliedDiscount(500);
//     } else {
//       setAppliedDiscount(0);
//     }
//   }

//   return (
//     <aside className="w-full bg-white rounded-xl p-6 shadow">
//       <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
//         Booking Summary
//       </h3>
//       <div className="text-2xl font-bold mb-1">
//         ₹{basePrice.toLocaleString()}{" "}
//         <span className="text-2xl font-bold text-[#000000]">/ night</span>
//       </div>
//       <div className="text-xs text-gray-500 mb-4">Includes meals & WiFi</div>

//       <div className="flex flex-col md:flex-row md:items-center md:gap-3 mb-3">
//         {/* Check-in Date */}
//         <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full border flex-1 h-12">
//           <CalendarDays size={28} className="text-gray-600" />
//           <DatePicker
//             selected={checkIn}
//             onChange={setCheckIn}
//             placeholderText="Check-in"
//             className="outline-none w-full bg-transparent text-sm md:text-base text-black"
//             dateFormat="dd MMM yyyy"
//             minDate={new Date()}
//           />
//         </div>

//         {/* Arrow for desktop only */}
//         <div className="hidden md:flex justify-center items-center text-gray-800">
//           <ArrowRight size={24} />
//         </div>

//         {/* Check-out Date */}
//         <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full border flex-1 h-12 mt-2 md:mt-0">
//           <CalendarDays size={28} className="text-gray-600" />
//           <DatePicker
//             selected={checkOut}
//             onChange={setCheckOut}
//             placeholderText="Check-out"
//             className="outline-none w-full bg-transparent text-sm md:text-base text-black"
//             dateFormat="dd MMM yyyy"
//             minDate={checkIn || new Date()}
//           />
//         </div>
//       </div>

//       <div className="flex flex-col mb-3">
//         <label className="text-xs text-gray-600 mb-1">Guests</label>
//         <select
//           value={guests}
//           onChange={(e) => onChange(Number(e.target.value))}
//           className="border rounded px-3 py-2 text-sm outline-none"
//         >
//           {[...Array(6)].map((_, i) => (
//             <option key={i} value={i + 1}>
//               {i + 1} guest{i > 0 ? "s" : ""}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex gap-2 items-center mb-3">
//         <input
//           value={promo}
//           onChange={(e) => setPromo(e.target.value)}
//           placeholder="Have a promo code?"
//           className="flex-1 border rounded px-3 py-2 text-sm outline-none"
//         />
//         <button
//           onClick={applyPromo}
//           className="bg-emerald-500 text-white px-3 py-2 rounded text-sm"
//         >
//           Apply
//         </button>
//       </div>

//       <div className="text-sm text-gray-600 my-8">
//         <section className="flex items-center justify-between text-base font-semibold text-[#000000]">
//           Total ({nights} night{nights > 1 ? "s" : ""}):{" "}
//           <h5 className="text-lg mr-12">₹{total.toLocaleString()}</h5>
//         </section>
//         <span>Includes taxes and service fees</span>
//       </div>
//       <div className="w-full flex flex-col justify-center gap-6">
//         <button className="bg-[#F1FF51] px-6 py-2 rounded-full cursor-pointer">
//           Book Now
//         </button>
//         <div className="text-[#666666] flex items-center justify-center sm:gap-4 xl:gap-6">
//           <section className="flex items-center gap-2">
//             <Wallet size={18} />
//             <p className="text-xs">Secure payments</p>
//           </section>
//           <section className="flex items-center gap-2">
//             <Undo2 size={18} />
//             <p className="text-xs">refund policy</p>
//           </section>
//           <section className="flex items-center gap-2">
//             <Headset size={18} />
//             <p className="text-xs">24/7 support</p>
//           </section>
//         </div>
//       </div>
//     </aside>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Headset,
  MapPin,
  Undo2,
  Wallet,
} from "lucide-react";
import DatePicker from "react-datepicker";
import { usePathname } from "next/navigation";

export default function BookingSummary({
  basePrice = 2999,
  pgName,
  location,
  formData = {},
}) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [promo, setPromo] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const pathname = usePathname();
  const isCheckout = pathname.includes("/checkout");
  const { agreeToTerms = false } = formData;

  const nights = useMemo(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.max(0, Math.ceil((d2 - d1) / (1000 * 3600 * 24)));
    return diff === 0 ? 1 : diff;
  }, [checkIn, checkOut]);

  const subtotal = useMemo(() => basePrice * nights, [basePrice, nights]);
  const discount = useMemo(() => appliedDiscount, [appliedDiscount]);
  const taxes = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const total = subtotal - discount + taxes;

  function applyPromo() {
    if (promo.trim().toUpperCase() === "SAVE10") {
      setAppliedDiscount(Math.round(subtotal * 0.1));
    } else if (promo.trim().toUpperCase() === "FLAT500") {
      setAppliedDiscount(500);
    } else {
      setAppliedDiscount(0);
    }
  }

  // ✅ SHOW CHECKOUT VERSION IF isCheckout = true
  if (isCheckout) {
    return (
      <aside className="w-full bg-white rounded-xl p-6 shadow space-y-4">
        {/* Right Column - Booking Summary */}
        <div className="space-y-6">
          <div className="sticky top-6">
            <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>

            {/* Property Info */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900">{pgName}</h4>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {location}
              </p>
            </div>

            {/* Stay Details */}
            <div className="space-y-3 text-sm border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in</span>
                <span className="font-medium">12 Nov 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out</span>
                <span className="font-medium">15 Nov 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests</span>
                <span className="font-medium">2 Adults</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="py-4 border-b border-gray-200">
              <div className="flex gap-2 items-center mb-3">
                <input
                  // value={promo}
                  // onChange={(e) => setPromo(e.target.value)}
                  placeholder="Have a promo code?"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                />
                <button
                  // onClick={applyPromo}
                  className="bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    ₹{basePrice} × {nights} nights
                  </span>
                  <span className="font-medium">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-medium">₹{taxes}</span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              disabled={agreeToTerms}
              className={`w-full mt-6 py-4 rounded-full font-semibold transition-colors bg-[#F1FF51] hover:bg-[#d7e348] ${
                agreeToTerms ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              Proceed to Payment
            </button>

            {/* Security Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 mb-3">
                Payments are secure and encrypted. Free cancellation policies
                shown on next page
              </p>
              <div className="flex justify-center gap-4 text-xs text-gray-500">
                <span>Secure payments</span>
                <span>•</span>
                <span>refund policy</span>
                <span>•</span>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // ✅ OTHERWISE SHOW THE ORIGINAL BOOKING FORM
  return (
    <aside className="w-full bg-white rounded-xl p-6 shadow">
      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
        Booking Summary
      </h3>
      <h2 className="text-3xl font-bold mb-4">
        ₹{basePrice.toLocaleString()}{" "}
        <span className="text-2xl font-bold text-[#000000]">/ night</span>
      </h2>
      <div className="text-xs text-gray-500 mb-4">Includes meals & WiFi</div>

      {/* Date Pickers */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-3 mb-3">
        <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full border flex-1 h-12">
          <CalendarDays size={28} className="text-gray-600" />
          <DatePicker
            selected={checkIn}
            onChange={setCheckIn}
            placeholderText="Check-in"
            className="outline-none w-full bg-transparent text-sm md:text-base text-black"
            dateFormat="dd MMM yyyy"
            minDate={new Date()}
          />
        </div>

        <div className="hidden md:flex justify-center items-center text-gray-800">
          <ArrowRight size={24} />
        </div>

        <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full border flex-1 h-12 mt-2 md:mt-0">
          <CalendarDays size={28} className="text-gray-600" />
          <DatePicker
            selected={checkOut}
            onChange={setCheckOut}
            placeholderText="Check-out"
            className="outline-none w-full bg-transparent text-sm md:text-base text-black"
            dateFormat="dd MMM yyyy"
            minDate={checkIn || new Date()}
          />
        </div>
      </div>

      {/* Guests */}
      <div className="flex flex-col mb-3">
        <label className="text-xs text-gray-600 mb-1">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border border-gray-400 rounded-lg px-3 py-2 text-sm outline-none"
        >
          {[...Array(6)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} guest{i > 0 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Promo */}
      <div className="flex gap-2 items-center mb-3">
        <input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Have a promo code?"
          className="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={applyPromo}
          className="bg-emerald-500 text-white px-3 py-2 rounded text-sm"
        >
          Apply
        </button>
      </div>

      {/* Total */}
      <div className="text-sm text-gray-600 my-8">
        <section className="flex items-center justify-between text-base font-semibold text-[#000000]">
          Total ({nights} night{nights > 1 ? "s" : ""}):{" "}
          <h5 className="text-2xl mr-12">₹{total.toLocaleString()}</h5>
        </section>
        <span>Includes taxes and service fees</span>
      </div>

      {/* Buttons and Info */}
      <div className="w-full flex flex-col justify-center gap-6">
        <button className="bg-[#F1FF51] px-6 py-2 rounded-full cursor-pointer">
          Book Now
        </button>
        <div className="text-[#666666] flex items-center justify-center sm:gap-4 xl:gap-6 flex-wrap">
          <section className="flex items-center gap-2">
            <Wallet size={18} />
            <p className="text-xs">Secure payments</p>
          </section>
          <section className="flex items-center gap-2">
            <Undo2 size={18} />
            <p className="text-xs">Refund policy</p>
          </section>
          <section className="flex items-center gap-2">
            <Headset size={18} />
            <p className="text-xs">24/7 support</p>
          </section>
        </div>
      </div>
    </aside>
  );
}

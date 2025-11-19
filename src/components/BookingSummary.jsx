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
import RevealOnScroll from "./animations/RevealOnScroll";

const BookingSummary = ({ basePrice = 2999 || basePrice, listingType = "pg", pgName, formData={}, location, id }) => {
  const pathname = usePathname();

  const checkoutPage = pathname.endsWith("/checkout");

  console.log(checkoutPage)

  // States
  const [guests, setGuests] = useState(1);
  const [durationType, setDurationType] = useState("day");
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
  }, [
    nights,
    guests,
    basePrice,
    calculatedBasePrice,
    durationType,
    durationMultipliers,
    checkIn,
    checkOut,
    isPG,
  ]);

  return (
    <div className="bg-white rounded-3xl shadow-md p-4 sm:p-6 py-6 space-y-4 sm:space-y-5 sticky">
      <RevealOnScroll delay={0.2}>
        <h3 className="text-lg font-semibold border-b border-gray-300 pb-4 sm:pb-6">
          Booking Summary
        </h3>
      </RevealOnScroll>

      {/* ✅ PG / Hostel Duration Selector */}
      {isPG && (
        <div className="flex items-center gap-2 justify-between">
          {["day", "week", "month"].map((type) => (
            <RevealOnScroll key={type} delay={0}>
              <label
                className={`flex items-center gap-2 cursor-pointer transition-all
                ${durationType === type && "text-[#1A1A1A]"}`}
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
                    <span className="w-2 h-2 bg-[#0D0BA8] rounded-full" />
                  )}
                </span>
                <span className="text-sm font-medium capitalize">
                  Per / {type}
                </span>
              </label>
            </RevealOnScroll>
          ))}
        </div>
      )}

      {/* ✅ Price Info */}
      <RevealOnScroll delay={0.2}>
      <div>
        <h4 className="text-2xl font-bold">
          ₹{calculatedBasePrice.toLocaleString()}{" "}
          <span className="text-[#1A1A1A]">
            / {isPG ? durationType : "night"}
          </span>
        </h4>
        <p className="text-sm text-[#666666] mt-1">Includes meals & WiFi</p>
      </div>
      </RevealOnScroll>

      {/* ✅ Date Selection */}
      <RevealOnScroll delay={0.2}>
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
      </RevealOnScroll>

      {/* ✅ Guest Selector (for both hotel & PG) */}
      <RevealOnScroll delay={0.2}>
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
      </RevealOnScroll>

      {/* ✅ Coupon Input */}
      <RevealOnScroll delay={0.2}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Have a promo code?"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="bg-[#44475A] text-white px-4 py-2 rounded-lg text-sm">
            Apply
          </button>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        {/* ✅ Total Summary */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {isPG
                ? "Total Amount:"
                : `Total (${nights || 1} night${nights > 1 ? "s" : ""}):`}
            </p>
            <h4 className="text-xl font-semibold">
              ₹{totalPrice.toLocaleString()}
            </h4>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Includes taxes and service fees
          </p>
        </div>
      </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          {/* ✅ Book Now */}
          <Link href={`${checkoutPage ? `/booking_completed` : `/stay/${id}/checkout`}`}>
            <div className="w-full sm:w-1/2 lg:w-full bg-[#0D0BA8] text-white text-center mx-auto py-3 rounded-full font-medium hover:bg-[#2A32FF] transition-all cursor-pointer">
              Book Now
            </div>
          </Link>

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
      </RevealOnScroll>
    </div>
  );
};

export default BookingSummary;

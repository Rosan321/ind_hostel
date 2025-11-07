"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Headset, MapPin, Undo2, Wallet } from "lucide-react";
import DatePicker from "react-datepicker";
import { usePathname } from "next/navigation";
import PricingSummary from "./PricingSummary";

export default function BookingSummary({
  basePrice = 2999,
  pgName,
  location,
  formData = {},
}) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
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
  const taxes = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const total = subtotal + taxes;

  // checkout version
  if (isCheckout) {
    return (
      <aside className="w-full bg-white rounded-xl p-4 md:p-6 shadow sticky top-24">
        <h3 className="text-xl md:text-2xl font-bold mb-6">Booking Summary</h3>

        <div className="mb-6">
          <h4 className="text-[#1A1A1A] font-bold">{pgName}</h4>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <MapPin className="h-4 w-4" />
            {location}
          </p>
        </div>

        <div className="space-y-3 text-sm border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center gap-18">
            <span className="text-sm text-[#666666]">Check-in</span>
            <ArrowRight size={18} className="text-[#666666]" />
            <span className="text-[#1A1A1A] font-medium">12 Nov 2025</span>
          </div>
          <div className="flex items-center gap-16">
            <span className="text-sm text-[#666666]">Check-out</span>
            <ArrowRight size={18} className="text-[#666666]" />
            <span className="text-[#1A1A1A] font-medium">15 Nov 2025</span>
          </div>
          <div className="flex items-center gap-20">
            <span className="text-sm text-[#666666]">Guests</span>
            <ArrowRight size={18} className="text-[#666666]" />
            <span className="text-[#1A1A1A] font-medium">2 Adults</span>
          </div>
        </div>

        <div className="flex gap-2 items-center mb-3">
          <input
            placeholder="Have a promo code?"
            className="border border-gray-200 w-full sm:w-1/2 lg:w-full rounded px-3 py-2 text-sm outline-none"
          />
          <button className="bg-emerald-500 text-white px-3 py-2 rounded text-sm">
            Apply
          </button>
        </div>

        {/* ✅ unified */}
        <PricingSummary
          basePrice={basePrice}
          nights={nights}
          subtotal={subtotal}
          taxes={taxes}
          total={total}
        />

        <button
          disabled={!agreeToTerms}
          className={`w-full mt-6 py-3 rounded-full font-semibold bg-[#F1FF51] ${
            agreeToTerms ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Proceed to Payment
        </button>
        <div className="flex flex-col items-center gap-4 sm:gap-4 mt-4 lg:mt-8 text-xs text-[#666666] tracking-wide">
          <p className="text-xs text-center">Payments are secure and encrypted. Free cancellation policies shown on next page</p>
          <div className="text-[#666666] flex items-center justify-center gap-2 sm:gap-4 lg:gap-3">
            <section className="flex items-center gap-1 md:gap-2">
              <Wallet size={18} />
              <p className="text-xs">Secure payments</p>
            </section>
            <section className="flex items-center gap-2">
              <Undo2 size={18} />
              <p className="text-xs">refund policy</p>
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

  // default version
  return (
    <aside className="w-full bg-white rounded-xl p-6 shadow">
      <h3 className="text-xl md:text-2xl font-bold mb-4">Booking Summary</h3>
      <h2 className="text-3xl font-bold mb-3">
        ₹{basePrice.toLocaleString()}{" "}
        <span className="text-2xl font-normal">/ night</span>
      </h2>
      <div className="text-xs text-gray-500 mb-4">Includes meals & WiFi</div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-full border flex-1 h-12">
          <CalendarDays size={24} className="text-gray-600" />
          <DatePicker
            selected={checkIn}
            onChange={setCheckIn}
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

      {/* unified */}
      <div className="my-8">
        <PricingSummary
          basePrice={basePrice}
          nights={nights}
          subtotal={subtotal}
          taxes={taxes}
          total={total}
        />
      </div>

      <button className="bg-[#F1FF51] w-full py-3 rounded-full font-semibold">
        Book Now
      </button>
    </aside>
  );
}

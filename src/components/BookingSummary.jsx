"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Headset, PanelBottom, Undo2, Wallet } from "lucide-react";
import DatePicker from "react-datepicker";

export default function BookingSummary({ basePrice = 2999 }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [promo, setPromo] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

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

  return (
    <aside className="w-full bg-white rounded-xl p-6 shadow">
      <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Booking Summary</h3>
      <div className="text-2xl font-bold mb-1">
        ₹{basePrice.toLocaleString()}{" "}
        <span className="text-2xl font-bold text-[#000000]">/ night</span>
      </div>
      <div className="text-xs text-gray-500 mb-4">Includes meals & WiFi</div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-3 mb-3">
  {/* Check-in Date */}
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

  {/* Arrow for desktop only */}
  <div className="hidden md:flex justify-center items-center text-gray-800">
    <ArrowRight size={24} />
  </div>

  {/* Check-out Date */}
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


      <div className="flex flex-col mb-3">
        <label className="text-xs text-gray-600 mb-1">Guests</label>
        <select
          value={guests}
          onChange={(e) => onChange(Number(e.target.value))}
          className="border rounded px-3 py-2 text-sm outline-none"
        >
          {[...Array(6)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} guest{i > 0 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 items-center mb-3">
        <input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Have a promo code?"
          className="flex-1 border rounded px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={applyPromo}
          className="bg-emerald-500 text-white px-3 py-2 rounded text-sm"
        >
          Apply
        </button>
      </div>

      <div className="text-sm text-gray-600 my-8">
        <section className="flex items-center justify-between text-base font-semibold text-[#000000]">
            Total ({nights} night{nights > 1 ? "s" : ""}):{" "}
            <h5 className="text-lg mr-12">₹{total.toLocaleString()}</h5>
        </section>
        <span>Includes taxes and service fees</span>
      </div>
      <div className="w-full flex flex-col justify-center gap-6">
        <button className="bg-[#F1FF51] px-6 py-2 rounded-full cursor-pointer">
            Book Now
        </button>
        <div className="text-[#666666] flex items-center justify-center lg:gap-4 xl:gap-6">
            <section className="flex items-center gap-2">
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

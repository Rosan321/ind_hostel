"use client";

import { useState } from "react";
import {
  Building,
  Phone,
  MessageCircle,
  Mail,
  Headphones,
  Info,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Download,
} from "lucide-react";
import Image from "next/image";

export default function BookingCompleted() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDownloadReceipt = async () => {
    setIsDownloading(true);
    await new Promise((r) => setTimeout(r, 1000));
    alert("Receipt downloaded");
    setIsDownloading(false);
  };

  const handleEmailReceipt = async () => {
    setIsEmailing(true);
    await new Promise((r) => setTimeout(r, 1000));
    const email = prompt("Enter email:");
    if (email) alert(`Receipt sent to ${email}`);
    setIsEmailing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* TOP SUCCESS */}
        <div className="text-center px-4 sm:px-8">
          <CircleCheck className="h-14 w-14 mx-auto stroke-white fill-[#00BFA6] mb-4" />
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold">Booking Confirmed!</h1>
          <p className="text-sm lg:text-base text-[#666666] mt-2">
            Your stay at UrbanNest PG is confirmed. We have emailed & SMSed you
          </p>
          <button className="bg-[#F1FF51] px-6 py-3 rounded-full font-semibold mt-6">
            Go to My Bookings
          </button>
        </div>

        {/* MAIN WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-12">
          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* Property Info */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8">
              <div className="flex items-start gap-4 border-b border-gray-200 pb-6">
                <div className="w-14 h-14 bg-blue-200 rounded-lg flex items-center justify-center">
                  <Building className="text-blue-600 w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1A1A1A] font-bold tracking-wide">UrbanNest PG – Cozy Stay in Bandra</h2>
                  <p className="text-[#666666] text-base">Bandra West, Mumbai - Near Linking Road</p>
                </div>
              </div>

              {/* Booking GRID */}
              <div className="w-1/2 grid grid-cols-1 gap-4 mt-6 border-b border-gray-200">
                {[
                  { label: "Check-in", value: "12 Nov 2025" },
                  { label: "Check-out", value: "15 Nov 2025" },
                  { label: "Nights", value: "3 nights" },
                  { label: "Guests", value: "2 Adults" },
                  { label: "Room type", value: "Single Room" },
                  { label: "Booking ref", value: "IND-2025-24561" }
                ].map((i, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays size={14} className="text-[#00BFA6]" /> {i.label}
                    </span>
                    <ArrowRight size={18} />
                    <span className="font-medium">{i.value}</span>
                  </div>
                ))}
              </div>

              {/* PRICE */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-[#666666]">
                  <span className="text-xs">Price</span>
                  <span className="text-sm">1500 × 3 nights</span>
                  <ArrowRight size={18} />
                  <span className="font-medium text-base">₹4,500</span>
                </div>
                <div className="flex justify-between text-xs text-[#666666]">
                  <span className="text-xs">Taxes & Fees</span>
                  <span className="text-sm font-medium">₹400</span>
                  <ArrowRight size={18} />
                  <span className="text-base font-medium">₹400</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-[#666666] text-base font-semibold">Total</span>
                  <h4 className="text-[#1A1A1A] text-2xl font-bold">₹4,900</h4>
                </div>
                <p className="text-xs text-gray-500">
                  Booking reference: IND-2025-24561 • Paid via Card (visa)
                </p>
              </div>
            </div>

            {/* Host Contact */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg md:text-xl font-bold mb-4">Host Contact & Check-in Info</h3>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Image src="/images/pp1.png" alt="profile" width={35} height={35} className="rounded-xl" />
                    <h4 className="text-sm md:text-base font-bold">Ramesh Kumar</h4>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 border border-[#00BFA6] text-[#00BFA6] px-4 py-2 rounded-lg text-sm lg:text-base">
                      <Phone size={14} /> Call Host
                    </button>
                    <button className="flex items-center gap-2 border border-[#00BFA6] text-[#00BFA6] px-4 py-2 rounded-lg text-sm lg:text-base">
                      <MessageCircle size={14} /> Message Host
                    </button>
                  </div>
                </div>

                <p className="flex items-center gap-3 text-sm text-[#666666]">
                  <CalendarDays size={15} className="text-[#00BFA6]" />
                  Check-in: After 2pm. Show valid ID at reception
                </p>

                <p className="flex items-center gap-3 text-sm text-[#666666]">
                  <Phone size={15} className="text-[#00BFA6]" />
                  24/7 Support: +91 98765 43210
                </p>
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-xl">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 sm:px-6 py-4 w-full flex items-center justify-between"
              >
                <h3 className="font-semibold text-base">Cancellation & Policies</h3>
                <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <div className={`px-4 sm:px-6 text-sm text-gray-600 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-40 pb-5" : "max-h-0"}`}>
                Free cancellation until 48 hours before check-in. After that partial refund excluding service fee.
              </div>
            </div>
          </div>

          {/* RIGHT receipt */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 h-fit">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Receipt</h3>

            <div className="space-y-3 mb-6 font-medium text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="text-[#666666]">Transaction</span>
                <span className="text-base">TXN-452916</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#666666]">Room total</span>
                <span className="text-base">₹4,500</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#666666]">Taxes & Fees</span>
                <span className="text-base">₹400</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#666666]">Discounts</span>
                <span className="text-base">₹300</span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-3 text-sm text-[#666666]">
                <span>Total Paid</span>
                <h4 className="text-xl text-[#1A1A1A] font-bold">₹4,600</h4>
              </div>
            </div>

            <button
              className="w-full bg-[#F1FF51] py-3 rounded-full font-semibold flex items-center justify-center gap-2 mb-3"
              onClick={handleDownloadReceipt}
            >
              <Download size={15} />
              {isDownloading ? "Downloading..." : "Download Receipt"}
            </button>

            <button
              className="w-full text-[#00BFA6] text-sm py-3 flex items-center justify-center gap-2"
              onClick={handleEmailReceipt}
            >
              <Mail size={15} />
              {isEmailing ? "Sending..." : "Email receipt to someone else"}
            </button>

            <div className="flex items-start gap-2 text-sm text-gray-600 mt-6">
              <Info className="text-[#00BFA6] flex-shrink-0" size={18} />
              <p>Need to change dates? Contact support within 24 hours to request modification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

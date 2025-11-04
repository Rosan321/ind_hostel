"use client";

import { useState } from "react";
import {
  CheckCircle,
  Building,
  Receipt,
  User,
  Phone,
  MessageCircle,
  Download,
  Mail,
  Headphones,
  FileText,
  Info,
  CircleCheck,
  MoveRight,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import Image from "next/image";

export default function BookingCompleted() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);

  const handleDownloadReceipt = async () => {
    setIsDownloading(true);
    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Receipt downloaded successfully!");
    setIsDownloading(false);
  };

  const handleEmailReceipt = async () => {
    setIsEmailing(true);
    // Simulate email process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const email = prompt("Enter email address to send receipt:");
    if (email) {
      alert(`Receipt sent to ${email}`);
    }
    setIsEmailing(false);
  };

  const handleContactAction = (action) => {
    alert(`${action} action triggered`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-4">
            <CircleCheck className="h-12 w-12 stroke-white fill-[#00BFA6]" />
          </div>
          <h1 className="text-[#000000] text-2xl sm:text-3xl font-bold mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-[#666666] mb-6">
            Your stay at UrbanNest PG is confirmed. A confirmation email and SMS
            have been sent to you
          </p>
          <button className="bg-[#F1FF51] px-6 py-3 rounded-full font-semibold transition-colors duration-200">
            Go to My Bookings
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-12">
          <div className="px-6 sm:px-8">
            {/* Property Info */}
            <div className="mb-8 bg-white rounded-3xl shadow-sm p-8">
              <div className="flex items-start gap-4 mb-6 border-b-1 border-gray-200 pb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    UrbanNest PG – Cozy Stay in Bandra
                  </h2>
                  <p className="text-gray-600">
                    Bandra West, Mumbai - Near Linking Road
                  </p>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex gap-12 py-2 border-b border-gray-100">
                  <section className="flex items-center gap-3">
                    <CalendarDays size={12} className="text-[#00BFA6]" />
                    <span className="text-[#666666] text-sm">Check-in</span>
                  </section>
                  <ArrowRight size={18} className="text-gray-700" />
                  <span className="text-base">12 Nov 2025</span>
                </div>
                <div className="flex gap-12 py-2 border-b border-gray-100">
                  <section className="flex items-center gap-3">
                    <CalendarDays size={12} className="text-[#00BFA6]" />
                    <span className="text-[#666666] text-sm">Check-out</span>
                  </section>
                  <ArrowRight size={18} className="text-gray-700" />
                  <span className="text-base">15 Nov 2025</span>
                </div>
                <div className="flex gap-12 py-2 border-b border-gray-100">
                  <section className="flex items-center gap-3">
                    <CalendarDays size={12} className="text-[#00BFA6]" />
                    <span className="text-[#666666] text-sm">Nights</span>
                  </section>
                  <ArrowRight size={18} className="text-gray-700" />
                  <span className="text-base">3 nights</span>
                </div>
                <div className="flex gap-12 py-2 border-b border-gray-100">
                  <section className="flex items-center gap-3">
                    <CalendarDays size={12} className="text-[#00BFA6]" />
                    <span className="text-[#666666] text-sm">Guests</span>
                  </section>
                  <ArrowRight size={18} className="text-gray-700" />
                  <span className="text-base">2 Adults</span>
                </div>
                <div className="flex gap-12 py-2 border-b border-gray-100">
                  <section className="flex items-center gap-3">
                    <CalendarDays size={12} className="text-[#00BFA6]" />
                    <span className="text-[#666666] text-sm">Room type</span>
                  </section>
                  <ArrowRight size={18} className="text-gray-700" />
                  <span className="text-base">Single Room</span>
                </div>
                <div className="flex gap-12 py-2 border-b border-gray-100">
                  <section className="flex items-center gap-3">
                    <CalendarDays size={12} className="text-[#00BFA6]" />
                    <span className="text-[#666666] text-sm">Booking ref</span>
                  </section>
                  <ArrowRight size={18} className="text-gray-700" />
                  <span className="text-base">IND-2025-24561</span>
                </div>
              </div>

              {/* Price Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Price</span>
                  <span className="text-[#666666]">1500 × 3 nights</span>
                  <ArrowRight size={18} className="text-[#666666]" />
                  <span className="text-sm font-medium">₹4,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Taxes & Fees</span>
                  <span className="text-[#666666]">₹400</span>
                  <ArrowRight size={18} className="text-[#666666]" />
                  <span>₹400</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 font-semibold text-lg">
                  <span className="text-base text-[#666666]">Total</span>
                  <h4 className="text-[#1A1A1A] text-2xl font-bold">₹4,900</h4>
                </div>
              </div>
              <p className="text-sm text-[#666666] mt-3">
                Booking reference: IND-2025-24561 • Paid via Card (visa)
              </p>
            </div>

            {/* Host Contact */}
            <div className="mb-8 bg-white p-8 rounded-3xl">
              <h3 className="flex items-center gap-2 text-xl font-bold text-[#1A1A1A] mb-4">
                Host Contact & Check-in Info
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center gap-2">
                    <Image
                        src="/images/pp1.png"
                        alt="profile"
                        width={30}
                        height={30}
                        className="rounded-xl"
                    />
                    <h4 className="font-bold text-[#1A1A1A] mb-1">
                        Ramesh Kumar
                    </h4>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleContactAction("Call Host")}
                      className="flex items-center justify-center gap-2 border border-[#00BFA6] px-4 py-2 rounded-lg text-[#00BFA6] cursor-pointer"
                    >
                      <Phone size={15} className="text-[#00BFA6]" />
                      Call Host
                    </button>
                    <button
                      onClick={() => handleContactAction("Message Host")}
                      className="flex items-center justify-center gap-2 border border-[#00BFA6] px-4 py-2 rounded-lg text-[#00BFA6] cursor-pointer"
                    >
                      <MessageCircle size={15} className="text-[#00BFA6]" />
                      Message Host
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                    <section className="flex items-center gap-4">
                        <CalendarDays size={15} className="text-[#00BFA6]" />
                        <p className="text-[#666666]">
                            Check-in: After 2:00 PM. Show valid ID at reception
                        </p>
                  </section>

                  <div className="flex items-center gap-4 mt-4 text-gray-700">
                    <Headphones size={15} className="text-[#00BFA6]" />
                    <p className="text-[#666666]">24/7 Support: +91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                Cancellation & Policies
              </h3>
              <p className="text-gray-600 text-sm">
                Free cancellation until 48 hours before check-in. After that,
                cancel before check-in to get a partial refund, excluding
                service fee.
              </p>
            </div>
          </div>

          {/* Receipt Section */}
          <div className="bg-white h-100 rounded-3xl p-8 mb-8">
            <h3 className="flex items-center gap-2 text-2xl font-bold text-[#1A1A1A] mb-2 sm:mb-4">
              Receipt
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between border-b-1 border-gray-200 pb-4">
                <span className="text-sm font-medium text-[#666666]">
                  Transaction
                </span>
                <span className="text-sm font-medium">ID TXN-452916</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-[#666666]">
                  Room total
                </span>
                <span className="text-sm font-medium">₹4,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-[#666666]">
                  Taxes & Fees
                </span>
                <span className="text-sm font-medium">₹400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-[#666666]">
                  Discounts
                </span>
                <span className="text-green-600">-₹300</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-3 font-semibold text-lg">
                <span className="text-sm font-medium text-[#666666]">
                  Total Paid
                </span>
                <h5 className="text-[#1A1A1A] text-xl font-bold">₹4,600</h5>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleDownloadReceipt}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 bg-[#F1FF51] px-4 py-3 rounded-full font-semibold"
              >
                <Download className="h-4 w-4" />
                {isDownloading ? "Downloading..." : "Download Receipt"}
              </button>
              <button
                onClick={handleEmailReceipt}
                disabled={isEmailing}
                className="flex items-center mx-auto gap-2 px-4 py-3 font-medium text-sm text-[#00BFA6] cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                {isEmailing ? "Sending..." : "Email receipt to someone else"}
              </button>
            </div>

            {/* Support Info */}
            <div className="p-4 mb-8">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#00BFA6] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#1A1A1A] mb-3">
                    Need to change dates? Contact support within 24 hours to
                    request modification
                  </p>
                  <button
                    onClick={() => handleContactAction("Contact Support")}
                    className="flex items-center mx-auto gap-2 font-medium text-sm text-[#00BFA6] cursor-pointer border-b-1 border-gray-400"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 text-center">
        <p className="text-gray-600 text-sm">
          UrbanNest PG © 2025. All rights reserved.
        </p>
      </div>
    </div>
  );
}

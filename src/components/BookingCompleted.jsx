"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  MessageCircle,
  Info,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Download,
} from "lucide-react";
import Link from "next/link";
import RevealOnScroll from "./animations/RevealOnScroll";
import { formattedDate } from "@/lib/utils/fromattedDate";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";
import { toast } from "react-toastify";

export default function BookingCompleted({ bookingData }) {
  // console.log(bookingData);
  const [isDownloading, setIsDownloading] = useState(false);
  // const [isEmailing, setIsEmailing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // This ensures code only runs on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadReceipt = async (id) => {
    // console.log(id);
    // Double-check we're on client side
    if (!isClient) {
      toast.error("Please refresh and try again");
      return;
    }

    if (!id) {
      toast.error("No booking ID found");
      return;
    }

    setIsDownloading(true);

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
      setIsDownloading(false);
    }
  };

  // const handleEmailReceipt = async () => {
  //   setIsEmailing(true);
  //   await new Promise((r) => setTimeout(r, 1000));
  //   const email = prompt("Enter email:");
  //   if (email) alert(`Receipt sent to ${email}`);
  //   setIsEmailing(false);
  // };

  // const price = parseFloat(
  //   String(bookingData?.room_price || "0").replace(/,/g, "")
  // );

  // Extract number from "1 day" / "3 days"
  // const days = parseInt(
  //   String(bookingData?.days || "0").replace(/\D/g, "") // remove all non-numbers
  // );

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* TOP SUCCESS */}
        <RevealOnScroll delay={0.1}>
          <div className="text-center px-4 sm:px-8">
            <CircleCheck className="h-14 w-14 mx-auto stroke-white fill-[#44475A] mb-4" />

            <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold">
              Booking Confirmed!
            </h1>

            <p className="text-sm lg:text-base text-[#666666] mt-2">
              {`Your stay at ${bookingData?.accommodationId?.property_name} is confirmed. Enjoy with our services.`}
            </p>

            <Link href="/user_dashboard/bookings">
              <div className="bg-[#0D0BA8] hover:bg-[#2A32FF] text-[#FFF] px-6 py-3 rounded-full font-semibold mt-6 inline-block">
                Go to My Bookings
              </div>
            </Link>
          </div>
        </RevealOnScroll>

        {/* MAIN WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] xl:grid-cols-[2fr_1fr] gap-8 mt-12">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Property Info */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8">
              <RevealOnScroll delay={0.2}>
                <div className="flex items-start gap-4 border-b border-gray-200 pb-6">
                  <div className="w-32 h-24 bg-blue-200 rounded-lg flex items-center justify-center">
                    <img
                      src={`${bookingData?.accommodationId?.images_url?.[0]}`}
                      alt="booked"
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg text-[#1A1A1A] font-bold tracking-wide">
                      {`${bookingData?.accommodationId?.property_name} at ${
                        bookingData?.accommodationId?.location?.area
                          ?.charAt(0)
                          .toUpperCase() +
                        bookingData?.accommodationId?.location?.area
                          ?.slice(1)
                          .toLowerCase()
                      }`}
                    </h2>
                    <p className="text-[#666666] text-base">
                      {bookingData?.accommodationId?.location?.address
                        ?.charAt(0)
                        .toUpperCase() +
                        bookingData?.accommodationId?.location?.address
                          ?.slice(1)
                          .toLowerCase()}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Booking GRID */}
              <RevealOnScroll delay={0.2}>
                <div className="lg:w-1/2 grid grid-cols-1 lg:gap-4 mt-6 border-b border-gray-200">
                  {[
                    {
                      label: "Check-in",
                      value: `${formattedDate(
                        bookingData?.guestdetails?.stayinfo?.check_in
                      )}`,
                    },
                    {
                      label: "Check-out",
                      value: `${formattedDate(
                        bookingData?.guestdetails?.stayinfo?.check_out
                      )}`,
                    },
                    // { label: "Nights", value: "3 nights" },
                    { label: "Guests", value: `${bookingData?.guests}` },
                    {
                      label: "Room type",
                      value: bookingData?.roomtype
                        ? bookingData.roomtype.charAt(0).toUpperCase() +
                          bookingData.roomtype.slice(1)
                        : "",
                    },
                    // { label: "Booking ref", value: "IND-2025-24561" },
                  ].map((i, idx) => (
                    <div
                      key={idx}
                      className="flex flex-row sm:items-center justify-between gap-2 pb-2"
                    >
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays size={14} className="text-[#00BFA6]" />{" "}
                        {i.label}
                      </span>
                      <ArrowRight size={18} />
                      <span className="text-sm md:text-base font-medium">
                        {i.value}
                      </span>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>

              {/* PRICE */}
              <div className="mt-6 space-y-3">
                <RevealOnScroll delay={0.2}>
                  <div className="flex justify-between text-[#666666]">
                    <span className="text-xs">Price</span>

                    {/* Quantity Display */}
                    <span className="text-sm">
                      {bookingData?.price_type === "per day"
                        ? `${bookingData?.room_price} × ${bookingData?.days}`
                        : `${bookingData?.room_price} × ${bookingData?.price_type}`}
                    </span>

                    <ArrowRight size={18} />

                    {/* Final Price */}
                    <span className="font-medium text-base">
                      {(() => {
                        const roomPrice = parseFloat(
                          String(bookingData?.room_price).replace(/,/g, "")
                        );

                        if (bookingData?.price_type === "per day") {
                          const days = parseInt(
                            String(bookingData?.days).replace(/\D/g, "")
                          );
                          return (roomPrice * days).toLocaleString("en-IN");
                        } else {
                          return roomPrice.toLocaleString("en-IN");
                        }
                      })()}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-[#666666]">
                    <span className="text-xs">Taxes & Fees</span>
                    <span className="text-sm font-medium">{`${bookingData?.paymentid?.tax}`}</span>
                    <ArrowRight size={18} />
                    <span className="text-base font-medium">{`${bookingData?.paymentid?.tax}`}</span>
                  </div>
                  {bookingData?.discountamount && (
                    <div className="flex justify-between text-xs text-[#666666] mb-2">
                      <span className="text-xs">Discount Applied</span>
                      <span className="text-base font-medium -ml-2">{`${bookingData?.discountamount}`}</span>
                      <ArrowRight size={18} />
                      <span className="text-base font-medium">{`-${bookingData?.discountamount}`}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-[#666666] text-base font-semibold">
                      Total
                    </span>
                    <h4 className="text-[#1A1A1A] text-xl lg:text-2xl mb-4 md:mb-0 font-bold">
                      ₹
                      {(() => {
                        const roomPrice =
                          parseFloat(
                            String(bookingData?.room_price).replace(/,/g, "")
                          ) || 0;

                        const tax =
                          typeof bookingData?.paymentid?.tax === "number"
                            ? bookingData.paymentid.tax
                            : 0;

                        const discount =
                          typeof bookingData?.discountamount === "number"
                            ? bookingData.discountamount
                            : 0;

                        let total = 0;

                        if (bookingData?.price_type === "per day") {
                          const days =
                            parseInt(
                              String(bookingData?.days).replace(/\D/g, ""),
                              10
                            ) || 0;

                          total = roomPrice * days + tax;
                        } else {
                          total = roomPrice + tax;
                        }

                        return Math.max(total - discount, 0).toLocaleString(
                          "en-IN"
                        );
                      })()}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500">
                    Booking reference: IND-2025-24561 • Paid via Card (visa)
                  </p>
                </RevealOnScroll>
              </div>
            </div>

            {/* Host Contact */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8">
              <RevealOnScroll delay={0.2}>
                <h3 className="text-lg md:text-xl font-bold mb-4">
                  Host Contact & Check-in Info
                </h3>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <img
                        src="/images/pp1.png"
                        alt="profile"
                        className="rounded-xl w-12 h-12"
                      />
                      <h4 className="text-sm md:text-base font-bold">
                        {bookingData?.accommodationId?.host_details?.host_name}
                      </h4>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 border border-[#D0D0D0] text-[#44475A] px-4 py-2 rounded-lg text-sm lg:text-base">
                        <Phone size={14} /> Call Host
                      </button>
                      <button className="flex items-center gap-2 border border-[#D0D0D0] text-[#44475A] px-4 py-2 rounded-lg text-sm lg:text-base">
                        <MessageCircle size={14} /> Message Host
                      </button>
                    </div>
                  </div>

                  <p className="flex items-center gap-3 text-sm text-[#666666]">
                    <CalendarDays size={15} className="text-[#44475A]" />
                    Check-in: {bookingData?.accommodationId?.check_in_time}.
                    Show valid ID at reception
                  </p>

                  <p className="flex items-center gap-3 text-sm text-[#666666]">
                    <Phone size={15} className="text-[#44475A]" />
                    24/7 Support: +91{" "}
                    {bookingData?.accommodationId?.host_details?.host_contact}
                  </p>
                </div>
              </RevealOnScroll>
            </div>

            {/* Policies */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-white rounded-xl">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-4 sm:px-6 py-4 w-full flex items-center justify-between"
                >
                  <h3 className="font-semibold text-base">
                    Cancellation & Policies
                  </h3>
                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`px-4 sm:px-6 text-sm text-gray-600 transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  {`Free cancellation ${bookingData?.accommodationId?.cancellation_policy} check-in. After that
                  partial refund excluding service fee.`}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* RIGHT receipt */}
          <RevealOnScroll delay={0.2}>
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 h-fit">
              <h3 className="text-xl sm:text-2xl text-[#1A1A1A] font-bold mb-6">
                Receipt
              </h3>

              <div className="space-y-3 mb-6 font-medium text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="text-[#666666]">Invoice</span>
                  <span className="text-base">{`${bookingData?.paymentid?.invoice}`}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#666666]">Room total</span>
                  <span className="text-base">{bookingData?.room_price}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#666666]">Taxes & Fees</span>
                  <span className="text-base">{`${bookingData?.paymentid?.tax}`}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#666666]">Discounts</span>
                  <span className="text-base">
                    - {`${bookingData?.discountamount}`}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-3 text-sm text-[#666666]">
                  <span>Total Paid</span>
                  <h4 className="text-xl lg:text-2xl text-[#1A1A1A] font-bold">
                    ₹{`${bookingData?.bookingamount}`}
                  </h4>
                </div>
              </div>

              <button
                className="w-full bg-[#0D0BA8] hover:bg-[#2A32FF] text-[#FFF] py-3 rounded-full font-semibold flex items-center justify-center gap-2 mb-3 cursor-pointer"
                onClick={() => handleDownloadReceipt(bookingData?.bookingId)}
                disabled={isDownloading}
              >
                <Download size={15} />
                {isDownloading ? "Downloading..." : "Download Receipt"}
              </button>

              {/* <button
                className="w-full text-[#0D0BA8] hover:text-[#2A32FF] text-sm py-3 flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleEmailReceipt}
              >
                <Mail size={15} />
                {isEmailing ? "Sending..." : "Email receipt to someone else"}
              </button> */}

              <div className="flex items-start gap-1 text-sm text-gray-600 mt-6 bg-[#0D0BA814] rounded-lg p-4">
                <Info className="text-[#44475A] flex-shrink-0" size={18} />
                <section className="text-center space-y-4">
                  <p className="text-[#1A1A1A]">
                    {`Need to change dates ? Contact support ${bookingData?.accommodationId?.cancellation_policy} to
                  request modification`}
                  </p>
                  <p className="underline font-medium">Contact Support</p>
                </section>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}

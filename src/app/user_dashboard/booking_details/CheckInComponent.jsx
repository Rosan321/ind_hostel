import { Clock, FileText, Key, MapPin, MessageSquareText } from "lucide-react";
import Image from "next/image";
import React from "react";

const CheckInComponent = ({ bookDataDetails }) => {
  return (
    <div className="w-full mx-auto space-y-8">
      {/* Main Check-In Info Card */}
      <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6">
        <h2 className="text-2xl font-semibold">Check-In Information</h2>
        <p className="text-sm md:text-base text-[#666666] mt-1">
          Everything you need to know before you arrive at the property
        </p>

        <div className="mt-5 space-y-2 md:space-y-4">
          {/* Check in time */}
          <div className="flex gap-3 items-start">
            <Clock className="text-gray-500 h-4 md:h-5 w-4 md:w-5 mt-1" />
            <p className="text-gray-700 text-[15px]">
              <span className="font-medium">Check-In Time: </span>
              <span className="text-[#0D0BA8] font-semibold">
                {bookDataDetails?.accommodationId?.check_in_time ||
                  "After 2:00 PM"}
              </span>
            </p>
          </div>

          {/* Check out time */}
          <div className="flex gap-3 items-start">
            <Clock className="text-gray-500 h-4 md:h-5 w-4 md:w-5 mt-1" />
            <p className="text-gray-700 text-[15px]">
              <span className="font-medium">Check-Out Time: </span>
              <span className="text-[#0D0BA8] font-semibold">
                {bookDataDetails?.accommodationId?.check_out_time ||
                  "Before 12:00 PM"}
              </span>
            </p>
          </div>

          {/* Required documents */}
          <div className="flex gap-3 items-start">
            <FileText className="text-gray-500 h-4 md:h-5 w-4 md:w-5 mt-1" />
            <div>
              <p className="text-gray-700 text-[15px]">
                <span className="font-medium">Required Documents:</span> Aadhaar
                card / Passport / Government ID
              </p>
              <p className="text-sm text-gray-400">
                All guests must present valid ID at check-in
              </p>
            </div>
          </div>

          {/* Check-in method */}
          <div className="flex gap-3 items-start">
            <Key className="text-gray-500 h-4 md:h-5 w-4 md:w-5 mt-1" />
            <p className="text-gray-700 text-[15px]">
              <span className="font-medium">Check-In Method:</span> Reception
              Desk at Ground Floor
            </p>
          </div>

          {/* Address - Fixed the div inside p issue */}
          <div className="flex gap-3 items-start">
            <MapPin className="text-gray-500 h-4 md:h-5 w-4 md:w-5 mt-1" />
            <div>
              <p className="text-gray-700 text-[15px] font-medium mb-1">
                Address:
              </p>
              <div className="text-gray-700 text-[15px] flex flex-col gap-1">
                <span>
                  {bookDataDetails?.accommodationId?.location?.address ||
                    "Address not specified"}
                </span>
                <span>
                  {bookDataDetails?.accommodationId?.location?.area ||
                    "Area not specified"}
                  ,
                </span>
                <span>
                  {bookDataDetails?.accommodationId?.location?.city
                    ? bookDataDetails?.accommodationId?.location?.city
                        .slice(0, 1)
                        .toUpperCase() +
                      bookDataDetails?.accommodationId?.location?.city.slice(1)
                    : "City not specified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {/* Host Info Card */}
        <div className="flex flex-col md:flex-row gap-6 sm:items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {bookDataDetails?.accommodationId?.host_details?.host_photo ? (
                <Image
                  src={bookDataDetails.accommodationId.host_details.host_photo}
                  alt="host"
                  width={55}
                  height={55}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {bookDataDetails?.accommodationId?.host_details?.host_name?.[0]?.toUpperCase() ||
                      "H"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {bookDataDetails?.accommodationId?.host_details?.host_name
                  ? bookDataDetails.accommodationId.host_details.host_name
                      .slice(0, 1)
                      .toUpperCase() +
                    bookDataDetails.accommodationId.host_details.host_name.slice(
                      1
                    )
                  : "Host Name"}
              </h3>
              {/* <p className="text-gray-500 text-sm">
                Property Manager & Verified Host
              </p> */}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            {bookDataDetails?.accommodationId?.host_details?.host_contact ? (
              <>
                <a
                  href={`sms:${bookDataDetails.accommodationId.host_details.host_contact}`}
                  className="bg-[#0D0BA8] text-white rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer"
                >
                  Message Host
                </a>

                <a
                  href={`tel:${bookDataDetails.accommodationId.host_details.host_contact}`}
                  className="border border-[#0D0BA8] text-[#0D0BA8] rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-50 transition cursor-pointer"
                >
                  Call Host
                </a>
              </>
            ) : (
              <p className="text-gray-500 text-sm">
                Contact information not available
              </p>
            )}
          </div>
        </div>

        {/* Support Section */}
        {/* <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span role="img" aria-label="headphone">
              🎧
            </span>{" "}
            Need Additional Help?
          </h3>

          <p className="text-gray-600 mt-1 text-[15px] leading-relaxed">
            Our IndHostel support team is available 24/7 for urgent assistance,
            booking changes, or safety concerns
          </p>

          <button className="mt-3 bg-[#0D0BA8] text-white px-6 py-2 rounded-xl font-medium transition cursor-pointer flex items-center gap-4">
            <MessageSquareText size={18} />
            Chat with Support
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CheckInComponent;

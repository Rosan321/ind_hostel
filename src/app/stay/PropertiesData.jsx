import { CircleCheck, Phone } from "lucide-react";
import React from "react";

const PropertiesData = ({ data }) => {
  return (
    <section className="space-y-5">
      {/* Property Type */}
      <div className="flex items-start">
        <div className="flex items-start gap-2 w-34 sm:w-40">
          <CircleCheck size={24} stroke="white" fill="#44475A" />
          <p className="text-[#1A1A1A] font-medium sm:font-semibold text-sm sm:text-base">
            Property Type:
          </p>
        </div>

        <div className="flex-1 text-[#666666] text-sm">
          {data?.property_type
            ? data.property_type?.charAt(0).toUpperCase() +
              data.property_type?.slice(1)
            : ""}
        </div>
      </div>

      {/* Room Types */}
      <div className="flex items-start">
        <div className="flex items-start gap-2 w-34 sm:w-40">
          <CircleCheck size={24} stroke="white" fill="#44475A" />
          <p className="text-[#1A1A1A] font-medium sm:font-semibold text-sm sm:text-base">
            Room Types:
          </p>
        </div>

        <div className="flex flex-wrap gap-2 flex-1">
          {data?.room_types?.map((room, i) => (
            <span
              key={i}
              className="border border-[#D0D0D0] text-[#666] text-xs sm:text-sm font-medium rounded-full px-3 py-1"
            >
              {room.charAt(0).toUpperCase() + room.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Check-in Time */}
      <div className="flex items-start">
        <div className="flex items-start gap-2 w-34 sm:w-40">
          <CircleCheck size={24} stroke="white" fill="#44475A" />
          <p className="text-[#1A1A1A] font-medium sm:font-semibold text-sm sm:text-base">
            Check-in Time:
          </p>
        </div>

        <div className="flex-1 text-[#666] text-sm">
          <div className="flex flex-col md:flex-row gap-2">
            <span>{data?.check_in_time}</span>
            <span className="text-xs text-[#888]">
              Early check-in on request
            </span>
          </div>
        </div>
      </div>

      {/* Cancellation */}
      <div className="flex items-start">
        <div className="flex items-start gap-2 w-34 sm:w-40">
          <CircleCheck size={24} stroke="white" fill="#44475A" />
          <p className="text-[#1A1A1A] font-medium sm:font-semibold text-sm sm:text-base">
            Cancellation:
          </p>
        </div>

        <div className="flex-1 text-[#666] text-sm">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <span>{data?.cancellation_policy}</span>
            <button className="text-[#2A32FF] underline text-sm">
              View policy
            </button>
          </div>
        </div>
      </div>

      {/* Max Guests */}
      <div className="flex items-start">
        <div className="flex items-start gap-2 w-34 sm:w-40">
          <CircleCheck size={24} stroke="white" fill="#44475A" />
          <p className="text-[#1A1A1A] font-medium sm:font-semibold text-sm sm:text-base">
            Max Guests:
          </p>
        </div>

        <div className="flex-1 text-[#666] text-sm">
          {data?.room_id?.[0]?.no_of_guests}
        </div>
      </div>

      {/* Host Contact */}
      <div className="flex items-center">
        <div className="flex items-start gap-2 w-34 sm:w-40">
          <CircleCheck size={24} stroke="white" fill="#44475A" />
          <p className="text-[#1A1A1A] font-medium sm:font-semibold text-sm sm:text-base">
            Host Contact:
          </p>
        </div>
        <div className="flex-1 text-[#666] text-sm">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-1">
              <span>{data?.host_details?.host_name?.charAt(0).toUpperCase() + data?.host_details?.host_name?.slice(1)}</span>
              <span className="text-xs">
                (Contact available on booking page)
              </span>
            </div>

            {/* <button className="flex items-center gap-1 text-[#666] text-sm">
              <Phone size={18} />
              Message Host
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesData;

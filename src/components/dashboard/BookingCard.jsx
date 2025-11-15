export default function BookingCard() {
  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden my-8 sm:my-16">
      <div className="flex flex-col">
        {/* Image Section */}
        <div className="w-full h-[200px] sm:h-[240px] md:h-[269px] overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Room"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 flex flex-col xl:flex-row justify-between gap-6 xl:gap-24">
          {/* Left Content */}
          <div className="w-full lg:w-2/3">
            {/* Header Section */}
            <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2 mb-2">
                  Sunrise PG – Indore
                </h3>
                <p className="text-[#666666] text-sm sm:text-base flex items-center gap-1">
                  56 Patel Nagar, near AB Road, Indore
                </p>
              </div>
              <p className="bg-[#F1FF51] text-[#1A1A1A] px-3 py-1 text-sm rounded-lg w-fit sm:w-auto">
                Ongoing
              </p>
            </section>

            {/* Booking Details */}
            <div className="mt-4 text-sm text-[#1A1A1A] space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8">
                <div className="flex flex gap-4 sm:gap-24 sm:pr-44 lg:pr-4 sm:border-r border-gray-300">
                  <section className="flex items-center gap-2">
                    <span>
                      <p className="text-[#666666]">Check-in</p>
                      <p className="font-medium">Nov 2, 2025</p>
                    </span>
                  </section>
                  <section className="flex items-center gap-2">
                    <span>
                      <p className="text-[#666666]">Check-out</p>
                      <p className="font-medium">Nov 29, 2025</p>
                    </span>
                  </section>
                </div>
                <span>
                  <p className="text-[#666666]">Room Type</p>
                  <p className="font-medium">Deluxe Shared</p>
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <p className="text-sm text-[#666666] mt-4">
              Your current stay includes daily meals, free Wi-Fi, and laundry
              service
            </p>
          </div>

          {/* Right Content - Buttons */}
          <div className="flex flex-col justify-center gap-4 w-full lg:w-1/3">
            <button className="bg-[#0D0BA8] text-white text-sm sm:text-base font-semibold px-4 py-2 sm:py-3 rounded-full hover:bg-white hover:text-[#0D0BA8] hover:border-1 hover:border-[#0D0BA8] w-full sm:w-2/3 lg:w-full xl:w-2/3 mx-auto cursor-pointer transition-colors duration-200">
              View Details
            </button>
            <button className="border border-[#0D0BA8] text-[#0D0BA8] text-sm sm:text-base font-semibold px-4 py-2 sm:py-3 rounded-full hover:bg-[#0D0BA8] hover:text-white w-full sm:w-2/3 lg:w-full xl:w-2/3 mx-auto cursor-pointer transition-colors duration-200">
              Contact Hostel
            </button>
            <p className="mx-auto text-[#666666] text-sm cursor-pointer hover:text-[#0D0BA8] transition-colors duration-200">
              Report an Issue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
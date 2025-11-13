export default function BookingCard() {
  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden mt-6 mb-16">
      <div className="flex flex-col">
        <div className="w-full h-[269px] overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Room"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex justify-between flex-1 gap-24">
          <div className="w-full">
            <section className="flex items-center justify-between">
              <span>
                <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2 mb-2">
                  Sunrise PG – Indore
                </h3>
                <p className="text-[#666666] text-base flex items-center gap-1">
                  56 Patel Nagar, near AB Road, Indore
                </p>
              </span>
              <p className="bg-[#F1FF51] text-[#1A1A1A] px-3 py-1 text-sm rounded-lg">
                Ongoing
              </p>
            </section>
            <div className="mt-4 text-sm text-[#1A1A1A] space-y-4 flex justify-between">
              <div className="flex items-center gap-24 pr-44 border-r border-gray-300">
                <section className="flex items-center gap-2">
                  <span>
                    <p className="text-[#666666]">Check-in</p>
                    <p>Nov 2, 2025</p>
                  </span>
                </section>
                <section className="flex items-center gap-2">
                  <span>
                    <p className="text-[#666666]">Check-out</p>
                    <p>Nov 29, 2025</p>
                  </span>
                </section>
              </div>
              <span>
                <p className="text-[#666666]">Room Type</p>
                <p>Deluxe Shared</p>
              </span>
            </div>
            <p className="text-sm text-[#666666]">
              Your current stay includes daily meals, free Wi-Fi, and laundry
              service
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 mt-4 w-1/3">
            <button className="bg-[#0D0BA8] text-white font-semibold px-2 py-3 rounded-full hover:bg-[#1d1bb5] w-2/3 mx-auto cursor-pointer">
              View Details
            </button>
            <button className="border border-[#0D0BA8] text-[#0D0BA8] font-semibold px-2 py-3 rounded-full hover:bg-indigo-50 w-2/3 mx-auto cursor-pointer">
              Contact Hostel
            </button>
            <p className="mx-auto text-[#666666]">Report an Issue</p>
          </div>
        </div>
      </div>
    </div>
  );
}

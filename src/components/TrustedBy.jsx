"use client";

export default function TrustedBy() {
  return (
    <section className="w-full bg-[#111111] text-white px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 leading-tight">
          Trusted by guests & recognized by the media
        </h2>
        <p className="text-gray-300 text-sm sm:text-base mb-8 lg:mb-12 max-w-3xl">
          Press coverage, awards and verification partners that back our promise
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_auto] gap-8 lg:gap-12">
          {/* LEFT - Verification Process */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6">
              Our Verification Process
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-[#FFFFFF] text-base sm:text-lg font-semibold">
              <li className="flex gap-3 items-start">
                <span className="text-[#F1FF51] flex-shrink-0 mt-1">»</span>
                <span>
                  Host identity verification — ID & ownership documents checked
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#F1FF51] flex-shrink-0 mt-1">»</span>
                <span>
                  Photo & amenity verification — listed amenities checked &
                  confirmed
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#F1FF51] flex-shrink-0 mt-1">»</span>
                <span>
                  Ongoing quality checks — periodic audits & guest feedback
                  monitoring
                </span>
              </li>
            </ul>
          </div>

          {/* RIGHT - Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 items-start">
            <StatBox number="4,500+" label="Verified hosts" />
            <StatBox number="120" label="Cities covered" />
            <StatBox
              number="4.7 ★"
              label="Average rating"
              className="col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1 justify-self-center md:justify-self-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBox({ number, label, className = "" }) {
  return (
    <div
      className={`bg-white text-black py-4 sm:py-6 px-4 sm:px-6 lg:px-8 rounded-xl sm:rounded-2xl text-center flex flex-col items-center justify-center w-full min-w-[140px] transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
    >
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
        {number}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 font-medium">{label}</p>
    </div>
  );
}

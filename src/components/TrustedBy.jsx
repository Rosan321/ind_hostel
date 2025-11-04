"use client";

export default function TrustedBy() {
  return (
    <section className="w-full bg-[#111111] text-white px-4 lg:px-20 py-20">
      <h2 className="text-3xl md:text-5xl font-semibold mb-4">
        Trusted by guests & recognized by the media
      </h2>
      <p className="text-gray-300 text-sm mb-8">
        Press coverage, awards and verification partners that back our promise
      </p>
      <div className="mx-auto grid md:grid-cols-[1fr_auto] gap-6">
        {/* LEFT */}
        <div>
          <h4 className="font-bold text-2xl mb-4">
            Our Verification Process
          </h4>

          <ul className="space-y-3 text-[#FFFFFF] text-base font-semibold">
            <li className="flex gap-3">
              <span className="text-[#F1FF51]">»</span> Host identity
              verification — ID & ownership documents checked
            </li>
            <li className="flex gap-3">
              <span className="text-[#F1FF51]">»</span> Photo & amenity
              verification — listed amenities checked & confirmed
            </li>
            <li className="flex gap-3">
              <span className="text-[#F1FF51]">»</span> Ongoing quality checks —
              periodic audits & guest feedback monitoring
            </li>
          </ul>
        </div>

        {/* RIGHT STATS */}
        <div className="flex items-center gap-6">
          <StatBox number="4,500+" label="Verified hosts" />
          <StatBox number="120" label="Cities covered" />
          <StatBox number="4.7 ★" label="Average rating" />
        </div>
      </div>
    </section>
  );
}

function StatBox({ number, label }) {
  return (
    <div className="bg-white text-black py-6 px-8 rounded-2xl text-center flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-1">{number}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

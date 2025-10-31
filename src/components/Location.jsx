"use client"

const Location = () => {
  <div className="bg-white rounded-xl p-6 shadow mt-6">
    <h3 className="text-lg font-semibold mb-6">Find Us Easily</h3>

    <p className="text-gray-600 mb-6">
      We're located in the heart of the city — close to public transport,
      eateries, and shopping streets
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Map Area */}
      <div className="space-y-6">
        {/* Location Map Placeholder */}
        <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-semibold mb-2">MADHAPUR</div>
            <div className="text-sm">Hyderabad</div>
          </div>
        </div>

        {/* Transportation Routes */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="w-12 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium">
              163
            </div>
            <span>Katedhan</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["SaaS", "Boots", "SaaS", "SaaS", "SaaS"].map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm mt-4">
            <div className="w-12 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium">
              164
            </div>
            <span>Ghatkesar</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Vanasthalipuram", "Visk", "Visk", "Visk"].map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Location Details */}
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Our Location</h4>
          <p className="text-gray-600 text-sm">
            UrbanNest PG, Linking Road, Bandra West, Mumbai - 400050
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Nearby Essentials</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Hill Road Market</span>
              <span className="text-gray-500">500 m</span>
            </div>
            <div className="flex justify-between">
              <span>Starbucks</span>
              <span className="text-gray-500">300 m</span>
            </div>
            <div className="flex justify-between">
              <span>Lilavati Hospital</span>
              <span className="text-gray-500">2.1 km</span>
            </div>
            <div className="flex justify-between">
              <span>NM College</span>
              <span className="text-gray-500">3.0 km</span>
            </div>
            <div className="flex justify-between">
              <span>Bandra Station</span>
              <span className="text-gray-500">1.2 km</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-[#00BFA6] text-white py-3 rounded-lg font-medium hover:bg-[#00a892] transition-colors">
          View on Google Maps →
        </button>
      </div>
    </div>
  </div>;
};

export default Location;

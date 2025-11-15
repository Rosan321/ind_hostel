const LOCATIONS = [
  "MADHAPUR Hyderabad - 163",
  "Narsingi - 163",
  "Katedhan - 163",
  "Vanasthalipuram - 163",
];

export default function MapSection() {
  return (
    <div>
      {/* Map Placeholder */}
      <div className="bg-gray-200 rounded-xl h-64 mb-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🗺️</div>
          <p>Interactive Map</p>
          <p className="text-sm">Location: Madhapur, Hyderabad</p>
        </div>
      </div>

      {/* Nearby Locations */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Nearby Areas</h4>
        <div className="space-y-3">
          {LOCATIONS.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-gray-700">{location}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

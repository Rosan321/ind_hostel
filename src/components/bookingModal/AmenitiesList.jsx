const AMENITIES = [
  { name: "WiFi", icon: "📶" },
  { name: "Common kitchen", icon: "🍳" },
  { name: "Lockers", icon: "🔒" },
  { name: "Daily housekeeping", icon: "🧹" },
  { name: "Breakfast included", icon: "🍽️" },
  { name: "Laundry", icon: "👕" },
];

export default function AmenitiesList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {AMENITIES.map((amenity, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
        >
          <span className="text-xl">{amenity.icon}</span>
          <span className="text-gray-700">{amenity.name}</span>
        </div>
      ))}
    </div>
  );
}

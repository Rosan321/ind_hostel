import TabNavigation from "./TabNavigation";
import AmenitiesList from "./AmenitiesList";
import ReviewsList from "./ReviewsList";
import MapSection from "./MapSection";

export default function RoomDetails({ activeTab, setActiveTab }) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              Affordable bed in a 6-bed dorm with lockers and common kitchen.
              Great for short stays. Affordable bed in a 6-bed dorm with lockers
              and common kitchen. Great for short stays.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-gray-600">2 Guests</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-gray-600">Free Wi-Fi</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-gray-600">Breakfast included</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-gray-600">Laundry</span>
              </div>
            </div>
          </div>
        );

      case "amenities":
        return <AmenitiesList />;

      case "reviews":
        return <ReviewsList />;

      case "map":
        return <MapSection />;

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="min-h-[250px]">{renderTabContent()}</div>
    </div>
  );
}

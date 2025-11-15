const TABS = [
  { id: "overview", label: "Overview" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "map", label: "Map" },
];

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200 mb-3 lg:mb-6">
      <nav className="flex space-x-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

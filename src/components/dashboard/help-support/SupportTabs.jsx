"use client";

export default function SupportTabs({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "booking",
      label: "Booking Issue",
      desc: "Problems with booking confirmation or changes",
    },
    {
      id: "payment",
      label: "Payment Help",
      desc: "Transaction, refund, or billing queries",
    },
    {
      id: "room",
      label: "Room Issue",
      desc: "Report maintenance or cleanliness issues",
    },
    {
      id: "general",
      label: "General Question",
      desc: "Ask about facilities, rules, or new stays",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`w-full px-6 py-4 rounded-xl border transition cursor-pointer ${
            activeTab === tab.id
              ? "bg-[#0D0BA8] text-white border-blue-700"
              : "bg-white text-gray-700 border-gray-300 hover:bg-[#0D0BA8] hover:text-white"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          <p className="font-semibold">{tab.label}</p>
          <p
            className={`text-sm ${
              activeTab === tab.id ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {tab.desc}
          </p>
        </button>
      ))}
    </div>
  );
}

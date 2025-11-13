import { Bell, UtensilsCrossed, Wifi, BrushCleaning } from "lucide-react";

export default function AnnouncementsCard() {
  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full md:w-1/3 mb-16 flex flex-col">
      <h3 className="text-lg font-bold mb-4 flex justify-center items-center gap-2 border-b-2 border-gray-200 pb-4">
        Hostel Updates & Announcements
      </h3>
      <ul className="text-base text-[#666666] space-y-4">
        <li className="flex items-center gap-2"><BrushCleaning className="w-4 h-4 text-[#44475A]" /> Room cleaning schedule updated – 7 AM daily</li>
        <li className="flex items-center gap-2"><Wifi className="w-4 h-4 text-[#44475A]" /> Free Wi-Fi maintenance tonight (11 PM – 1 AM)</li>
        <li className="flex items-center gap-2"><UtensilsCrossed className="w-4 h-4 text-[#44475A]" /> New meal options available this week</li>
      </ul>
      <button className="mt-4 bg-[#0D0BA8] text-white w-2/3 mx-auto py-2 rounded-full hover:bg-[#1715b1] cursor-pointer">
        View All Announcements
      </button>
    </div>
  );
}

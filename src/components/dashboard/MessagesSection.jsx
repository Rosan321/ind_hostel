import { MessagesSquare } from "lucide-react";

export default function MessagesSection() {
  const messages = [
    {
      profile: "images/pp.png",
      sender: "Hostel Admin – Sunrise PG",
      text: "Your laundry request has been approved",
      time: "2h ago",
    },
    {
      profile: "images/pp1.png",
      sender: "Sunrise PG Manager",
      text: "Your check-out confirmation is ready",
      time: "24h ago",
    },
    {
      profile: "images/pp2.png",
      sender: "Support Team",
      text: "New facilities added in your area",
      time: "2h ago",
    },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-4 flex-1 space-y-2 w-full">
      <section className="font-semibold flex items-center gap-2">
        <MessagesSquare className="w-5 h-5 text-[#0D0BA8]" />
        <h3 className="text-xl text-[#000000] font-bold">Recent Messages</h3>
      </section>
      <p className="text-sm text-[#666666]">
        Stay connected with your hostel owners & support team
      </p>
      <ul className="space-y-3">
        {messages.map((msg, idx) => (
          <li key={idx} className="flex flex-col sm:flex-row justify-between">
            <div className="flex items-center gap-2">
              <img
                src={msg.profile}
                alt={msg.sender}
                className="w-18 h-18 rounded-full p-2"
              />
              <section className="space-y-2">
                <p className="text-lg font-semibold">{msg.sender}</p>
                <p className="text-sm text-gray-500">{msg.text}</p>
              </section>
            </div>
            <span className="text-sm text-gray-400">{msg.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

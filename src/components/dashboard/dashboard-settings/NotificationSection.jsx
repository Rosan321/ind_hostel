"use client";

import { useState } from "react";

export default function NotificationSection() {
  const [notifications, setNotifications] = useState({
    booking: true,
    payments: true,
    hostel: false,
    support: true,
  });

  const toggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <h2 className="text-2xl text-[#1A1A1A] font-bold mb-4">Notifications</h2>
      <p className="text-sm text-gray-500 mb-4">
        Choose how you'd like to be notified
      </p>

      <div className="space-y-4">
        <NotificationItem
          title="Booking confirmations"
          desc="Receive email and SMS updates for bookings."
          state={notifications.booking}
          onToggle={() => toggle("booking")}
        />

        <NotificationItem
          title="Payment alerts"
          desc="Get notified for transactions."
          state={notifications.payments}
          onToggle={() => toggle("payments")}
        />

        <NotificationItem
          title="Hostel updates"
          desc="Announcements from hostel admins."
          state={notifications.hostel}
          onToggle={() => toggle("hostel")}
        />

        <NotificationItem
          title="Support replies"
          desc="Messages from support team."
          state={notifications.support}
          onToggle={() => toggle("support")}
        />
      </div>
    </div>
  );
}

function NotificationItem({ title, desc, state, onToggle }) {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <p className="font-semibold text-[#1A1A1A] text-sm">{title}</p>
        <p className="text-sm text-[#666666]">{desc}</p>
      </div>

      <button
        onClick={onToggle}
        className={`w-14 h-8 rounded-full p-1 transition ${
          state ? "bg-[#0D0BA8]" : "bg-[#D0D0D0]"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full transition ${
            state ? "translate-x-6 bg-white" : "bg-[#44475A]"
          }`}
        ></div>
      </button>
    </div>
  );
}

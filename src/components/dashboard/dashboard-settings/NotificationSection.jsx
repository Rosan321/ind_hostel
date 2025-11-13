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
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
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
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>

      <button
        onClick={onToggle}
        className={`w-12 h-6 rounded-full p-1 transition ${
          state ? "bg-blue-700" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transition ${
            state ? "translate-x-6" : ""
          }`}
        ></div>
      </button>
    </div>
  );
}

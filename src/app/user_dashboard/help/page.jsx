"use client"

import MessageForm from "@/components/dashboard/help-support/MessageForm";
import PreviousMessages from "@/components/dashboard/help-support/PreviousMessage";
import SupportTabs from "@/components/dashboard/help-support/SupportTabs";
import { useState } from "react";

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState("booking");

  const previousMessages = [
    {
      from: "You",
      text: "Hi, my booking payment failed but the amount was deducted.",
      time: "10:35 AM",
    },
    {
      from: "Admin",
      text: "We’ve received your query — refund will be processed in 24 hrs",
      time: "11:10 AM",
    },
    {
      from: "You",
      text: "Thanks for the quick help!",
      time: "11:12 AM",
    },
  ];

  return (
    <section className="pr-12 py-10">
      <h1 className="text-2xl font-semibold mb-1">Help & Support</h1>
      <p className="text-gray-600 mb-6">
        We’re here to help you with bookings, rooms, or payments
      </p>

      {/* Tabs */}
      <SupportTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MessageForm />
        <PreviousMessages messages={previousMessages} />
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
  BedDouble,
  Building2,
  ChevronDown,
  Mail,
  MessageCircleMore,
  Phone,
  ReceiptIndianRupee,
  ReceiptText,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

const helpFaqs = [
  {
    question: "How do I cancel my booking?",
    answer:
      "Log in to your account, go to 'My Bookings', select your reservation, and click 'Cancel Booking'. Refund policies depend on the property.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are usually processed within 5-7 working days. The final credit timeline depends on your payment provider.",
  },
  {
    question: "Can I change my check-in date?",
    answer:
      "Yes, you can request a change through 'My Bookings'. Approval depends on room availability and property policy.",
  },
  {
    question: "How do I contact the hostel owner?",
    answer:
      "Inside your booking details, use the 'Contact Host' option to send a message or view contact details.",
  },
];

export default function HelpCenter() {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleEmail = () => {
    window.location.href =
      "https://mail.google.com/mail/?view=cm&fs=1&to=support@indhostel.com";
  };

  const handleLiveChat = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      router.push("/user_dashboard/help"); // change to your chat route
    } else {
      router.push("/login"); // redirect to login page
    }
  };

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="bg-[linear-gradient(to_right,#0D0BA8_0%,#0D0BA8_15%,#6366F1_80%,#C7D2FE_100%)] py-20 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">How Can We Help You?</h2>
        <p className="mb-6">
          Find answers to your booking, payment, or stay-related questions.
        </p>
      </div>

      <div className="px-16 py-20">
        {/* Browse Topics */}
        <div className="mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8">Browse Help Topics</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Booking Issues",
                para: "View, modify, or cancel your bookings.",
                icon: Building2,
              },
              {
                title: "Account & Login",
                para: "Password reset, profile updates, security",
                icon: User,
              },
              {
                title: "Stay & Check-in",
                para: "Check-in timing, property contact, house rules.",
                icon: BedDouble,
              },
              {
                title: "Contact Host",
                para: "Message or call property owners.",
                icon: Phone,
              },
              {
                title: "Payments & Refunds",
                para: "Track refunds, invoices, and payment methods.",
                icon: ReceiptIndianRupee,
              },
              {
                title: "Billing & Receipts",
                para: "Download invoices and payment proofs.",
                icon: ReceiptText,
              },
            ].map((topic, index) => {
              const Icon = topic.icon;

              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0D0BA8CC] rounded-full mb-4">
                    <Icon className="text-white w-5 h-5" />
                  </div>

                  <h4 className="font-semibold text-[#1A1A1A] text-lg mb-2">
                    {topic.title}
                  </h4>

                  <p className="text-[#666666] text-sm">{topic.para}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-16">
          <h3 className="text-3xl text-[#1A1A1A] font-bold text-center mb-10">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {helpFaqs.map((faq, index) => (
              <div key={index} className="bg-white border rounded-xl shadow-sm">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                >
                  <span className="font-semibold text-[#1A1A1A]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      open === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    open === index
                      ? "max-h-32 pb-4 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Support Section */}
        <div className="mx-auto px-4">
          <h3 className="text-3xl text-[#1A1A1A] font-bold mb-2">
            Still Need Help?
          </h3>
          <p className="text-[#666666] mb-8">
            We’re available 24×7 to assist you with bookings, refunds, or
            stay-related issues
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Call Support */}
            <div className="bg-white p-6 rounded-4xl shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="w-16 h-16 flex items-center justify-center bg-[#0D0BA829] rounded-full mb-4">
                  <Phone className="text-[#0D0BA8] w-8 h-8" />
                </div>

                <h4 className="font-bold text-[#1A1A1A] mb-2">Call Support</h4>
                <p className="text-[#666666] text-sm mb-2">
                  Speak directly with our support team for urgent issues.
                </p>
                <p className="font-medium mb-4">+91 98765 43210</p>
              </div>

              <button
                onClick={handleCall}
                className="bg-[#0D0BA8] text-white px-4 py-2 rounded-lg self-start cursor-pointer"
              >
                Call Now
              </button>
            </div>

            {/* Live Chat */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="w-16 h-16 flex items-center justify-center bg-[#0D0BA829] rounded-full mb-4">
                  <MessageCircleMore className="text-[#0D0BA8] w-8 h-8" />
                </div>

                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p className="text-gray-500 text-sm mb-4">
                  Chat instantly with our support team for quick help.
                </p>
              </div>

              <button
                onClick={handleLiveChat}
                className="bg-[#0D0BA8] text-white px-4 py-2 rounded-lg self-start cursor-pointer"
              >
                Start Chat
              </button>
            </div>

            {/* Email Support */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="w-16 h-16 flex items-center justify-center bg-[#0D0BA829] rounded-full mb-4">
                  <Mail className="text-[#0D0BA8] w-8 h-8" />
                </div>

                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-gray-500 text-sm mb-2">
                  Send us your issue details and we'll respond within 24 hours.
                </p>
                <p className="font-medium mb-4">support@indhostel.com</p>
              </div>

              <button
                onClick={handleEmail}
                className="border border-[#0D0BA8] text-[#0D0BA8] px-4 py-2 rounded-lg self-start cursor-pointer"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

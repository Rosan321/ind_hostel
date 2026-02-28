"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const faqs = [
  {
    question: "How do I cancel my booking?",
    answer:
      "Go to “My Bookings” → Click “View Details” → Select “Cancel Booking.” Refund eligibility depends on the property’s cancellation policy.",
  },
  {
    question: "Can I modify my check-in date?",
    answer:
      "Yes, if availability allows. Select “Modify Booking” inside your booking details page.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are processed within 5–7 business days after cancellation confirmation.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, credit/debit cards, net banking, wallets, and pay-at-property (if supported).",
  },
  {
    question: "What documents are required at check-in?",
    answer: "A valid government-issued ID is mandatory.",
  },
  {
    question: "How do I contact the hostel owner?",
    answer: "Use the Contact Host button inside your booking details page.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click “Forgot Password” on the login page and follow the email verification process.",
  },
  {
    question: "How can I update my profile details?",
    answer: "Go to Dashboard → Settings → Edit Profile.",
  },
  {
    question: "Are bookings refundable?",
    answer:
      "Refund policies vary by property. Please review the cancellation terms before booking.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleDashboard = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      router.push("/user_dashboard/bookings"); // change to your chat route
    } else {
      toast.info("Please log in to view your bookings.");
      router.push("/login"); // redirect to login page
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Heading */}
      <div className="bg-[linear-gradient(to_right,#0D0BA8_0%,#0D0BA8_15%,#6366F1_60%,#C7D2FE_100%)] py-20 text-center text-white mb-18">
        <h2 className="text-4xl font-bold rounded-lg">
          Frequently Asked Questions
        </h2>
        <p className="mt-4">
          Everything you need to know about bookings, payments, and your stay.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left cursor-pointer"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeIndex === index
                    ? "max-h-40 pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-24 text-center bg-[#0D0BA8] text-white py-20">
        <p className="text-2xl font-bold mb-4">
          We're committed to making your stay smooth and stress-free.
        </p>
        <button
          onClick={handleDashboard}
          className="bg-white text-[#0D0BA8] px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition cursor-pointer"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
}

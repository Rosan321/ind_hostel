"use client";

import RevealOnScroll from "@/components/animations/RevealOnScroll";
import ShuffleInOnScroll from "@/components/animations/SuffleInOnScroll";
import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { tabs } from "@/lib/utils/cityHostels";
import { formattedDate } from "@/lib/utils/fromattedDate";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState("booking");
  const [bookingId, setBookingId] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messagesAll, setMessagesAll] = useState(null);

  // Get the active tab label
  const activeTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label || "General";

  const handleSend = async () => {
    // Validation
    if (!bookingId.trim()) {
      toast.info("Please enter a bookingId");
      return;
    }

    if (!subject.trim()) {
      toast.info("Please enter a subject");
      return;
    }

    if (!msg.trim()) {
      toast.info("Please enter a message");
      return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
      // 2MB
      toast.error("File size must be below 5MB");
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData to handle file upload
      const formData = new FormData();

      // Append data to FormData
      formData.append("category", activeTabLabel);
      formData.append("subject", subject);
      formData.append("message", msg);
      formData.append("bookingid", bookingId);

      if (file) {
        formData.append("attachment", file);
      }

      // Make API call using axiosInstance
      const response = await axiosInstance.post(
        API_ENDPOINTS.HELP.POST_HELP,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data)
      toast.success(response?.data?.message);

      setSubject("");
      setMsg("");
      setFile(null);
      setActiveTab("");
      setBookingId("");
    } catch (error) {
      // console.error("Error sending message:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await axiosInstance.get(API_ENDPOINTS.HELP.GET_HELP);
        // console.log(res.data.data);
        setMessagesAll(res.data.data);
      } catch (error) {
        // console.error("Failed to fetch messages:", error);
        toast.error(error.response.data.message);
      }
    };

    fetchAllMessages();
  }, []);

  return (
    <section className="lg:pr-12 pb-10">
      <RevealOnScroll delay={0.2}>
        <h1 className="text-2xl font-semibold mb-1">Help & Support</h1>
        <p className="text-gray-600 mb-6">
          We're here to help you with bookings, rooms, or payments
        </p>
      </RevealOnScroll>

      {/* Tabs */}
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
            <ShuffleInOnScroll delay={0.2} key={tab.id}>
              <p className="font-semibold">{tab.label}</p>
              <p
                className={`text-sm ${
                  activeTab === tab.id ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {tab.desc}
              </p>
            </ShuffleInOnScroll>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-2xl p-6 w-full">
          <RevealOnScroll delay={0.2}>
            <section className="flex items-center gap-1">
              <p className="text-[#1A1A1A] mb-2">Booking Id</p>
              <p className="text-red-500 text-base font-medium">*</p>
            </section>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg mb-4 text-[#666666]"
              placeholder="Enter your issue bookingId (e.g., BOKindhostels.........)"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              required
            />

            <section className="flex items-center gap-1">
              <p className="text-[#1A1A1A] mb-2">Subject</p>
              <p className="text-red-500 text-base font-medium">*</p>
            </section>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg mb-4 text-[#666666]"
              placeholder="Enter your issue subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <section className="flex items-center gap-1">
              <p className="text-[#1A1A1A] mb-2">Message</p>
              <p className="text-red-500 text-base font-medium">*</p>
            </section>
            <textarea
              className="w-full border px-4 py-3 rounded-lg mb-4 text-[#666666]"
              rows={4}
              placeholder="Describe your issue or question in detail..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
            />

            <section className="flex items-center gap-1">
              <p className="text-[#1A1A1A] mb-2">Upload Attachment</p>
              <p className="text-red-500 text-base font-medium">*</p>
            </section>

            <label className="border rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer text-[#666666] bg-gray-50 hover:bg-gray-100">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                  }
                }}
                required
              />
              <Upload size={18} stroke="#666666" />{" "}
              <span>{file ? file.name : "File upload"}</span>
            </label>

            <p className="text-sm text-[#666666] mt-3">
              Attach Image / Screenshot
            </p>

            <div className="flex justify-center">
              <button
                onClick={handleSend}
                disabled={isLoading}
                className={`mt-4 px-8 py-3 bg-[#0D0BA8] text-white rounded-full hover:bg-blue-800 transition cursor-pointer ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </RevealOnScroll>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 w-full">
          <RevealOnScroll delay={0.2}>
            <h3 className="font-semibold text-xl mb-4">Previous messages</h3>

            <>
              {messagesAll &&
                messagesAll.map((msg) => (
                  <div key={msg._id}>
                    {msg?.messages.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="flex items-center gap-4 w-10/12 py-1">
                          <p className="text-base text-[#1A1A1A] font-semibold">
                            {item.sender}:
                          </p>
                          <p className="text-[#666666]">{item.message}</p>
                        </div>
                        <p className="text-[#000000] text-sm">{formattedDate(msg.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                ))}
            </>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

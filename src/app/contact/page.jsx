"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { facebook, insta, linkedin, twitter } from "@/lib/utils/svgS";
import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import ShuffleInOnScroll from "@/components/animations/SuffleInOnScroll";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { contactUS } from "@/lib/store/actions/otherActions";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      toast.error("Message should be at least 10 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await dispatch(contactUS(formData)).unwrap();
      toast.success(res?.message || "Message sent successfully!");

      setFormData({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const msg = error?.message || "Failed to send message. Try again.";
      toast.error(msg);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-[#eefff7] py-8 lg:py-12 text-center px-4 flex flex-col items-center">
        {/* Breadcrumbs */}
        <RevealOnScroll delay={0}>
          <div className="flex items-center text-base text-[#1A1A1A] space-x-1 mb-4">
            <Link href="/">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#44475A] font-medium">Contact Us</span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-[#000000]">
            We'd Love to Hear from You!
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-[#666666] text-sm sm:text-base max-w-2xl mx-auto">
            Reach out for bookings, partnerships, or any queries — we're here to
            help 24×7.
          </p>
        </RevealOnScroll>
      </div>

      {/* Main */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 sm:px-8 lg:px-20 bg-gray-100 py-10 lg:py-24">
        {/* Form Box */}
        <div className="flex-1 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md h-auto lg:h-[540px]">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <RevealOnScroll delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm text-[#1A1A1A]">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-[#1A1A1A]">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm text-[#1A1A1A]">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Mobile number"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-[#1A1A1A]">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="Booking query / Feedback"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="space-y-2">
                <label className="block text-sm text-[#1A1A1A]">
                  Your Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Write your message here..."
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                />
              </div>
            </RevealOnScroll>

            <button
              type="submit"
              className="btn-wiper-bg bg-[#f3ff3d] hover:bg-[#e9f728] rounded-full w-full sm:w-auto mx-auto block transition-colors text-sm sm:text-base font-semibold cursor-pointer"
            >
              <span className="btn-wiper-bg-content flex items-center justify-center gap-2 px-6 sm:px-8">
                Send Message
              </span>
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="w-full sm:w-3/5 lg:w-1/3 min-h-[500px] sm:min-h-[600px] lg:min-h-[760px] relative bg-[#1A1A1A] text-white overflow-hidden overflow-visible my-10 lg:my-0 md:mx-auto">
          {/* Contact Information Badge */}
          <div className="absolute flex flex-col justify-center -top-3 sm:-top-4 lg:-top-6 left-10">
            <ShuffleInOnScroll delay={0.2}>
              <div className="relative text-[#FFFFFF] font-semibold text-center w-56 sm:w-64 lg:w-56 xl:w-72 py-2 rounded-t-xl">
                <span className="relative z-[3] text-lg sm:text-xl lg:text-2xl font-semibold">
                  Contact Information
                </span>

                {/* Bottom chevron */}
                <div className="absolute bottom-[-10px] sm:bottom-[-16px] lg:bottom-[-18] xl:bottom-[-36] left-0 right-0 overflow-hidden rotate-180 z-[2]">
                  <svg
                    className="relative block w-full h-12 sm:h-16 lg:h-24 bg-[#0D0BA8]"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                  >
                    <path d="M0 0 L600 30 L1200 0 H0 Z" fill="#1A1A1A"></path>
                  </svg>
                </div>
              </div>
            </ShuffleInOnScroll>

            <ShuffleInOnScroll delay={0.3}>
              <div className="px-4 sm:px-6 lg:px-0 lg:pr-6 xl:px-10 pt-16 sm:pt-16 lg:pt-8 xl:pt-20 space-y-4 sm:space-y-6">
                <div className="flex gap-3 items-center border-b border-[#D0D0D066] pb-3 sm:pb-4">
                  <span className="bg-[#44475A] p-3 rounded-full text-white shrink-0">
                    <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h6 className="text-sm font-semibold">Call Us</h6>
                    <p className="text-base sm:text-lg font-medium break-words">
                      +91 98765 43210 (Mon–Sun, 9AM–9PM)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-center border-b border-[#D0D0D066] pb-3 sm:pb-4">
                  <span className="bg-[#44475A] p-3 rounded-full text-white shrink-0">
                    <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h6 className="text-sm font-semibold">Email Support</h6>
                    <p className="text-base sm:text-lg font-medium break-all">
                      support@indhostel.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="bg-[#44475A] p-3 rounded-full text-white shrink-0">
                    <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">Visit Us</p>
                    <p className="text-base sm:text-lg font-medium">
                      4th Floor, UrbanNest Tower, Mumbai, India
                    </p>
                  </div>
                </div>
              </div>
            </ShuffleInOnScroll>
          </div>

          <div className="absolute bottom-0 w-full flex justify-center">
            <Image
              src="/images/man.png"
              alt="man"
              width={200}
              height={230}
              className="w-40 sm:w-48 lg:w-64 h-auto"
            />
          </div>
          <div className="absolute -bottom-14 right-0 pl-6 flex gap-2 p-2 bg-[#1A1A1A]">
            {[
              { href: "https://www.facebook.com/", icon: facebook },
              { href: "https://www.instagram.com/", icon: insta },
              { href: "https://www.x.com/", icon: twitter },
              { href: "https://www.youtube.com/", icon: linkedin },
            ].map((social, index) => (
              <span key={index} className="p-2 bg-[#0D0BA8] rounded-full">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 rounded-full flex items-center justify-center transition"
                  // variants={socialIconVariants}
                  // whileHover="hover"
                  // custom={index}
                >
                  {social.icon}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

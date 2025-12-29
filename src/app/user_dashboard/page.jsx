"use client";

import RevealOnScroll from "@/components/animations/RevealOnScroll";
// import AnnouncementsCard from "@/components/dashboard/AnnouncementCard";
import BookingCard from "@/components/dashboard/BookingCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MessagesSection from "@/components/dashboard/MessagesSection";
import StatsCard from "@/components/dashboard/StateCard";
import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { Bed, Clock, MessageSquareMore } from "lucide-react";
import { useEffect, useState } from "react";

const DashboardHome = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.DASHBOARD);
        // console.log(res.data);
        setDashboard(res.data.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        toast.error(error.response.data.message);
      }
    };

    fetchAllMessages();
  }, []);

  // console.log(dashboard);

  return (
    <>
      <div className="lg:pr-12">
        <DashboardHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          <StatsCard
            title="Active Bookings"
            value={dashboard?.activebookings ?? 0}
            icon={<Bed fill="#0D0BA8" stroke="#0D0BA8" />}
          />

          <StatsCard
            title="Past Stays"
            value={dashboard?.pastbookings ?? 0}
            icon={<Clock stroke="#0D0BA8" fill="none" />}
          />

          <StatsCard
            title="New Messages"
            value={(dashboard?.unreadmessages && dashboard?.unreadmessages.map((item)=>item.count)) ?? 0}
            icon={<MessageSquareMore stroke="#FFF" fill="#0D0BA8" />}
          />
        </div>

        {/* Booking Card */}
        <BookingCard data={dashboard?.currentstaying} />

        {/* Messages + Announcements */}
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col xl:flex-row gap-6 mb-6 lg:mb-6">
            <MessagesSection />
            {/* <AnnouncementsCard /> */}
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
};

export default DashboardHome;

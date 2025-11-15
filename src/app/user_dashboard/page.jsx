import AnnouncementsCard from "@/components/dashboard/AnnouncementCard";
import BookingCard from "@/components/dashboard/BookingCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MessagesSection from "@/components/dashboard/MessagesSection";
import StatsCard from "@/components/dashboard/StateCard";
import { Bed, Clock, MessageSquareMore } from "lucide-react";

const DashboardHome = () => {
  return (
    <>
      <div className="lg:pr-12">
        <DashboardHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Active Bookings"
            value="2"
            icon={<Bed fill="#0D0BA8" stroke="#0D0BA8" />}
          />
          <StatsCard
            title="Past Stays"
            value="5"
            icon={<Clock stroke="#0D0BA8" fill="none" />}
          />
          <StatsCard
            title="New Messages"
            value="3"
            icon={<MessageSquareMore stroke="#FFF" fill="#0D0BA8" />}
          />
        </div>

        {/* Booking Card */}
        <BookingCard />

        {/* Messages + Announcements */}
        <div className="flex flex-col xl:flex-row gap-6 mb-6 lg:mb-6">
          <MessagesSection />
          <AnnouncementsCard />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;

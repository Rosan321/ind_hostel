import RevealOnScroll from "@/components/animations/RevealOnScroll";
import AccountSection from "@/components/dashboard/dashboard-settings/AccountSection";
import NotificationSection from "@/components/dashboard/dashboard-settings/NotificationSection";
import ProfileSection from "@/components/dashboard/dashboard-settings/ProfileSection";
import SecuritySection from "@/components/dashboard/dashboard-settings/SecuritySection";


export default function SettingsPage() {
  return (
    <div className="lg:pr-12">
      <RevealOnScroll delay={0.2}>
        <h1 className="text-2xl text-[#1A1A1A] font-semibold mb-1">Account Settings</h1>
        <p className="text-[#666666] mb-6">
          Manage your personal info, password, and preferences
        </p>
      </RevealOnScroll>

      <ProfileSection />
      <SecuritySection />
      {/* <NotificationSection /> */}
      <AccountSection />
    </div>
  );
}

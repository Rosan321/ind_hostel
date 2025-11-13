import AccountSection from "@/components/dashboard/dashboard-settings/AccountSection";
import NotificationSection from "@/components/dashboard/dashboard-settings/NotificationSection";
import ProfileSection from "@/components/dashboard/dashboard-settings/ProfileSection";
import SecuritySection from "@/components/dashboard/dashboard-settings/SecuritySection";


export default function SettingsPage() {
  return (
    <section className="pr-12 py-10">
      <h1 className="text-2xl font-semibold mb-1">Account Settings</h1>
      <p className="text-gray-600 mb-6">
        Manage your personal info, password, and preferences
      </p>

      <ProfileSection />
      <SecuritySection />
      <NotificationSection />
      <AccountSection />
    </section>
  );
}

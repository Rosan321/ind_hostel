import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <section className="flex-1 p-4 sm:p-8 pb-24 space-y-6">{children}</section>
    </main>
  );
}
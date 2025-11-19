import RevealOnScroll from "@/components/animations/RevealOnScroll";

export default function AccountSection() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8 w-full">
      <RevealOnScroll delay={0.3}>
        <h2 className="text-2xl text-[#1A1A1A] font-bold mb-4">Account</h2>
        <p className="text-[#666666] mb-4">
          Manage or delete your account
        </p>

        <div className="space-y-4 flex flex-col w-full sm:w-1/2 xl:w-1/4">

          <button className="px-6 py-3 border border-[#0D0BA8] text-base font-semibold text-[#0D0BA8] rounded-full hover:bg-[#0D0BA8] hover:text-white cursor-pointer">
            Logout of all devices
          </button>

          <button className="px-6 py-3 bg-[#0D0BA8] text-white rounded-full hover:bg-blue-900 cursor-pointer">
            Deactivate account
          </button>

          <button className="text-[#0D0BA8] text-sm underline cursor-pointer">
            Delete account permanently
          </button>

        </div>
      </RevealOnScroll>
    </div>
  );
}

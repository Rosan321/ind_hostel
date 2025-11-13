export default function AccountSection() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Account</h2>
      <p className="text-gray-500 text-sm mb-4">
        Manage or delete your account
      </p>

      <div className="space-y-4">

        <button className="px-6 py-2 border border-blue-700 text-blue-700 rounded-full hover:bg-blue-50">
          Logout of all devices
        </button>

        <button className="px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
          Deactivate account
        </button>

        <button className="text-red-600 text-sm hover:underline">
          Delete account permanently
        </button>

      </div>
    </div>
  );
}

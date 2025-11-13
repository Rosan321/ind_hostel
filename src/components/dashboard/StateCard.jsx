export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 gap-3 mb-16">
      <div className="text-indigo-600 text-2xl">{icon}</div>
      <div className="flex flex-col items-center text-center">
        <p className="text-[#1A1A1A] text-sm font-semibold">{title}</p>
        <h4 className="font-semibold text-[#0A0A8F] text-2xl">{value}</h4>
        <p className="text-sm text-[#666666]">Currently staying in IndHostel properties</p>
      </div>
    </div>
  );
}
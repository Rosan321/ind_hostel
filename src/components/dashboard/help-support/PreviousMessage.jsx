export default function PreviousMessages({ messages }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h3 className="font-semibold text-xl mb-4">Previous messages</h3>

      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex justify-between gap-4">
            <div className="flex items-center gap-4 w-10/12">
              <p className="text-base text-[#1A1A1A] font-semibold">{msg.from}:</p>
              <p className="text-[#666666]">{msg.text}</p>
            </div>
            <p className="text-[#000000] text-sm">{msg.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

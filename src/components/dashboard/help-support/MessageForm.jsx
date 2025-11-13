"use client";

import { Upload } from "lucide-react";
import { useState } from "react";

export default function MessageForm() {
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = () => {
    console.log({
      subject,
      msg,
      file,
    });
    alert("Message sent!");
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 w-full">
      <p className="text-[#1A1A1A] mb-2">Subject</p>
      <input
        type="text"
        className="w-full border px-4 py-2 rounded-lg mb-4 text-[#666666]"
        placeholder="Enter your issue subject (e.g., Payment not processed)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <p className="text-[#1A1A1A] mb-2">Message</p>
      <textarea
        className="w-full border px-4 py-3 rounded-lg mb-4 text-[#666666]"
        rows={4}
        placeholder="Describe your issue or question in detail..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <p className="text-[#1A1A1A] mb-2">Upload Attachment</p>

      <label className="border rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer text-[#666666] bg-gray-50 hover:bg-gray-100">
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Upload size={18} stroke="#666666" /> <span>{file ? file.name : "File upload"}</span>
      </label>

      <p className="text-sm text-[#666666] mt-3">Attach Image / Screenshot</p>

      <div className="flex justify-center">
        <button
            onClick={handleSend}
            className="mt-4 px-8 py-3 bg-[#0D0BA8] text-white rounded-full hover:bg-blue-800 transition cursor-pointer"
        >
            Send Message
        </button>
      </div>
    </div>
  );
}

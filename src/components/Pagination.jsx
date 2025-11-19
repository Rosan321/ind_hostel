"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 3,
  onPageChange = () => {},
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-end items-center mt-8 space-x-2">
      {/* Previous Button */}
      {currentPage > 1 && (
        <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
            currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#FFFFFF] bg-[#0D0BA8] hover:bg-[#2A32FF]"
            }`}
            disabled={currentPage === 1}
        >
            <ChevronsLeft />
        </button>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full font-medium cursor-pointer ${
            currentPage === page
              ? "bg-[#0D0BA8] text-[#FFF] border border-[#0D0BA8]"
              : "text-[#FFFFFF] bg-[#66666666] hover:bg-[#0D0BA8]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full cursor-pointer ${
            currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#FFFFFF] bg-[#0D0BA8] hover:bg-[#2A32FF] hover:text-[#FFF] border-gray-300"
            }`}
            disabled={currentPage === totalPages}
        >
            <p>Next</p>
            <ChevronsRight />
        </button>
      )}
    </div>
  );
}

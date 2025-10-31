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
                : "text-gray-700 hover:bg-[#F1FF51]"
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
              ? "bg-[#F1FF51] text-black border border-[#F1FF51]"
              : "text-gray-700 bg-[#66666666] hover:bg-[#F1FF51]"
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
                : "text-gray-700 hover:bg-[#F1FF51] hover:text-black border-gray-300"
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

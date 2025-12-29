// "use client";

// import { ChevronsLeft, ChevronsRight } from "lucide-react";

// export default function Pagination({
//   currentPage = 1,
//   totalPages = 3,
//   onPageChange = () => {},
// }) {
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="flex justify-end items-center mt-8 space-x-2">
//       {/* Previous Button */}
//       {currentPage > 1 && (
//         <button
//             onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
//             className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
//             currentPage === 1
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-[#FFFFFF] bg-[#0D0BA8] hover:bg-[#2A32FF]"
//             }`}
//             disabled={currentPage === 1}
//         >
//             <ChevronsLeft />
//         </button>
//       )}

//       {/* Page Numbers */}
//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`w-8 h-8 flex items-center justify-center rounded-full font-medium cursor-pointer ${
//             currentPage === page
//               ? "bg-[#0D0BA8] text-[#FFF] border border-[#0D0BA8]"
//               : "text-[#FFFFFF] bg-[#66666666] hover:bg-[#0D0BA8]"
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       {/* Next Button */}
//       {currentPage < totalPages && (
//         <button
//             onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
//             className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full cursor-pointer ${
//             currentPage === totalPages
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "text-[#FFFFFF] bg-[#0D0BA8] hover:bg-[#2A32FF] hover:text-[#FFF] border-gray-300"
//             }`}
//             disabled={currentPage === totalPages}
//         >
//             <p>Next</p>
//             <ChevronsRight />
//         </button>
//       )}
//     </div>
//   );
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////


"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange = () => {},
}) {
  const [visiblePages, setVisiblePages] = useState([]);

  // Calculate visible page numbers
  useEffect(() => {
    const maxVisible = 5;
    let startPage, endPage;

    if (totalPages <= maxVisible) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxVisibleBeforeCurrent = Math.floor(maxVisible / 2);
      const maxVisibleAfterCurrent = Math.ceil(maxVisible / 2) - 1;

      if (currentPage <= maxVisibleBeforeCurrent) {
        startPage = 1;
        endPage = maxVisible;
      } else if (currentPage + maxVisibleAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisible + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxVisibleBeforeCurrent;
        endPage = currentPage + maxVisibleAfterCurrent;
      }
    }

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
    setVisiblePages(pages);
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
      {/* Page info */}
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {/* Page navigation */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#FFFFFF] bg-[#0D0BA8] hover:bg-[#2A32FF]"
          }`}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronsLeft size={18} />
        </button>

        {/* First Page (if not visible) */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded-full font-medium cursor-pointer text-[#FFFFFF] bg-[#66666666] hover:bg-[#0D0BA8]"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-gray-400">...</span>
            )}
          </>
        )}

        {/* Visible Page Numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full font-medium cursor-pointer ${
              currentPage === page
                ? "bg-[#0D0BA8] text-[#FFF] border border-[#0D0BA8]"
                : "text-[#FFFFFF] bg-[#66666666] hover:bg-[#0D0BA8]"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {/* Last Page (if not visible) */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 flex items-center justify-center rounded-full font-medium cursor-pointer text-[#FFFFFF] bg-[#66666666] hover:bg-[#0D0BA8]"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full cursor-pointer ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#FFFFFF] bg-[#0D0BA8] hover:bg-[#2A32FF] hover:text-[#FFF]"
          }`}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <p>Next</p>
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
}
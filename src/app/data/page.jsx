// "use client"

// import Filters from "@/components/Filters";
// import HostelGrid from "@/components/HostelGrid";
// import SearchBar from "@/components/SearchBar";
// import { ArrowDownWideNarrow } from "lucide-react";

// export default function HostelListingPage() {
//   return (
//     <div className="bg-gray-100 min-h-screen p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <SearchBar />

//         <div className="flex flex-col md:flex-row gap-6">
//           <Filters />
//           <div className="flex-1">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Showing results for <span className="text-yellow-500">Bangalore</span> – 25 stays available
//               </h2>
//               <div className="flex items-center gap-2">
//                 <section className="flex items-center gap-2">
//                     <p>Sort By</p>
//                 <ArrowDownWideNarrow />
//                 </section>
//                 <select className="border rounded-lg px-2 py-2 text-sm">
//                     <option>Default Sorting</option>
//                     <option>Price: Low to High</option>
//                     <option>Price: High to Low</option>
//                 </select>
//               </div>
//             </div>

//             <HostelGrid />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


///////////////////////////////////////////////////////////////////////////////////

"use client";

import Filters from "@/components/Filters";
import HostelGrid from "@/components/HostelGrid";
import SearchBar from "@/components/SearchBar";
import { ArrowDownWideNarrow } from "lucide-react";

export default function HostelListingPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="w-full mx-auto space-y-6">
        <SearchBar />

        <div className="flex flex-col md:flex-row gap-6">
          <Filters />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Showing results for <span className="text-yellow-500">Bangalore</span> – 25 stays available
              </h2>
              <div className="flex items-center gap-2">
                <section className="flex items-center gap-2">
                    <p>Sort By</p>
                    <ArrowDownWideNarrow />
                </section>
                <select className="border rounded-lg px-2 py-2 text-sm">
                    <option>Default Sorting</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <HostelGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

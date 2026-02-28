// import { useState, useRef, useEffect } from 'react';
// import { ChevronRight } from "lucide-react";

// const NestedDropdownMenu = ({ categories, onItemClick, isMobile = false }) => {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [isHoveringMain, setIsHoveringMain] = useState(false);
//   const [isHoveringSubmenu, setIsHoveringSubmenu] = useState(false);
//   const menuRef = useRef(null);
//   const timeoutRef = useRef(null);

//   // Clear timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const handleMainMouseEnter = () => {
//     setIsHoveringMain(true);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const handleMainMouseLeave = () => {
//     setIsHoveringMain(false);
//     // Only close if not hovering over submenu
//     timeoutRef.current = setTimeout(() => {
//       if (!isHoveringSubmenu) {
//         setActiveCategory(null);
//       }
//     }, 100);
//   };

//   const handleSubmenuMouseEnter = (categoryLabel) => {
//     setIsHoveringSubmenu(true);
//     setActiveCategory(categoryLabel);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const handleSubmenuMouseLeave = () => {
//     setIsHoveringSubmenu(false);
//     timeoutRef.current = setTimeout(() => {
//       if (!isHoveringMain) {
//         setActiveCategory(null);
//       }
//     }, 100);
//   };

//   const handleItemClick = (item) => {
//     onItemClick(item);
//     setActiveCategory(null);
//     setIsHoveringMain(false);
//     setIsHoveringSubmenu(false);
//   };

//   if (isMobile) {
//     // Mobile version with expandable categories
//     return (
//       <div className="pl-4 mt-2 space-y-2">
//         {categories.map((category) => (
//           <div key={category.label} className="border-l-2 border-gray-600 pl-2">
//             <div className="font-semibold text-gray-300 mb-1">{category.label}</div>
//             {category.items.map((item) => (
//               <div
//                 key={item.label}
//                 className="py-2 px-3 text-gray-200 hover:bg-gray-700 cursor-pointer rounded-lg"
//                 onClick={() => handleItemClick({
//                   type: category.type,
//                   category: item.category,
//                   label: item.label
//                 })}
//               >
//                 {item.label}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // Desktop version with nested hover dropdowns
//   return (
//     <div 
//       ref={menuRef}
//       className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50"
//       onMouseEnter={handleMainMouseEnter}
//       onMouseLeave={handleMainMouseLeave}
//     >
//       {categories.map((category) => (
//         <div
//           key={category.label}
//           className="relative"
//           onMouseEnter={() => handleSubmenuMouseEnter(category.label)}
//           onMouseLeave={handleSubmenuMouseLeave}
//         >
//           {/* Category Item */}
//           <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
//             <span>{category.label}</span>
//             <ChevronRight size={14} className="ml-2" />
//           </div>

//           {/* Submenu for category items */}
//           {activeCategory === category.label && (
//             <div 
//               className="absolute left-full top-0 ml-0.5 bg-white shadow-lg rounded-lg py-2 min-w-[180px]"
//               onMouseEnter={() => handleSubmenuMouseEnter(category.label)}
//               onMouseLeave={handleSubmenuMouseLeave}
//             >
//               {category.items.map((item) => (
//                 <div
//                   key={item.label}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
//                   onClick={() => handleItemClick({
//                     type: category.type,
//                     category: item.category,
//                     label: item.label
//                   })}
//                 >
//                   {item.label}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NestedDropdownMenu;


///////////////////////////////////////////////////////////


import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from "lucide-react";

const NestedDropdownMenu = ({ categories, onItemClick, isMobile = false, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isHoveringMain, setIsHoveringMain] = useState(false);
  const [isHoveringSubmenu, setIsHoveringSubmenu] = useState(false);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMainMouseEnter = () => {
    setIsHoveringMain(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMainMouseLeave = () => {
    setIsHoveringMain(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringSubmenu) setActiveCategory(null);
    }, 100);
  };

  const handleSubmenuMouseEnter = (categoryLabel) => {
    setIsHoveringSubmenu(true);
    setActiveCategory(categoryLabel);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleSubmenuMouseLeave = () => {
    setIsHoveringSubmenu(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringMain) setActiveCategory(null);
    }, 100);
  };

  const handleItemClick = (item) => {
    onItemClick(item);
    setActiveCategory(null);
    setIsHoveringMain(false);
    setIsHoveringSubmenu(false);
    if (onClose) onClose();
  };

  if (isMobile) {
    return (
      <div className="pl-4 mt-2 space-y-2">
        {categories.map((category) => (
          <div key={category.label} className="border-l-2 border-gray-600 pl-2">
            <div className="font-semibold text-gray-300 mb-1 pr-3">
              {category.label}
            </div>
            {category.items.map((item) => (
              <button
                key={item.label}
                type="button"
                className="w-full text-left py-2 px-3 text-gray-200 hover:bg-gray-700 active:bg-gray-600 cursor-pointer rounded-lg"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  handleItemClick({
                    type: category.type,
                    category: item.category,
                    label: item.label,
                  });
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Desktop version
  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50"
      onMouseEnter={handleMainMouseEnter}
      onMouseLeave={handleMainMouseLeave}
    >
      {categories.map((category) => (
        <div
          key={category.label}
          className="relative"
          onMouseEnter={() => handleSubmenuMouseEnter(category.label)}
          onMouseLeave={handleSubmenuMouseLeave}
        >
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
            <span>{category.label}</span>
            <ChevronRight size={14} className="ml-2" />
          </div>

          {activeCategory === category.label && (
            <div
              className="absolute left-full top-0 ml-0.5 bg-white shadow-lg rounded-lg py-2 min-w-[180px]"
              onMouseEnter={() => handleSubmenuMouseEnter(category.label)}
              onMouseLeave={handleSubmenuMouseLeave}
            >
              {category.items.map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                  onClick={() =>
                    handleItemClick({
                      type: category.type,
                      category: item.category,
                      label: item.label,
                    })
                  }
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NestedDropdownMenu;
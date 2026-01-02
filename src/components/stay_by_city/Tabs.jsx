"use client";

import { useRef, useState } from "react";
import { StayFilters } from "./StayFilters";

export function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  priceFilter,
  setPriceFilter,
  stayType,
  setStayType,
}) {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // ---- Mouse Drag Handlers ----
  const handleMouseDown = (e) => {
    setIsDown(true);
    scrollRef.current?.classList.add("cursor-grabbing");
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    setIsDown(false);
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // drag sensitivity
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // ---- Touch Handlers for Mobile ----
  const handleTouchStart = (e) => {
    setIsDown(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e) => {
    if (!isDown || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDown(false);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full mt-8 lg:mt-10 gap-4">
      <section className="w-full lg:w-9/12 xl:w-9/10">
        {/* ---- Tabs Row ---- */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="
              flex gap-3 overflow-x-auto no-scrollbar py-2 cursor-grab select-none
              scrollbar-hide scroll-smooth
            "
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-shrink-0 px-5 py-2.5 rounded-full border text-sm font-medium transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-[#44475A] text-white border-[#44475A]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {tab.label}{" "}
                <span className="hidden sm:inline">({tab.count})</span>
              </button>
            ))}
          </div>

        {/* ---- Subtitle ---- */}
        <p className="text-[#666666] text-sm mt-2">
          Tap or swipe a neighborhood to visit other accomodations
        </p>
      </section>

      {/* ---- Filters ---- */}
      {/* <div className="w-full lg:w-[240px]"> */}
        {/* <StayFilters
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          stayType={stayType}
          setStayType={setStayType}
        /> */}
      {/* </div> */}
    </div>
  );
}

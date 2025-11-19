import React from "react";
import RevealOnScroll from "../animations/RevealOnScroll";

const DashboardHeader = () => {
  return (
    <div className="mb-8 sm:mb-16 space-y-2">
      <RevealOnScroll delay={0.1}>
        <h2 className="text-2xl font-bold">Welcome back, Rahul Sharma 👋</h2>
        <p className="text-gray-500">
          Here’s what’s happening with your hostel stays
        </p>
      </RevealOnScroll>
    </div>
  );
};

export default DashboardHeader;

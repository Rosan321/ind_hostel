"use client"

import React from "react";
import RevealOnScroll from "../animations/RevealOnScroll";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const { userData } = useSelector((state) => state.profile);

  return (
    <div className="mb-8 sm:mb-16">
      <RevealOnScroll delay={0.1}>
        <h2 className="text-2xl font-bold">Welcome back, {userData?.user_response?.fullname} 👋</h2>
        <p className="text-gray-500 mt-4">
          Here’s what’s happening with your stays
        </p>
      </RevealOnScroll>
    </div>
  );
};

export default DashboardHeader;

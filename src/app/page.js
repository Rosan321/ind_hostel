"use client"

import AboutUs from "@/components/AboutUs";
import FeaturedProperties from "@/components/FeaturedProerties";
import HeroSection from "@/components/HeroSection";
import LocationExplorer from "@/components/LocationExplorer";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getFilterNames } from "@/lib/store/actions/accomodationActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getFilterNames());
  },[])

  return (
    <>
      <HeroSection />
      <LocationExplorer />
      <FeaturedProperties />
      {/* <AboutUs />
      <WhyChooseUs /> */}
    </>
  );
}

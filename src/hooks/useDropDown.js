import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsHoveringDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openDropdown = (type) => {
    setActiveDropdown(type);
    setIsHoveringDropdown(true);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setIsHoveringDropdown(false);
  };

  const closeDropdownWithDelay = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout to close dropdown
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringDropdown) {
        closeDropdown();
      }
    }, 150);
  };

  const toggleDropdown = (type) =>
    setActiveDropdown((prev) => (prev === type ? null : type));

  return {
    activeDropdown,
    isHoveringDropdown,
    setIsHoveringDropdown,
    dropdownRef,
    openDropdown,
    closeDropdown,
    closeDropdownWithDelay,
    toggleDropdown,
  };
};
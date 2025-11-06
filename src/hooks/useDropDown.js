import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
        setIsHoveringDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openDropdown = (type) => setActiveDropdown(type);
  const closeDropdown = () => setActiveDropdown(null);
  const toggleDropdown = (type) =>
    setActiveDropdown((prev) => (prev === type ? null : type));

  return {
    activeDropdown,
    isHoveringDropdown,
    setIsHoveringDropdown,
    dropdownRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
};

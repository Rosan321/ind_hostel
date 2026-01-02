"use client";

import { ChevronDown, Heart, House, LayoutGrid, LogOut, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDropdown } from "@/hooks/useDropDown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/store/reducers/authSlice";
import { getProfileById } from "@/lib/store/actions/profileActions";
import { getAllAccomodationStayType } from "@/lib/store/actions/accomodationActions";
import { getDropdownItems } from "@/lib/utils/navigationDataTransformer";
import { AuthButton, DropdownMenu, NavLink } from "@/lib/utils/headerUtils";
import { DROPDOWN_CONFIGS, NAV_LINKS } from "@/lib/utils/navigationConfig";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    activeDropdown,
    setIsHoveringDropdown,
    dropdownRef,
    openDropdown,
    closeDropdown,
    closeDropdownWithDelay,
    toggleDropdown,
  } = useDropdown();

  const { isAuth } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.profile);
  const { accomodationStayTypeData } = useSelector(
    (state) => state.accomodationStayType
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch();

  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    dispatch(getProfileById());
    dispatch(getAllAccomodationStayType());
  }, [dispatch]);

  const [dropdownItems, setDropdownItems] = useState({
    hostels: [],
    pgs: [],
    hotels: [],
  });

  useEffect(() => {
    if (accomodationStayTypeData) {
      const hostelsItems = getDropdownItems(
        "hostels",
        accomodationStayTypeData,
        DROPDOWN_CONFIGS
      );
      const pgsItems = getDropdownItems(
        "pgs",
        accomodationStayTypeData,
        DROPDOWN_CONFIGS
      );
      const hotelsItems = getDropdownItems(
        "hotels",
        accomodationStayTypeData,
        DROPDOWN_CONFIGS
      );

      setDropdownItems({
        hostels: hostelsItems,
        pgs: pgsItems,
        hotels: hotelsItems,
      });
    }
  }, [accomodationStayTypeData]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileOpen &&
        profileDropdownRef.current &&
        profileButtonRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    setIsMenuOpen(false);
    sessionStorage.clear();
    router.replace("/");
  };

  const isActiveLink = (path) => pathname === path;

  const handleDropdownItemClick = (type, category) => {
    const queryParams = new URLSearchParams({ type, category }).toString();
    const url = `/data?${queryParams}`;

    // Navigate and close menu
    router.push(url);
    closeDropdown();
    setIsMenuOpen(false);
    setIsHoveringDropdown(false);
  };

  const handleNavItemMouseEnter = (type) => {
    setIsHoveringDropdown(true);
    openDropdown(type);
  };

  const handleNavItemMouseLeave = () => {
    setIsHoveringDropdown(false);
    closeDropdownWithDelay();
  };

  const handleDropdownMouseEnter = () => {
    setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    closeDropdownWithDelay();
  };

  const handleNavMouseLeave = (e) => {
    const dropdownEl = dropdownRef.current;
    if (
      !dropdownEl ||
      !(e.relatedTarget instanceof Node) ||
      !dropdownEl.contains(e.relatedTarget)
    ) {
      setIsHoveringDropdown(false);
      closeDropdown();
    }
  };

  const handleProfileButtonClick = (e) => {
    e.stopPropagation();
    setProfileOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
    setProfileOpen(false);
    closeDropdown();
  };

  // Mobile link click handler
  const handleMobileLinkClick = () => {
    // Close menu immediately when link is clicked
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-[#FFFFFF] text-white shadow-md"
      onMouseLeave={handleNavMouseLeave}
    >
      <div className="relative z-10 px-4 sm:px-8 lg:px-20">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="w-18 h-14 flex items-center justify-center">
            <Link href="/">
              <img src="/images/logo.png" alt="logo" className="w-20 h-16" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul
              className="flex items-center gap-5 lg:gap-2 xl:gap-5 text-sm text-[#1A1A1A] font-semibold"
              ref={dropdownRef}
            >
              {NAV_LINKS.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    path={path}
                    label={label}
                    isActive={isActiveLink(path)}
                  />
                </li>
              ))}

              {DROPDOWN_CONFIGS.map(({ type, label }) => (
                <li
                  key={type}
                  className="relative group flex items-center gap-2 lg:gap-1 xl:gap-2 cursor-pointer select-none"
                  onMouseEnter={() => handleNavItemMouseEnter(type)}
                  onMouseLeave={handleNavItemMouseLeave}
                  onClick={() => toggleDropdown(type)}
                >
                  <span
                    className={`xl:text-lg flex items-center gap-2 ${
                      activeDropdown === type ? "text-[#1A1A1A]" : ""
                    }`}
                  >
                    {label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      activeDropdown === type ? "rotate-180" : ""
                    }`}
                  />
                  {activeDropdown === type &&
                    dropdownItems[type] &&
                    dropdownItems[type].length > 0 && (
                      <DropdownMenu
                        items={dropdownItems[type]}
                        onItemClick={handleDropdownItemClick}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      />
                    )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            {!isAuth ? (
              <>
                <AuthButton href="/signup" label="Sign-Up" variant="primary" />
                <AuthButton href="/login" label="Login" variant="secondary" />
              </>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-8">
                  <Link
                    href="/wishlist"
                    className="bg-white flex gap-2 items-center border border-gray-200 py-3 px-4 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <Heart size={24} className="text-[#666666] w-6 h-6" />
                    <p className="text-black">Wishlist</p>
                  </Link>

                  <button
                    ref={profileButtonRef}
                    className="flex items-center gap-2 border border-gray-200 rounded-full py-1 px-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={handleProfileButtonClick}
                  >
                    <img
                      src={`${userData?.profileUrl || "/images/face.png"}`}
                      alt="profile"
                      className="w-10 h-10 rounded-full border object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/face.png";
                      }}
                    />
                    <ChevronDown
                      size={24}
                      className={`transition-transform duration-300 text-[#666666] ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div
                      ref={profileDropdownRef}
                      className="absolute right-0 top-14 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 text-black text-sm z-50 border border-gray-200"
                    >
                      <Link
                        href="/user_dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <House size={18} />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#1A1A1A] cursor-pointer z-[150]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X size={48} />
            ) : (
              <LayoutGrid size={44} fill="#1A1A1A" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Simplified structure */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/70 z-[60]"
            onClick={handleMobileMenuClose}
          />

          {/* Menu Panel */}
          <div className="lg:hidden fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#111] shadow-xl z-[70] overflow-y-auto">
            <div className="flex justify-end p-4 border-b border-gray-700">
              <button
                onClick={handleMobileMenuClose}
                className="text-white hover:bg-gray-800 rounded-lg p-2"
              >
                <X size={48} />
              </button>
            </div>

            <div className="px-6 py-4 flex flex-col gap-4">
              {/* Nav Links */}
              {NAV_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => {
                    handleMobileLinkClick();
                  }}
                  className={`relative text-lg px-4 font-semibold pb-2 text-white block
                    after:absolute after:left-0 after:bottom-0 after:h-[2px]
                    after:bg-[#0D0BA8]
                    after:transition-all after:duration-300
                    ${
                      isActiveLink(path)
                        ? "after:w-full"
                        : "after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Dropdowns */}
              {DROPDOWN_CONFIGS.map(({ type, label }) => (
                <div key={type} className="flex flex-col gap-2 px-4">
                  <button
                    className="flex items-center justify-between py-2 w-full text-left text-white"
                    onClick={() => {
                      toggleDropdown(type);
                    }}
                  >
                    <span className="text-lg font-medium">{label}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        activeDropdown === type ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === type &&
                    dropdownItems[type] &&
                    dropdownItems[type].length > 0 && (
                      <DropdownMenu
                        items={dropdownItems[type]}
                        onItemClick={handleDropdownItemClick}
                        isMobile={true}
                      />
                    )}
                </div>
              ))}

              {/* Auth Buttons */}
              <div className="flex flex-col gap-4 pt-4">
                {!isAuth ? (
                  <>
                    <Link
                      href="/signup"
                      onClick={handleMobileLinkClick}
                      className="btn-wiper text-center py-3"
                    >
                      <span className="btn-wiper-content text-base text-[#FFF]">
                        Sign-Up
                      </span>
                    </Link>
                    <Link
                      href="/login"
                      onClick={handleMobileLinkClick}
                      className="btn-wiper-bg text-center py-3"
                    >
                      <span className="btn-wiper-bg-content text-base">
                        Login
                      </span>
                    </Link>
                  </>
                ) : (
                  <div className="relative">
                    <div className="bg-[#222] text-white p-4 rounded-lg flex flex-col gap-3">
                      {/* Wishlist Button */}
                      <Link
                        href="/wishlist"
                        onClick={handleMobileLinkClick}
                        className="bg-white flex gap-2 items-center border border-gray-200 p-4 rounded-full w-1/2 hover:bg-gray-50 transition-colors"
                      >
                        <Heart size={24} className="text-[#666666] w-6 h-6" />
                        <p className="text-black">Wishlist</p>
                      </Link>

                      {/* Profile Button */}
                      <button
                        className="relative bg-white w-1/2 flex items-center gap-3 border border-gray-200 py-1 px-2 rounded-full hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setProfileOpen((prev) => !prev);
                        }}
                      >
                        <img
                          src={userData?.profileUrl || "/images/pp2.png"}
                          alt="profile"
                          className="w-12 h-12 rounded-full border object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/pp2.png";
                          }}
                        />
                        <ChevronDown
                          size={24}
                          className={`transition-transform duration-300 text-[#0D0BA8] ${
                            profileOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Profile Dropdown */}
                      {profileOpen && (
                        <div className="bg-white shadow-lg rounded-lg py-2 text-black text-sm mt-2 border border-gray-200">
                          <Link
                            href="/user_dashboard"
                            onClick={(e) => {
                              handleMobileLinkClick();
                            }}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              handleMobileLinkClick();
                              // Let the Link handle navigation
                              setTimeout(() => {
                                router.push("/user_dashboard");
                              }, 0);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2"
                          >
                            <House size={18} />
                            Dashboard
                          </Link>

                          <button
                            onClick={handleLogout}
                            onTouchEnd={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleLogout();
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2"
                          >
                            <LogOut size={18} />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;

"use client";

import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 lg:px-20">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold">
        Create an Account
      </h1>
      <p className="text-center text-[#666666] mt-2 text-sm md:text-base max-w-md mx-auto px-4">
        Join IndHostel to book stays, manage favorites, and more
      </p>

      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* LEFT IMAGE SIDE */}
        <div className="relative h-[300px] sm:h-[350px] lg:h-auto w-full order-first lg:order-none">
          <Image
            src="/images/auth.png"
            alt="banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 sm:px-8 lg:px-10">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
              Find Your Perfect Stay with IndHostel
            </h2>
            <p className="text-white/90 mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg">
              PGs, Hostels, and Hostels — Book verified stays instantly
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="p-4 sm:p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8">
            Create an Account
          </h2>

          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none transition-all duration-200 ease-in-out focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none transition-all duration-200 ease-in-out focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter Mobile number"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none transition-all duration-200 ease-in-out focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none transition-all duration-200 ease-in-out focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none transition-all duration-200 ease-in-out focus:shadow-[0_2px_0_0_#F3FF3D]"
              />
            </div>

            <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 pt-2">
              <input 
                type="checkbox" 
                className="mt-0.5 sm:mt-1 w-3 h-3 sm:w-4 sm:h-4" 
              />
              <p className="flex-1">
                By signing up, you agree to our{" "}
                <span className="text-black font-semibold">
                  Terms & Conditions
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="bg-[#F3FF3D] rounded-full py-2.5 sm:py-3 w-full text-black font-semibold hover:bg-[#e9f728] transition-colors text-sm sm:text-base"
            >
              Sign Up
            </button>

            <p className="text-center text-xs sm:text-sm mt-1">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#00BFA6] font-medium cursor-pointer hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
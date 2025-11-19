import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-24">
      <div className="max-w-5xl w-full bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
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
          <h2 className="text-lg md:text-2xl text-[#1A1A1A] font-bold text-center">
            Welcome Back!
          </h2>
          <p className="text-xs md:text-base text-[#666666] mb-6 sm:mb-8 text-center">
            Log in to manage your bookings and explore new stays
          </p>

          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none transition-all duration-200 ease-in-out focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none transition-all duration-200 ease-in-out focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <section className="flex items-center gap-2 text-xs sm:text-sm text-[#666666] pt-2">
                <input
                  type="checkbox"
                  className="mt-0.5 sm:mt-1 w-3 h-3 sm:w-4 sm:h-4"
                />
                <p>Remember Me</p>
              </section>
              <button className="py-2.5 sm:py-3 text-[#44475A] text-xs md:text-base font-medium cursor-pointer">
                Forget Password?
              </button>
            </div>

            <Link
              href="/user_dashboard"
              className="block bg-[#0D0BA8] rounded-full py-2.5 sm:py-3 w-full text-white font-semibold hover:bg-[#2A32FF] transition-colors text-sm sm:text-base text-center"
            >
              Login
            </Link>

            <p className="text-center text-xs sm:text-sm text-[#666666] mt-1">
              New to IndHostel?{" "}
              <Link href="/signup" className="text-[#44475A] font-semibold">
                Sign Up
              </Link>{" "}
              here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

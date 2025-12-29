"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  forgetPassword,
  userLogin,
  verifyOTP,
} from "@/lib/store/actions/authActions";
import { Eye, EyeOff, X } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);

  const [loginMode, setLoginMode] = useState("password");
  const [otpStage, setOtpStage] = useState("initial");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpForUI, setOtpForUI] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forget password modal states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  // console.log(redirect);

  // const handleLoginSuccess = () => {
  //   if (redirect === "checkout") {
  //     router.replace("/checkout");
  //   } else {
  //     router.replace("/"); // or dashboard
  //   }
  // };

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleOtpMode = () => {
    setLoginMode("otp");
    setOtp("");
    setOtpStage("initial");
  };

  const handleGetOtp = async () => {
    if (mobile.length !== 10) {
      toast.error("Enter valid 10-digit mobile number");
      return;
    }

    setOtpSending(true);

    try {
      const res = await dispatch(userLogin({ phone: mobile })).unwrap();
      setOtpForUI(res.otp);
      toast.success(res.message || "OTP sent!");
      setOtpStage("sent");
    } catch (err) {
      toast.error(err?.message || "Failed to send OTP");
    } finally {
      setOtpSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    if (loginMode === "password") {
      if (!password) {
        toast.error("Password is required");
        return;
      }

      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be 8 chars with 1 uppercase, 1 number & 1 special"
        );
        return;
      }

      try {
        const res = await dispatch(
          userLogin({ phone: mobile, password })
        ).unwrap();

        toast.success(res.message || "Login successful!");
        if (redirect === "checkout") {
          router.back();
        } else {
          router.replace("/user_dashboard");
        }
      } catch (err) {
        toast.error(err?.message || "Login failed");
      }
      return;
    }

    if (loginMode === "otp") {
      if (otpStage === "initial") {
        toast.error("Click 'Get OTP' first");
        return;
      }

      if (otp.length !== 4) {
        toast.error("OTP must be exactly 4 digits");
        return;
      }

      try {
        const res = await dispatch(verifyOTP(otp)).unwrap();
        toast.success(res.message || "OTP verified!");
        if (redirect === "checkout") {
          router.back();
        } else {
          router.replace("/user_dashboard");
        }
      } catch (err) {
        if (err?.message === "Time expired, Please login again") {
          setOtpStage("initial");
          setOtp("");
          toast.error("OTP expired, request again.");
          return;
        }
        toast.error(err?.message || "Invalid OTP");
      }
    }
  };

  // 🚀 SEND RESET PASSWORD EMAIL
  const handleSendResetLink = async () => {
    if (!resetEmail.includes("@")) {
      toast.error("Enter valid registered email!");
      return;
    }

    try {
      const res = await dispatch(
        forgetPassword({ email: resetEmail })
      ).unwrap();
      // console.log(res);
      toast.success(res?.message);
      setShowForgotModal(false);
      setResetEmail("");
    } catch (err) {
      toast.error(err?.message || "Failed to send reset link");
    }
  };

  return (
    <>
      {/* ========== FORGET PASSWORD MODAL ========== */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl text-center shadow-lg p-6 relative">
            {/* Close button */}
            <button
              className="absolute right-4 top-4 text-gray-600"
              onClick={() => setShowForgotModal(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-2">Reset Password</h2>
            <p className="text-gray-600 text-sm mb-4">
              Enter your registered email to receive reset password link.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-md mb-4"
              required
            />

            <button
              onClick={handleSendResetLink}
              className="w-1/2 bg-[#0D0BA8] text-white py-3 rounded-full hover:bg-[#2A32FF] cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* ========== LOGIN PAGE UI ========== */}
      <div className="flex items-center justify-center bg-gray-100 px-4 sm:px-8 lg:px-20 sm:py-12 lg:py-24">
        <div className="max-w-6xl w-full bg-white rounded-xl sm:rounded-2xl shadow-lg grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* LEFT SIDE IMAGE */}
          <div className="relative h-[300px] sm:h-[350px] lg:h-auto">
            <Image
              src="/images/auth.png"
              alt="banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 sm:px-8 lg:px-10">
              <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
                Find Your Perfect Stay with IndHostel
              </h2>
              <p className="text-white/90 mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg">
                PGs, Hostels and More — Book verified stays instantly
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="p-4 sm:p-8 md:p-10">
            <h2 className="text-lg md:text-2xl font-bold text-center">
              Welcome Back!
            </h2>
            <p className="text-xs md:text-base text-center text-[#666] mb-6">
              Log in to manage your bookings and explore new stays
            </p>

            {/* LOGIN MODE SWITCH */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-full text-sm ${
                  loginMode === "password"
                    ? "bg-[#0D0BA8] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setLoginMode("password")}
              >
                Password Login
              </button>

              <button
                className={`px-4 py-2 rounded-full text-sm ${
                  loginMode === "otp"
                    ? "bg-[#0D0BA8] text-white"
                    : "bg-gray-200"
                }`}
                onClick={handleOtpMode}
              >
                OTP Login
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* MOBILE FIELD */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter 10 digit mobile"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => {
                    const num = e.target.value.replace(/\D/g, "");
                    if (num.length <= 10) setMobile(num);
                  }}
                  className="w-full border px-4 h-12 rounded-md text-sm"
                />
              </div>

              {/* PASSWORD FIELD */}
              {loginMode === "password" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Password</label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-4 h-12 rounded-md text-sm"
                      />

                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Forget password button */}
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="font-medium text-[#2A32FF] cursor-pointer"
                    >
                      Forget Password?
                    </button>

                    {/* Login button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-1/2 mx-auto bg-[#0D0BA8] py-3 rounded-full text-white font-semibold hover:bg-[#2A32FF] cursor-pointer"
                    >
                      {loading ? "Please wait..." : "Login"}
                    </button>
                  </div>
                </>
              )}

              {/* OTP FLOW */}
              {loginMode === "otp" && (
                <>
                  {otpStage === "initial" && (
                    <button
                      type="button"
                      disabled={otpSending}
                      onClick={handleGetOtp}
                      className="w-1/2 mx-auto bg-[#0D0BA8] text-white py-3 rounded-full hover:bg-[#2A32FF]"
                    >
                      {otpSending ? "Sending..." : "Get OTP"}
                    </button>
                  )}

                  {otpStage === "sent" && (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                          Enter OTP ({`Use this OTP for now`})
                          <span className="text-lg italic font-semibold text-[#0D0BA8]">
                            ({`${otpForUI}`})
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="4 digit OTP"
                          value={otp}
                          maxLength={4}
                          onChange={(e) => {
                            const num = e.target.value.replace(/\D/g, "");
                            if (num.length <= 4) setOtp(num);
                          }}
                          className="w-full border px-4 h-12 rounded-md text-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-1/2 mx-auto bg-[#0D0BA8] py-3 rounded-full text-white font-semibold hover:bg-[#2A32FF]"
                      >
                        {loading ? "Please wait..." : "Verify OTP"}
                      </button>
                    </>
                  )}
                </>
              )}

              <p className="text-center text-xs text-[#666] mt-1">
                New to IndHostel?{" "}
                <Link
                  href="/signup"
                  className="text-[#44475A] text-sm font-semibold"
                >
                  Sign Up
                </Link>{" "}
                here
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

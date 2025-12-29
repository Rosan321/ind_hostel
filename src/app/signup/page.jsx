"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { userSignup, verifyOTP } from "@/lib/store/actions/authActions";
import { resetSignupState } from "@/lib/store/reducers/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import VerifyOTP from "@/components/VerifyOTP";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, success, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    istermsandConditions: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpForUI, setOtpForUI] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?!.*\s).{8,}$/;

    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
      );
      return;
    }

    if (!formData.istermsandConditions) {
      toast.info("Please accept the Terms & Conditions");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    const payload = {
      fullname: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmpassword: formData.confirmpassword,
      istermsandConditions: formData.istermsandConditions,
    };

    dispatch(userSignup(payload))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Signup successful!");
        // console.log(res)
        setOtpForUI(res.otp)
      })
      .catch((err) => {
        toast.error(err?.message || "Signup failed");
        if (error.message === "User already exists") {
          setOtpModalOpen(true);
        }
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      setOtpModalOpen(true);
    }
  }, [error, success]);

  const handleVerifyOtp = async (otp) => {
    try {
      if (otp.length !== 4) {
        toast.warning("Please enter a valid 4-digit OTP");
        return;
      }

      const res = await dispatch(verifyOTP(otp)).unwrap();

      toast.success(res?.message || "OTP verified successfully!");

      if (
        res?.message ===
        "Account not verified. A new OTP has been sent,pls verify"
      )
        return;

      setOtpModalOpen(false);
      dispatch(resetSignupState());

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      toast.error(err?.message || "Invalid OTP");
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 lg:px-20">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold">
        Create an Account
      </h1>
      <p className="text-center text-[#666666] mt-2 text-sm md:text-base max-w-md mx-auto px-4">
        Join IndHostel to book stays, manage favorites, and more
      </p>

      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* LEFT IMAGE */}
        <div className="relative h-[300px] sm:h-[350px] lg:h-auto w-full">
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

          {error && (
            <p className="text-center text-red-600 text-sm mb-4">{error}</p>
          )}
          {success && (
            <p className="text-center text-green-600 text-sm mb-4">
              Signup Successful! Redirecting...
            </p>
          )}

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* NAME + EMAIL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>
            </div>

            {/* PHONE + PASSWORD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none focus:shadow-[0_2px_0_0_#F3FF3D]"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-2">
                <label className="text-sm font-medium">Password</label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none pr-10 focus:shadow-[0_2px_0_0_#F3FF3D]"
                  />

                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="text-sm font-medium">Confirm Password</label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full border border-[#D0D5DD] bg-white px-3 sm:px-4 h-10 sm:h-12 rounded-md text-sm outline-none pr-10 focus:shadow-[0_2px_0_0_#F3FF3D]"
                />

                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </span>
              </div>
            </div>

            {/* TERMS CHECKBOX */}
            <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 pt-2">
              <input
                type="checkbox"
                name="istermsandConditions"
                checked={formData.istermsandConditions}
                onChange={handleChange}
                className="mt-0.5 sm:mt-1 w-3 h-3 sm:w-4 sm:h-4"
              />
              <p className="flex-1">
                By signing up, you agree to our{" "}
                <span className="text-black font-semibold">
                  Terms & Conditions
                </span>
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0D0BA8] rounded-full py-2.5 sm:py-3 w-full text-[#FFF] font-semibold hover:bg-[#2A32FF] transition-colors cursor-pointer"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-xs sm:text-sm mt-1">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#666666] font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
      <VerifyOTP
        isOpen={otpModalOpen}
        otpForUI={otpForUI}
        onClose={() => setOtpModalOpen(false)}
        onVerify={handleVerifyOtp}
      />
    </section>
  );
}

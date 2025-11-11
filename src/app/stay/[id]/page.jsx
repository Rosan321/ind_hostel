import BookingSummary from "@/components/BookingSummary";
import ImageThumbnail from "@/components/ImageThumbnail";
import Location from "@/components/Location";
import { ReviewCard } from "@/components/ReviewCard";
import SimilarLike from "@/components/SimilarLike";
import Hero from "@/components/stay_by_city/Hero";
import TypesOfRoom from "@/components/TypesOfRoom";
import {
  AirVent,
  Bed,
  CircleCheck,
  CircleParking,
  Phone,
  ShieldCheck,
  ShowerHead,
  UserRoundCog,
  Utensils,
  WashingMachine,
  Wifi,
} from "lucide-react";

const pgList = [
  {
    id: "1",
    title: "UrbanNest PG - Cozy Stay in Bandra, Mumbai",
    location: "Bandra West, Mumbai | Near Linking Road",
    images: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 2999,
    badge: "Verified Stay",
  },
];

const amenities = [
  { icon: <Bed />, label: "Comfortable Beds" },
  { icon: <Wifi />, label: "Free WiFi" },
  { icon: <WashingMachine />, label: "Laundry Service" },
  { icon: <CircleParking />, label: "Parking" },
  { icon: <AirVent />, label: "Air Conditioning" },
  { icon: <ShieldCheck />, label: "24x7 Security" },
  { icon: <ShowerHead />, label: "Attached Bathroom" },
];

const tags = [
  { icon: <CircleCheck size={15} />, label: "Verified" },
  { icon: <Wifi size={15} />, label: "Free WiFi" },
  { icon: <Utensils size={15} />, label: "Meals included" },
  { icon: <UserRoundCog size={15} />, label: "24/7 Security" },
];

const propertyDetails = [
  {
    label: "Property Type",
    value: "PG (Paying Guest)",
    type: "text",
  },
  {
    label: "Room Types",
    value: ["Single", "Double", "Shared"],
    type: "tags",
  },
  {
    label: "Check-in Time",
    value: {
      main: "From 12:00 PM",
      sub: "Early check-in on request",
    },
    type: "withSubtext",
  },
  {
    label: "Cancellation",
    value: {
      main: "Free cancellation within 24 hrs",
      action: {
        text: "View policy",
        type: "link",
      },
    },
    type: "withAction",
  },
  {
    label: "Max Guests",
    value: "2 Adults",
    type: "text",
  },
  {
    label: "Host Contact",
    value: {
      name: "Asha",
      note: "Contact available after booking",
      action: {
        text: "Message Host",
        type: "button",
        icon: "phone",
      },
    },
    type: "contact",
  },
];

export default function Page({ searchParams }) {
  const id = searchParams?.id;
  const data = pgList.find((pg) => pg.id === id) || pgList[0];

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        <p>PG not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50">
      <Hero />

      {/* ---------- Image Section ---------- */}
      <section className="py-10 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* ---------- Image Gallery ---------- */}
          <ImageThumbnail images={data.images} badge={data.badge} />

          {/* ---------- Layout Grid ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-4 xl:gap-8">
            {/* LEFT CONTENT AREA */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* ---------- PG Details ---------- */}
              <article className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <header>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
                    {data.title}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">
                    {data.location}
                  </p>
                </header>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((t, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100"
                    >
                      {t.icon}
                      <span>{t.label}</span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  Experience comfort and community living at this fully
                  furnished PG — perfect for students and professionals. Enjoy
                  high-speed WiFi, home-cooked meals, and 24/7 security.
                </p>

                {/* ---------- Property Highlights ---------- */}
                <section className="space-y-4">
                  {propertyDetails.map((item, index) => (
                    <div key={index} className="flex items-start sm:gap-8">
                      {/* Left Side - Label */}
                      <div className="flex items-start gap-3 w-38">
                        <CircleCheck
                          size={18}
                          className="shrink-0 mt-0.5"
                          stroke="white"
                          fill="#44475A"
                        />

                        <p className="text-[#1A1A1A] font-semibold text-base">
                          {item.label}:
                        </p>
                      </div>

                      {/* Right Side - Value (Dynamic Rendering based on type) */}
                      <div className="flex-1 text-[#666666] text-sm">
                        {item.type === "text" && <span>{item.value}</span>}

                        {item.type === "tags" && (
                          <div className="flex flex-wrap gap-2">
                            {item.value.map((type) => (
                              <span
                                key={type}
                                className="border border-[#D0D0D0] text-[#666666] text-xs sm:text-sm font-medium rounded-full px-3 py-1"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.type === "withSubtext" && (
                          <div className="flex flex-col md:flex-row md:gap-6 lg:flex-col lg:gap-0 xl:flex-row xl:gap-6 gap-1 text-[#666666]">
                            <span>{item.value.main}</span>
                            <span className="text-xs text-[#888888]">
                              {item.value.sub}
                            </span>
                          </div>
                        )}

                        {item.type === "withAction" && (
                          <div className="flex flex-col md:flex-row md:gap-6 lg:flex-col lg:gap-0 xl:flex-row xl:gap-6 gap-1 text-gray-600">
                            <span>{item.value.main}</span>
                            <button className="text-[#666666] underline text-sm text-left w-fit">
                              {item.value.action.text}
                            </button>
                          </div>
                        )}

                        {item.type === "contact" && (
                          <div className="flex flex-col md:flex-row md:gap-6 lg:flex-col lg:gap-0 xl:flex-row xl:gap-6 gap-1 text-gray-600">
                            <div className="flex items-center gap-1">
                              <span>{item.value.name}</span>
                              <span className="text-xs text-gray-400">
                                ({item.value.note})
                              </span>
                            </div>
                            <button className="flex items-center gap-3 text-[#666666] text-sm w-fit">
                              <Phone size={16} />
                              {item.value.action.text}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </section>
              </article>

              {/* ---------- Amenities ---------- */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                  Amenities & Facilities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 hover:shadow-sm transition"
                    >
                      <div className="w-8 h-8 flex items-center justify-center text-emerald-600 bg-white rounded-full border border-gray-200">
                        {item.icon}
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 self-start">
              <BookingSummary basePrice={data.basePrice} />
            </aside>
          </div>

          {/* ---------- Additional Sections ---------- */}
          <section className="mt-10 space-y-10">
            <TypesOfRoom />

            <Location />

            {/* Reviews */}
            <section className="mt-6">
              <ReviewCard />
            </section>
            <SimilarLike />
          </section>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return pgList.map((pg) => ({
    id: pg.id,
  }));
}

import BookingSummary from "@/components/BookingSummary";
import ImageThumbnail from "@/components/ImageThumbnail";
import Location from "@/components/Location";
import { ReviewCard } from "@/components/ReviewCard";
import {
  AirVent,
  Bed,
  CircleCheck,
  CircleParking,
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
  // {
  //   id: "2",
  //   title: "SkyLodge PG - Premium Living in Andheri, Mumbai",
  //   location: "Andheri East, Mumbai | Near Metro Station",
  //   images: [
  //     "/images/room-2.jpg",
  //     "/images/room-3.jpg",
  //     "/images/room-4.jpg",
  //     "/images/room-1.jpg",
  //   ],
  //   basePrice: 3499,
  //   badge: "Top Rated",
  // },
];

const amenities = [
  {
    icon: <Bed />,
    ame: "Comfortable Beds"
  },
  {
    icon: <Wifi />,
    ame: "Free WiFi"
  },
  {
    icon: <Bed />,
    ame: "Comfortable Beds"
  },
  {
    icon: <WashingMachine />,
    ame: "Laundry Service"
  },
  {
    icon: <CircleParking />,
    ame: "Parking"
  },
  {
    icon: <AirVent />,
    ame: "Air Conditioning"
  },
  {
    icon: <ShieldCheck />,
    ame: "24x7 Security"
  },
  {
    icon: <ShowerHead />,
    ame: "Attached Bathroom"
  },
];

const tags = [
  {
    icon: <CircleCheck size={15} />,
    tag: "Verified",
  },
  {
    icon: <Wifi size={15} />,
    tag: "Free WiFi",
  },
  {
    icon: <Utensils size={15} />,
    tag: "Meals included",
  },
  {
    icon: <UserRoundCog size={15} />,
    tag: "24/7 Security",
  },
];

export default function Page({ searchParams }) {
  const id = searchParams.id;
  console.log("searchParams.id =", id);

  // const data = pgList.find((pg) => pg.id === id);
  const data = pgList.map((it) => it.images);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        <p>PG not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-10">
      {/* ---------- Image Section ---------- */}
      <div className="w-full mx-auto mb-6 space-y-4">
        <ImageThumbnail images={data[0]} badge={data.badge} />
      </div>

      {/* ---------- Main Content ---------- */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Title & Tags */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-1">
              {data.title}
            </h2>
            <div className="text-sm md:text-base text-gray-500 mb-4">
              {data.location}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((t, i) => (
                <div
                  key={i}
                  className="text-xs md:text-sm bg-emerald-50 text-emerald-700 px-2 md:px-3 py-1 rounded-full border flex items-center gap-2"
                >
                  {t.icon}
                  <p>{t.tag}</p>
                </div>
              ))}
            </div>

            <p className="text-sm md:text-base text-gray-600 mb-4">
              Experience comfort and community living at this fully furnished PG
              — perfect for students and professionals. High-speed WiFi,
              home-cooked meals, and 24/7 security.
            </p>

            {/* Highlights List */}
            <div className="grid grid-cols-1 gap-y-3 gap-x-6 text-sm md:text-base text-gray-700 pt-2">
              {/* Each highlight flex adjusts spacing */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <CircleCheck
                  size={16}
                  className="text-emerald-600 mt-0.5 md:mt-0"
                />
                <span className="flex items-center gap-4">
                  <strong>Property Type:</strong> PG (Paying Guest)
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <CircleCheck
                  size={16}
                  className="text-emerald-600 mt-0.5 md:mt-0"
                />
                <section className="flex items-start md:items-center gap-6 flex-wrap">
                  <strong>Room Types:</strong>
                  <section className="flex items-center gap-2 flex-wrap">
                    <p className="border border-gray-300 px-2 py-1 rounded-full text-xs md:text-sm">
                      Single
                    </p>
                    <p className="border border-gray-300 px-2 py-1 rounded-full text-xs md:text-sm">
                      Double
                    </p>
                    <p className="border border-gray-300 px-2 py-1 rounded-full text-xs md:text-sm">
                      Shared
                    </p>
                  </section>
                </section>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <CircleCheck
                  size={16}
                  className="text-emerald-600 mt-0.5 md:mt-0"
                />
                <span className="flex items-center gap-4">
                  <strong>Check‑in time:</strong> From 12:00 PM{" "}
                  <span className="text-gray-500 text-xs">
                    (Early check‑in on request)
                  </span>
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <CircleCheck
                  size={16}
                  className="text-emerald-600 mt-0.5 md:mt-0"
                />
                <span className="flex items-center gap-6">
                  <strong>Cancellation:</strong> Free cancellation within 24 hrs
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <CircleCheck
                  size={16}
                  className="text-emerald-600 mt-0.5 md:mt-0"
                />
                <span className="flex items-center gap-7">
                  <strong>Max Guests:</strong> 2 Adults
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <CircleCheck
                  size={16}
                  className="text-emerald-600 mt-0.5 md:mt-0"
                />
                <span className="flex items-center gap-4">
                  <strong>Host Contact:</strong> Asha (Available after booking)
                </span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-4 bg-white rounded-xl p-4 md:p-6 shadow">
            <h3 className="text-sm md:text-base font-semibold mb-4">
              Amenities & Facilities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((it, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 md:p-3 shadow-md rounded-lg"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 rounded-full bg-gray-100 grid place-items-center text-xs md:text-sm">
                    {it.icon}
                  </div>
                  <div className="text-sm md:text-base text-gray-700">{it.ame}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="w-full">
          <BookingSummary basePrice={data.basePrice} />
        </div>
        <div className="md:col-span-2 space-y-4">
          <ReviewCard />
        </div>
      <Location />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return pgList.map((pg) => ({
    id: pg.id,
  }));
}

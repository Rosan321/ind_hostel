"use client";

import { CircleCheck, Star } from "lucide-react";
import AnimatedCard from "./animations/AnimatedCard";

const ImageThumbnail = ({ data }) => {
  const mainImage = data?.images_url?.[0] ?? null;
  const otherImages = data?.images_url?.length > 1 ? data?.images_url.slice(1) : [];


  // console.log(data)

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-8">
      {/* Main large image */}
      <div className="relative w-full md:flex-1 max-w-full rounded-lg overflow-hidden shadow-lg">
        {mainImage ? (
          <AnimatedCard>
            <img
              src={mainImage}
              alt="main"
              className="object-cover w-full h-[300px] sm:h-[396px] lg:h-[608px]"
            />
          </AnimatedCard>
        ) : (
          <div className="w-full h-[300px] sm:h-[420px] md:h-[480px] bg-gray-200 flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}

        {/* VERIFIED BADGE */}
        <section
          className="
          flex items-center gap-1 sm:gap-2 absolute left-2 sm:left-4 top-2 sm:top-4
          bg-[#44475A] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full
          text-[10px] sm:text-sm shadow
        "
        >
          <CircleCheck size={14} className="sm:w-4 sm:h-4" />
          <p className="font-medium">{data?.isverified && "Verified Stay"}</p>
        </section>

        {/* RATING BADGE */}
        <section
          className="
          flex items-center gap-1 sm:gap-2 absolute left-2 sm:left-4 bottom-2 sm:bottom-4
          bg-[#0D0BA8] px-2 sm:px-3 py-1 sm:py-2 rounded-lg
          text-[10px] sm:text-sm shadow
        "
        >
          <Star fill="#FFF" size={14} className="sm:w-4 sm:h-4" />
          <p className="font-medium text-[#FFF]">{data?.avgRating?.toFixed(1)} / 5 ({data?.totalRatings} Reviews)</p>
        </section>

        {/* PRICE BADGE */}
        <section
          className="
          flex items-baseline absolute right-2 sm:right-4 bottom-2 sm:bottom-4
          bg-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow
        "
        >
          <h3 className="text-base sm:text-xl lg:text-2xl font-bold">
            {data?.room_id?.[0]?.pricing_id?.pricing?.[0]?.price}/
          </h3>
          <p className="text-[10px] sm:text-sm text-[#666666] font-medium">
            {data?.room_id?.[0]?.pricing_id?.pricing?.[0]?.price_type}
          </p>
        </section>
      </div>

      {/* Thumbnails */}
      {otherImages.length > 0 && (
        <div className="flex flex-col w-full md:w-[35%] space-y-4 lg:space-y-8">
          {/* First Image Full Width */}
          <AnimatedCard>
            <div className="w-full h-48 sm:h-62 lg:h-96 rounded-lg overflow-hidden">
              <img
                src={otherImages[0]}
                alt="main-image"
                className="object-cover w-full h-full"
              />
            </div>
          </AnimatedCard>

          {/* Next 2 Images Side by Side */}
          {otherImages.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {otherImages.slice(1, 2).map((img, i) => (
                <AnimatedCard key={i}>
                  <div
                    className="rounded-lg overflow-hidden h-32 sm:h-32 lg:h-48 shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageThumbnail;

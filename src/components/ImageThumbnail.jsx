"use client";

import { CircleCheck, Star } from "lucide-react";
import AnimatedCard from "./animations/AnimatedCard";

const ImageThumbnail = ({ images = [] }) => {
  const mainImage = images[0];
  const otherImages = images.slice(1); // remaining images

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {/* Main large image */}
      <div className="relative w-full md:flex-1 max-w-full rounded-lg overflow-hidden shadow-lg">
        {mainImage ? (
          <AnimatedCard>
            <img
              src={mainImage}
              alt="main"
              className="object-cover w-full h-[300px] sm:h-[420px] md:h-[594px]"
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
          <p className="font-medium">Verified Stay</p>
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
          <p className="font-medium text-[#FFF]">4.8 / 5 (210 Reviews)</p>
        </section>

        {/* PRICE BADGE */}
        <section
          className="
          flex items-baseline gap-1 absolute right-2 sm:right-4 bottom-2 sm:bottom-4
          bg-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow
        "
        >
          <h3 className="text-base sm:text-xl lg:text-2xl font-bold">
            From ₹2,999 /
          </h3>
          <p className="text-[10px] sm:text-sm text-[#666666] font-medium">
            night
          </p>
        </section>
      </div>

      {/* Thumbnails */}
      {otherImages.length > 0 && (
        <div className="flex flex-col w-full md:w-[35%] space-y-4">
          {/* First Image Full Width */}
          <AnimatedCard>
            <div className="w-full h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden">
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
              {otherImages.slice(1).map((img, i) => (
                <AnimatedCard key={i}>
                  <div
                    className="rounded-lg overflow-hidden h-32 sm:h-40 md:h-48 shadow-sm"
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

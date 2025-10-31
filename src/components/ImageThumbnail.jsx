"use client";

import { CircleCheck, Star } from "lucide-react";
import Image from "next/image";

const ImageThumbnail = ({ badge, images = [] }) => {
  const mainImage = images[0];
  const otherImages = images.slice(1); // remaining images

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {/* Main large image */}
      <div className="relative w-full md:flex-1 max-w-full rounded-lg overflow-hidden shadow-lg">
        {mainImage ? (
          <Image
            src={mainImage}
            alt="main"
            width={1020}
            height={594}
            className="object-cover w-full h-[300px] sm:h-[420px] md:h-[594px]"
          />
        ) : (
          <div className="w-full h-[300px] sm:h-[420px] md:h-[480px] bg-gray-200 flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}

        {badge && (
          <div className="absolute left-4 top-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow">
            {badge}
          </div>
        )}

        <section className="flex items-center gap-2 absolute left-4 top-4 bg-[#00BFA6] text-white px-4 py-2 rounded-full">
            <CircleCheck size={15} />
            <p className="font-medium text-sm">
            Verified Stay
            </p>
        </section>
        <section className="flex items-center gap-2 absolute left-4 bottom-4 bg-[#F1FF51] px-3 py-2 rounded-lg">
            <Star fill="#1A1A1A" size={15} />
            <p className="font-medium text-sm text-[#1A1A1A]">
            4.8 / 5 (210 Reviews)
            </p>
        </section>
        <section className="flex items-center absolute right-4 bottom-4 bg-white px-3 py-1 rounded-lg shadow ">
            <h3 className="text-2xl font-bold">
            From ₹2,999 /
            </h3>
            <p className="mt-2 text-[#666666] font-medium">night</p>
        </section>
      </div>

      {/* Thumbnails */}
      {otherImages.length > 0 && (
        <div className="flex flex-col w-full md:w-[35%] space-y-4">
          {/* First Image Full Width */}
          <div className="w-full h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={otherImages[0]}
              alt="main-image"
              width={800}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Next 2 Images Side by Side */}
          {otherImages.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {otherImages.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden h-32 sm:h-40 md:h-48 shadow-sm"
                >
                  <Image
                    src={img}
                    alt={`thumb-${i}`}
                    width={320}
                    height={220}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageThumbnail;

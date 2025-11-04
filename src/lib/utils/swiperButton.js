import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

const SwiperButton = ({ id, title, className, showIcon, rt }) => {
  return (
    <Link
      href={`${rt ? rt : `/stay/${id}`}`}
      className={clsx(
        "btn-wiper-bg rounded-full transition-all duration-300",
        className || "text-sm md:text-base font-medium"
      )}
    >
      <span className="btn-wiper-bg-content flex items-center justify-center gap-2">
        {title}
        {showIcon && <ArrowRight size={18} />}
      </span>
    </Link>
  );
};

export default SwiperButton;

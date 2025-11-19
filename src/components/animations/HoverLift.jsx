"use client";

import { motion } from "framer-motion";

export default function HoverLift({
  children,
  scale = 1.05,
  shadow = "0px 12px 30px rgba(0,0,0,0.15)",
  duration = 0.3,
  className = "h-full my-3 shadow-xl",
}) {
  return (
    <motion.div
      whileHover={{
        scale,
        boxShadow: shadow,
      }}
      whileTap={{ scale: scale * 0.97 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

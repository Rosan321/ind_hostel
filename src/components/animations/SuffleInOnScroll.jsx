"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function ShuffleInOnScroll({
  children,
  delay = 0.1,
  duration = 0.6,
  intensity = 60,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  // Store random values ONLY after client mounts
  const [rand, setRand] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setRand({
      x: (Math.random() - 0.5) * intensity,
      y: (Math.random() - 0.5) * intensity,
    });
  }, [intensity]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: rand.x, y: rand.y, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: rand.x, y: rand.y, scale: 0.95 }
      }
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

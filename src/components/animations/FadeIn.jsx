"use client";

import { motion } from "framer-motion";

export default function FadeIn({ children, delay = 0.1, duration = 0.6, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

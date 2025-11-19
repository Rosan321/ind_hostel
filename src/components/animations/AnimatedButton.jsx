"use client";

import { motion } from "framer-motion";

export default function AnimatedButton({ children, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

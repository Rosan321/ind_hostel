"use client";
import { motion } from "framer-motion";

export default function ScaleIn({ children, delay = 0.1, scale = 0.95 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

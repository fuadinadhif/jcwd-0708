"use client";

import { motion } from "motion/react";

export default function MotionDev() {
  return (
    <main>
      <h1>Motion Dev</h1>
      <motion.div
        drag
        className="w-20 h-20 bg-sky-500 rounded-2xl"
      ></motion.div>
    </main>
  );
}

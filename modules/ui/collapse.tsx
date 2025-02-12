import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CollapseProps {
  isOpen: boolean;
  children: ReactNode;
}

export default function Collapse({ isOpen, children }: CollapseProps) {
  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden bg-gray-100 rounded-lg shadow p-4 dark:bg-gray-800"
    >
      {isOpen && children}
    </motion.div>
  );
}

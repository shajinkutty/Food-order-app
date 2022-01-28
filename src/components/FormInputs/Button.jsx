import React from "react";
import { motion } from "framer-motion";

function Button({ name, onClick }) {
  return (
    <motion.button
      className="button-primary"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {name}
    </motion.button>
  );
}

export default Button;

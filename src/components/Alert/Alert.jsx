import "./alert.css";
import { motion, AnimatePresence } from "framer-motion";

function Alert({ message }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="alert-container"
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}

export default Alert;

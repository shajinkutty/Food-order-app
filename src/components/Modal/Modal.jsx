import "./modal.css";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegWindowClose } from "react-icons/fa";
import Alert from "../Alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearAlertMessage } from "../../redux/userSlice";

export default function Modal({ open, handleClose, children }) {
  const { alertMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearAlertMessage());
    }, 2000);

    return () => clearTimeout(timer);
  }, [alertMessage, dispatch]);

  const backDrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const modal = {
    hidden: { y: "100vh" },
    visible: { y: 0, transition: { delay: 0.1 } },
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="backdrop"
          variants={backDrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <motion.div
              className="close-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
            >
              <FaRegWindowClose size={40} />
            </motion.div>
            {alertMessage && <Alert message={alertMessage} />}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

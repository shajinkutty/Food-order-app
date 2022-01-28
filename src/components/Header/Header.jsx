import "./header.css";
import { FaShoppingCart, FaRegListAlt, FaUserAlt } from "react-icons/fa";
import { CgMenuRightAlt } from "react-icons/cg";
import {
  MdOutlineRestaurantMenu,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../Modal/Modal";
import Branches from "../Branches.jsx/Branches";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setDelivery } from "../../redux/userSlice";

const links = [
  {
    id: 1,
    name: "Menu",
    linkTo: "/",
    icon: <MdOutlineRestaurantMenu size={25} />,
  },
  {
    id: 2,
    name: "Order",
    linkTo: "/order",
    icon: <FaRegListAlt size={25} />,
  },
  {
    id: 3,
    name: "Profile",
    linkTo: "/profile",
    icon: <FaUserAlt size={25} />,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const { isDelivery } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const backdrop = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 200 },
  };
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="container">
          <div className="navbar">
            <div className="options">
              {pathname !== "/" ? (
                <motion.div
                  className="back__button"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <MdOutlineArrowBackIosNew
                    size={40}
                    onClick={() => navigate(pathname === "/order" ? "/" : -1)}
                    cursor="pointer"
                  />
                </motion.div>
              ) : (
                <motion.ul
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  layoutId="2"
                  exit={{ opacity: 0, x: -100 }}
                >
                  <li
                    className={isDelivery && !isModalOpen ? "active" : null}
                    onClick={() => {
                      dispatch(setDelivery());
                    }}
                  >
                    Delivery
                  </li>
                  <li
                    className={!isDelivery || isModalOpen ? "active" : null}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Pickup
                  </li>
                </motion.ul>
              )}
            </div>

            <motion.div className="cart" whileTap={{ scale: 0.9 }}>
              <Link to={items.length > 0 && "/cart"}>
                <FaShoppingCart size={50} color="#2b2b2b" />
              </Link>
              {items.length > 0 && (
                <motion.span initial={{ scale: 0.1 }} animate={{ scale: 1 }}>
                  {items.length}
                </motion.span>
              )}
            </motion.div>
            <div className="menu-icon">
              {isMenuOpen ? (
                <GrClose
                  size={50}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <CgMenuRightAlt
                  size={50}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{ cursor: "pointer" }}
                />
              )}

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="menu-items"
                    variants={backdrop}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.ul>
                      {links.map((link) => (
                        <div key={link.id}>
                          <Link to={link.linkTo}>
                            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
                              {link.icon}
                              {link.name}
                            </li>
                          </Link>
                        </div>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
      <Modal
        open={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
          dispatch(setDelivery());
        }}
      >
        <Branches
          handleSelect={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
}

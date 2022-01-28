import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { decreaseQty, increaseQty, removeItem } from "../../redux/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal/Modal";
import AddUserDetails from "../Profile/AddUserDetails";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../FormInputs/Button";

function Cart() {
  const { items, totalPayment } = useSelector((state) => state.cart);
  const { isUserActive } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="container viewport">
        <div className="cart-details">
          <div className="cart-details__body">
            {items.length <= 0 ? (
              <div className="alert__message">Cart is empty</div>
            ) : (
              ""
            )}

            <div className="cart-details__items">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    className="cart-details__item"
                    key={item.id}
                    exit={{ opacity: 0 }}
                  >
                    <h3>{item.productName}</h3>
                    <div>Size: {item.size}</div>
                    <div className="item__quantity">
                      Qty:
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <FiMinusCircle
                          onClick={() =>
                            item.quantity > 1
                              ? dispatch(decreaseQty({ id: item.id }))
                              : null
                          }
                        />
                      </motion.div>
                      <span>{item.quantity}</span>
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <FiPlusCircle
                          onClick={() => dispatch(increaseQty({ id: item.id }))}
                        />
                      </motion.div>
                    </div>

                    <div>Price: {item.totalPrice * item.quantity}</div>
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="delete-cart"
                    >
                      <FaTrash
                        onClick={() => dispatch(removeItem({ id: item.id }))}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="cart-details__price">
              <h3>SUB TOTAL : {totalPayment} INR</h3>
            </div>
          </div>
          <div className="cart-details__footer">
            {totalPayment > 0 && (
              <Button
                name="Place Order"
                onClick={() => {
                  isUserActive ? navigate("/payment") : setModalOpen(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <AddUserDetails />
      </Modal>
    </>
  );
}

export default Cart;

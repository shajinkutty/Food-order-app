import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCreditCard,
  FaMoneyBill,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import "./payment.css";
import Button from "../FormInputs/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cartSlice";
import { submitOrder } from "../../redux/userSlice";

function Payment() {
  const [paymentType, setPaymentType] = useState("Credit Card");
  const { totalPayment } = useSelector((state) => state.cart);
  const { isDelivery } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="container viewport">
      <div className="payment">
        <div className="payment-body">
          <div className="payment_left">
            <h3>Choose payment method</h3>
            <div className="button-group">
              <p
                style={
                  paymentType === "Credit Card"
                    ? { backgroundColor: "#000", color: "#fff" }
                    : {}
                }
                onClick={() => setPaymentType("Credit Card")}
              >
                <FaCreditCard size={25} />
                Credit Card
              </p>
              <p
                style={
                  paymentType === "Credit Card"
                    ? {}
                    : { backgroundColor: "#000", color: "#fff" }
                }
                onClick={() => setPaymentType("Cash On Delivery")}
              >
                <FaMoneyBill size={25} />
                {isDelivery ? "Cash On Delivery" : "Cash On Pickup"}
              </p>
            </div>
            <AnimatePresence>
              {paymentType === "Credit Card" && (
                <motion.div
                  className="credit-card-container"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                >
                  <div className="payment-form">
                    <div className="icon-set">
                      <FaCcVisa size={50} /> <FaCcMastercard size={50} />
                      <p>
                        As it is a Demo app, credit card payment is not enabled
                      </p>
                    </div>
                    <div className="form-input">
                      <input type="tel" placeholder="Card Number" />
                      <input type="text" placeholder="Card Holder" />
                      <div className="small">
                        <input type="text" placeholder="Valid Thru" />
                        <input type="number" placeholder="CVV" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="payment_right">
            <div className="list-item">
              <div>Price</div>
              <p>{totalPayment} INR</p>
            </div>
            <div className="list-item">
              <div>Delivery Fee</div>
              <p>50 INR</p>
            </div>
            <div className="list-item">
              <div>Sub Total</div>
              <p>{totalPayment + 50} INR</p>
            </div>
          </div>
        </div>
        <div className="payment_footer">
          <Button
            name="Confirm payment"
            onClick={() => {
              navigate("/order");
              dispatch(submitOrder());
              dispatch(clearCart());
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;

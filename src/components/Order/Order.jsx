import "./order.css";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function Order() {
  const { isDelivery, orders } = useSelector((state) => state.user);
  return (
    <div className="container viewport">
      {orders.length &&
        orders.map((order, index) => (
          <div className="order-container" key={index}>
            <h3>Order Number : {order} has been submitted</h3>
            <p>{isDelivery ? "Delivery" : "Pickup"}</p>
            <div className="progress-bar">
              <motion.div
                className="bar"
                initial={{ width: "0%" }}
                animate={{ width: "50%" }}
              ></motion.div>
            </div>
            <div className="progress">
              <div className="step">
                <IoCheckmarkCircleSharp size={30} />
                <p>Order Accept</p>
              </div>
              <div className="step">
                <IoCheckmarkCircleSharp size={30} />
                <p>Prepairing your order</p>
              </div>
              <div className="step">
                <IoCheckmarkCircleSharp size={30} color="grey" />
                <p>{isDelivery ? "Out for Delivery" : "Ready for Pickup"}</p>
              </div>
              <div className="step">
                <IoCheckmarkCircleSharp size={30} color="grey" />
                <p>Delivered</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Order;

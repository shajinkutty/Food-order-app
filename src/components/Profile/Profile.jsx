import { useState } from "react";
import "./profile.css";
import { motion } from "framer-motion";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";

import AddUserDetails from "./AddUserDetails";

function Profile() {
  const [openForm, setOpenForm] = useState(false);

  const { userProfile, isUserActive } = useSelector((state) => state.user);

  return (
    <>
      <div className="container viewport">
        <div className="profile-container">
          {isUserActive && (
            <div className="user-details">
              <p className="title">User information</p>
              <div className="details_box">
                <p className="label">Name</p>
                <h2>{userProfile.userName}</h2>
              </div>
              <div className="details_box">
                <p className="label">Mobile Number</p>
                <p>{userProfile.contactNumber}</p>
              </div>
              <div className="details_box">
                <p className="label">Delivery Address</p>
                <p>{userProfile.deliveryAddress.houseNumber}</p>
                <p>{userProfile.deliveryAddress.street}</p>
                <p>{userProfile.deliveryAddress.city}</p>
                <p>{userProfile.deliveryAddress.landmark}</p>
              </div>
            </div>
          )}
          <motion.button
            className="add-profile"
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpenForm(true)}
          >
            {isUserActive ? "Edit Details" : "Add Details"}
          </motion.button>
        </div>
      </div>
      <Modal
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
        }}
      >
        <AddUserDetails />
      </Modal>
    </>
  );
}

export default Profile;

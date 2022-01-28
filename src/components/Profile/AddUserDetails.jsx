import "./profile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addUserInfo, setAlertMessage } from "../../redux/userSlice";
import Button from "../FormInputs/Button";

function AddUserDetails() {
  const { isUserActive, userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    contactNumber: "",
    deliveryAddress: {
      houseNumber: "",
      street: "",
      city: "",
      landmark: "",
    },
  });

  useEffect(() => {
    isUserActive && setFormData(userProfile);
  }, [isUserActive]);
  const handlerChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const addressChange = (e) => {
    setFormData({
      ...formData,
      deliveryAddress: {
        ...formData.deliveryAddress,
        [e.target.name]: e.target.value,
      },
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addUserInfo(formData));
    dispatch(setAlertMessage("Account details have been updated"));
  };
  return (
    <form className="form-container" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          required
          onChange={handlerChange}
          value={formData.userName}
        />
      </div>
      <div className="form-control">
        <label htmlFor="contactNumber">Mobile Number</label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          required
          onChange={handlerChange}
          value={formData.contactNumber}
        />
      </div>
      <div className="delivery-address">
        <h4>Delivery Address Details</h4>
        <div className="form-control">
          <label htmlFor="houseNumber">House Number / Name</label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            required
            onChange={addressChange}
            value={formData.deliveryAddress.houseNumber}
          />
        </div>
        <div className="form-control">
          <label htmlFor="street">Street Name</label>
          <input
            type="text"
            id="street"
            name="street"
            required
            onChange={addressChange}
            value={formData.deliveryAddress.street}
          />
        </div>
        <div className="form-control">
          <label htmlFor="city">City Name</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            onChange={addressChange}
            value={formData.deliveryAddress.city}
          />
        </div>
        <div className="form-control">
          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            required
            onChange={addressChange}
            value={formData.deliveryAddress.landmark}
          />
        </div>
      </div>
      <Button name="Submit" />

      {/* {message && (
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="info-success"
        >
          {message}
        </motion.p>
      )} */}
    </form>
  );
}

export default AddUserDetails;

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserActive: false,
    isDelivery: true,
    userProfile: {
      userName: null,
      contactNumber: null,
      deliveryAddress: {
        houseNumber: "",
        street: "",
        city: "",
        landmark: "",
      },
    },

    pickUpLocation: {
      id: 1,
      title: "Neyyattinkara",
      location: "Near Akshaya complex",
      city: "Neyyattinkara",
      district: "Trivandrum",
    },
    alertMessage: null,
    orders: [],
  },

  reducers: {
    addUserInfo: (state, action) => {
      state.userProfile = action.payload;
      state.isUserActive = true;
      localStorage.setItem(
        "user",
        JSON.stringify({
          isUserActive: true,
          ...action.payload,
        })
      );
    },
    getUserFromLocalStorage: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const { isUserActive, ...rest } = user;

        state.isUserActive = isUserActive;
        state.userProfile = { ...rest };
      }
    },
    updateOrderType: (state, action) => {
      state.isDelivery = false;
      state.pickUpLocation = action.payload;
    },
    setDelivery: (state, action) => {
      state.isDelivery = true;
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
    clearAlertMessage: (state, action) => {
      state.alertMessage = null;
    },
    submitOrder: (state, action) => {
      state.orders.push(Math.floor(Math.random() * 255));
    },
  },
});

export const {
  addUserInfo,
  updateOrderType,
  setDelivery,
  setAlertMessage,
  clearAlertMessage,
  submitOrder,
  getUserFromLocalStorage,
} = userSlice.actions;

export default userSlice.reducer;

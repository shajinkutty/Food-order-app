import { createSlice } from "@reduxjs/toolkit";

const subTotalPrice = (items) =>
  items
    .map((i) => i.totalPrice * i.quantity)
    .reduce((prev, curr) => prev + curr, 0);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPayment: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.totalPayment =
        state.totalPayment +
        action.payload.totalPrice * action.payload.quantity;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
      state.totalPayment = subTotalPrice(state.items);
    },
    increaseQty: (state, action) => {
      state.items = state.items.map((obj) =>
        obj.id === action.payload.id
          ? { ...obj, quantity: obj.quantity + 1 }
          : obj
      );
      state.totalPayment = subTotalPrice(state.items);
    },
    decreaseQty: (state, action) => {
      state.items = state.items.map((obj) =>
        obj.id === action.payload.id
          ? { ...obj, quantity: obj.quantity - 1 }
          : obj
      );
      state.totalPayment = subTotalPrice(state.items);
    },
    clearCart: (state, action) => {
      state.items = [];
      state.totalPayment = 0;
    },
  },
});

export const { addToCart, removeItem, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

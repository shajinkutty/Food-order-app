import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductAPI = createAsyncThunk(
  "/products",
  async (dispatch, getState) => {
    const response = await fetch(
      "https://crispy-kichen-api.herokuapp.com/api/product"
    );
    return response.json();
  }
);
export const fetchProductAPIByCategory = createAsyncThunk(
  "/products/category",
  async (params, getState) => {
    const response = await fetch(
      `https://crispy-kichen-api.herokuapp.com/api/product/${params}`
    );
    return response.json();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
  },
  extraReducers: {
    [fetchProductAPI.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductAPI.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchProductAPI.rejected]: (state, action) => {
      state.loading = false;
    },
    [fetchProductAPIByCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductAPIByCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchProductAPIByCategory.rejected]: (state, action) => {
      state.loading = false;
    },
  },
  reducers: {},
});

export const { fetchProduct, fetchStart } = productSlice.actions;
export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appName: "Cooking Healthy Food",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;

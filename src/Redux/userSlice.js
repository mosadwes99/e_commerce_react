import { createSlice } from "@reduxjs/toolkit";

export let userSlice = createSlice({
  name: "user",
  initialState: {
    info: "",
  },
  reducers: {
    getUserData: (state, action) => {
      state.info = action.payload;
    },
  },
});

export let { getUserData } = userSlice.actions;

export let userReducer = userSlice.reducer;
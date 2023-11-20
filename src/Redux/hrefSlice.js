import { createSlice } from "@reduxjs/toolkit";

export let hrefSlice = createSlice({
  name: "href",
  initialState: {
    href: location.pathname,
  },
  reducers: {
    getHref: (state, action) => {
      state.href = action.payload;
    },
  },
});

export let { getHref } = hrefSlice.actions;

export let hrefReducer = hrefSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { hrefReducer } from "./hrefSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    href: hrefReducer,
  },
});

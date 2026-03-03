import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../slices/themeSlice";
import profileReducer from "../slices/profileSlice";
import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  profile: profileReducer,
});
export default rootReducer;

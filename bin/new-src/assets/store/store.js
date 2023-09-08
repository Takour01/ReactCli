import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import servicesReducer from "../../views/Pages/Services/servicesSlice";
export const store = configureStore({
  reducer: {
    global:globalReducer, 
    services:servicesReducer
  },
});

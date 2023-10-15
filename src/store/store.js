import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "@/store/currencySlice";

export default configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice";
import utilityReducer from "../Features/utilities/utilitySlice";
import { authAPi } from "./api/authApi";
import { productAPi } from "./api/productApi";

export const store = configureStore({
  reducer: {
    utility: utilityReducer,
    auth: authReducer,
    [authAPi.reducerPath]: authAPi.reducer,
    [productAPi.reducerPath]: productAPi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPi.middleware)
      .concat(productAPi.middleware),
});

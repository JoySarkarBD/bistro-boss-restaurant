import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseQuery

export const productAPi = createApi({
  reducerPath: "productAPi/api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_PRODUCT_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});

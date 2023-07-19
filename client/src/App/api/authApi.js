import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../Features/auth/authSlice";

// baseQuery

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_AUTH_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
    if (refreshResult?.data) {
      // store token and data
      api.dispatch(setCredentials({ ...refreshResult?.data }));

      //retry the original query with new acccess token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const authAPi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});

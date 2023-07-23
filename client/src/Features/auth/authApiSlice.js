import { authAPi } from "../../App/api/authApi";

export const authApiSlice = authAPi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    Otp: builder.mutation({
      query: (data) => ({
        url: "/create-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/verify-otp",
        method: "PUT",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "PUT",
        body: data,
      }),
    }),

    refreshToken: builder.query({
      query: () => ({
        url: "/refresh-token",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useRefreshTokenQuery,
} = authApiSlice;

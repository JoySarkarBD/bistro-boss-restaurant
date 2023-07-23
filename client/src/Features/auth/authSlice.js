import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  roles: null,
  accessToken: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  loggedIn: localStorage.getItem("loggedIn") || false,
};

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, roles, userInfo } = action.payload;
      (state.accessToken = accessToken), (state.roles = roles);
      state.userInfo = userInfo;
      state.loggedIn = true;
    },

    logout: (state) => {
      (state.accessToken = null), (state.roles = null), (state.userInfo = null);
      state.loggedIn = true;
      localStorage.removeItem("userInfo");
      localStorage.setItem("loggedIn", false);
    },
  },
});

// export action reducer
export const { setCredentials, logout } = authSlice.actions;

// export auth reducer
export default authSlice.reducer;

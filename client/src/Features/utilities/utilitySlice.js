import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    utility: { theme: localStorage.getItem('theme') || null },
};


// 
const utilitySlice = createSlice({
    name: "utility",
    initialState,
    reducers: {
        trackTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
})


export const { trackTheme } = utilitySlice.actions;
export default utilitySlice.reducer;
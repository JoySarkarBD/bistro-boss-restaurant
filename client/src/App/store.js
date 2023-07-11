import { configureStore } from "@reduxjs/toolkit";
import utilitySlice from "../Features/utilities/utilitySlice";

export const store = configureStore({
    reducer: {
        utility: utilitySlice
    },
});
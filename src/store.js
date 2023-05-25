import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Features/reducer.js'

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});
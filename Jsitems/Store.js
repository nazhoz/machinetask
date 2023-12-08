import { configureStore } from "@reduxjs/toolkit";
import navReducer from '../Slices/Navslice'


export const store = configureStore({
    reducer:{
        nav : navReducer,
    }
})

import { createSlice } from "@reduxjs/toolkit";
import { initialCategory, initialOneProduct, initialState } from "../utilities/initialStates";


const commereSlice = createSlice({
    name:'slice/ecommerse',
    initialState,
    reducers:{
        borrarProduct:(state)=>{
            state.oneProduct = initialOneProduct;
        },
        borrarCategory:(state)=>{
            state.oneCategory = initialCategory;
        }
    }
});


export const commerseReducer = commereSlice.reducer;
export const commersActions = commereSlice.actions;
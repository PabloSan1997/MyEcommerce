import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialCategory, initialOneProduct, initialState } from "../utilities/initialStates";
import { loginExtraReducer, readInfoUserExtraReducer } from "./extraReducer/userExtraReducers";
import { storageLogin } from "../utilities/storage";


const commereSlice = createSlice({
    name:'slice/ecommerse',
    initialState,
    reducers:{
        logout:(state)=>{
            state.token = '';
            storageLogin.save('');
        },
        borrarProduct:(state)=>{
            state.oneProduct = initialOneProduct;
        },
        borrarCategory:(state)=>{
            state.oneCategory = initialCategory;
        },
        borrarMessage:(state)=>{
            state.message = '';
        },
        escribirMessage:(state, action:PayloadAction<{message:string}>)=>{
            state.message = action.payload.message;
        }
    },
    extraReducers:(builder)=>{
        //-----User-------------
        builder.addCase(loginExtraReducer.fulfilled, (state, action)=>{
            state.token = action.payload.token;
            storageLogin.save(action.payload.token);
            state.message = '';
        });
        builder.addCase(loginExtraReducer.rejected, (state, action)=>{
            state.message = action.error.message || 'Error';
            state.token = '';
            storageLogin.save('');
        });

        builder.addCase(readInfoUserExtraReducer.fulfilled, (state, action)=>{
            state.userInfo = action.payload;
        });
        builder.addCase(readInfoUserExtraReducer.rejected, (state)=>{
            state.userInfo = initialState.userInfo;
            state.token = '';
            storageLogin.save('');
        });
    }
});


export const commerseReducer = commereSlice.reducer;
export const commersActions = commereSlice.actions;
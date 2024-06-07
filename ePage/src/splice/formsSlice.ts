import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateFomrs } from "../utilities/initialStates";


const formSlice = createSlice({
    name:'slice/forms',
    initialState:initialStateFomrs,
    reducers:{
        borrar:(state)=>{
            state.login = initialStateFomrs.login;
            state.carrito = initialStateFomrs.carrito;
            state.register = initialStateFomrs.register;
            state.category = initialStateFomrs.category;
            state.pCarrito = initialStateFomrs.pCarrito;
            state.putProduct = initialStateFomrs.putProduct;
            state.product = initialStateFomrs.product;
        },
        escribirLogin:(state, action:PayloadAction<LoginRequest>)=>{
            state.login = action.payload;
        },
        escribirRegister:(state, action:PayloadAction<Register>)=>{
            state.register = action.payload;
        },
        escribirCategory:(state, action:PayloadAction<AddCategory>)=>{
            state.category = action.payload;
        },
        escribirProduct:(state, action:PayloadAction<AddProduct>)=>{
            state.product = action.payload;
        },
        escribirPutProduct:(state, action:PayloadAction<PutFormProduct>)=>{
            state.putProduct = action.payload;
        },
        escribirCarrito:(state, action:PayloadAction<PostCarrito>)=>{
            state.carrito = action.payload;
        },
        escribirPutCarrito:(state, action:PayloadAction<{total:number}>)=>{
            state.pCarrito = action.payload;
        }
    }
});


export const formReducer = formSlice.reducer;

export const formActions = formSlice.actions;
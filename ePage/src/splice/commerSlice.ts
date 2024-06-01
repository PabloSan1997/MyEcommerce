import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialCategory, initialOneProduct, initialState } from "../utilities/initialStates";
import { loginExtraReducer, readInfoUserExtraReducer, registerExtraReducer, viewAdmninExtraReducer } from "./extraReducer/userExtraReducers";
import { storageLogin } from "../utilities/storage";
import { readCategoriesExtraReducer, readOneCategoryExtraReducer, readOneProductExtraReducer, readProductsExtraReducer } from "./extraReducer/productExtraReducer";
import { carritoExtraReducer, setCarritoExtraReducer } from "./extraReducer/carritoExtraReducer";


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

        builder.addCase(registerExtraReducer.fulfilled, (state, action)=>{
            state.token = action.payload.token;
            storageLogin.save(action.payload.token);
            state.message = '';
        });
        builder.addCase(registerExtraReducer.rejected, (state, action)=>{
            state.token="";
            state.message = action.error.message as string;
        });

        builder.addCase(viewAdmninExtraReducer.fulfilled, (state, acion)=>{
            state.isAdmin = acion.payload.isAdmin;
        });
        builder.addCase(viewAdmninExtraReducer.rejected, (state)=>{
            state.isAdmin = false;
        });

        //------Categories--------
        builder.addCase(readCategoriesExtraReducer.fulfilled, (state, action:PayloadAction<CaterogyResponse[]>)=>{
            state.categories = action.payload;
        });
        builder.addCase(readCategoriesExtraReducer.rejected, (state)=>{
            state.categories = [];
        });

        builder.addCase(readOneCategoryExtraReducer.fulfilled, (state, action)=>{
            state.oneCategory = action.payload;
        });
        builder.addCase(readOneCategoryExtraReducer.rejected, (state)=>{
            state.oneCategory = initialCategory;
        });

        //-----Products-----
        builder.addCase(readProductsExtraReducer.fulfilled, (state, action:PayloadAction<ProductResponse[]>)=>{
            state.products = action.payload;
        });
        builder.addCase(readProductsExtraReducer.rejected, (state)=>{
            state.products = [];
        });

        builder.addCase(readOneProductExtraReducer.fulfilled, (state, action)=>{
            state.oneProduct = action.payload;
        });
        builder.addCase(readOneProductExtraReducer.rejected, (state)=>{
            state.oneProduct = initialOneProduct;
        });
        
        //-----Carrito------
        builder.addCase(carritoExtraReducer.fulfilled, (state, acion)=>{
            state.carrito = acion.payload;
        });
        builder.addCase(carritoExtraReducer.rejected, (state)=>{
            state.carrito = [];
        });

        builder.addCase(setCarritoExtraReducer.fulfilled, ()=>{
           
        });
    }
});


export const commerseReducer = commereSlice.reducer;
export const commersActions = commereSlice.actions;
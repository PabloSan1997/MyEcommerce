import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialCategory, initialOneProduct, initialState } from "../utilities/initialStates";
import { loginExtraReducer, readInfoUserExtraReducer, registerExtraReducer, viewAdmninExtraReducer } from "./extraReducer/userExtraReducers";
import { storageLogin } from "../utilities/storage";
import { addCategoryExtraReducer, addNewProdcuctExtraRedeucer, deleteCategoryExtraReducer, deleteOneProductExtraReducer, editCategoryExtraReducer, editProductExtraReducer, readCategoriesExtraReducer, readOneCategoryExtraReducer, readOneProductExtraReducer, readProductsExtraReducer } from "./extraReducer/productExtraReducer";
import { carritoExtraReducer, deleteCarritoExtraReducer, editCarritoExtraReducer, setCarritoExtraReducer } from "./extraReducer/carritoExtraReducer";


const commereSlice = createSlice({
    name: 'slice/ecommerse',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = '';
            storageLogin.save('');
        },
        borrarProduct: (state) => {
            state.oneProduct = initialOneProduct;
        },
        borrarCategory: (state) => {
            state.oneCategory = initialCategory;
        },
        borrarMessage: (state) => {
            state.message = '';
        },
        escribirMessage: (state, action: PayloadAction<{ message: string }>) => {
            state.message = action.payload.message;
        }
    },
    extraReducers: (builder) => {
        //-----User-------------
        builder.addCase(loginExtraReducer.fulfilled, (state, action) => {
            state.token = action.payload.token;
            storageLogin.save(action.payload.token);
            state.message = '';
        });
        builder.addCase(loginExtraReducer.rejected, (state, action) => {
            state.message = action.error.message || 'Error';
            state.token = '';
            storageLogin.save('');
        });

        builder.addCase(readInfoUserExtraReducer.fulfilled, (state, action) => {
            state.userInfo = action.payload;
        });
        builder.addCase(readInfoUserExtraReducer.rejected, (state) => {
            state.userInfo = initialState.userInfo;
            state.token = '';
            storageLogin.save('');
        });

        builder.addCase(registerExtraReducer.fulfilled, (state, action) => {
            state.token = action.payload.token;
            storageLogin.save(action.payload.token);
            state.message = '';
        });
        builder.addCase(registerExtraReducer.rejected, (state, action) => {
            state.token = "";
            state.message = action.error.message as string;
        });

        builder.addCase(viewAdmninExtraReducer.fulfilled, (state, acion) => {
            state.isAdmin = acion.payload.isAdmin;
        });
        builder.addCase(viewAdmninExtraReducer.rejected, (state) => {
            state.isAdmin = false;
        });

        //------Categories--------
        builder.addCase(readCategoriesExtraReducer.fulfilled, (state, action: PayloadAction<CaterogyResponse[]>) => {
            state.categories = action.payload;
        });
        builder.addCase(readCategoriesExtraReducer.rejected, (state) => {
            state.categories = [];
        });

        builder.addCase(readOneCategoryExtraReducer.fulfilled, (state, action) => {
            state.oneCategory = action.payload;
        });
        builder.addCase(readOneCategoryExtraReducer.rejected, (state) => {
            state.oneCategory = initialCategory;
        });
        builder.addCase(deleteCategoryExtraReducer.fulfilled, (state, action) => {
            state.categories = action.payload;
        });

        builder.addCase(addCategoryExtraReducer.fulfilled, (state)=>{
            window.location.hash = '/home';
            state.message = '';
        });
        builder.addCase(addCategoryExtraReducer.rejected, (state, action)=>{
            state.message = action.error.message as string;
        });

        builder.addCase(editCategoryExtraReducer.fulfilled, (state, action)=>{
            state.categories = action.payload;
            window.location.hash = '/home';
        });
        //-----Products-----
        builder.addCase(readProductsExtraReducer.fulfilled, (state, action: PayloadAction<ProductResponse[]>) => {
            state.products = action.payload;
        });
        builder.addCase(readProductsExtraReducer.rejected, (state) => {
            state.products = [];
        });

        builder.addCase(readOneProductExtraReducer.fulfilled, (state, action) => {
            state.oneProduct = action.payload;
        });
        builder.addCase(readOneProductExtraReducer.rejected, (state) => {
            state.oneProduct = initialOneProduct;
        });

        builder.addCase(editProductExtraReducer.fulfilled, () => {
            window.location.hash = '/home';
        });

        builder.addCase(addNewProdcuctExtraRedeucer.fulfilled, () => {
            window.location.hash = '/home';
        });

        builder.addCase(deleteOneProductExtraReducer.fulfilled,()=>{
            window.location.hash = '/home';
        })
        //-----Carrito------
        builder.addCase(carritoExtraReducer.fulfilled, (state, acion) => {
            state.carrito = acion.payload;
        });
        builder.addCase(carritoExtraReducer.rejected, (state) => {
            state.carrito = [];
        });

        builder.addCase(setCarritoExtraReducer.fulfilled, () => {
            
        });

        builder.addCase(editCarritoExtraReducer.fulfilled, (state, action) => {
            const id = action.payload.id;
            const index = state.carrito.findIndex(c => c.id === id);
            state.carrito[index] = action.payload;
        });

        builder.addCase(deleteCarritoExtraReducer.fulfilled, (state, action) => {
            const id = action.payload.id;
            state.carrito = state.carrito.filter(c => c.id !== id);
        });
    }
});


export const commerseReducer = commereSlice.reducer;
export const commersActions = commereSlice.actions;
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductApi } from "../../api/ProductApi";


const readApi = new ProductApi();

export const readCategoriesExtraReducer = createAsyncThunk(
    'extraReducer/readCategories',
    async ({ token }: { token: string }) => {
        try {
            return readApi.readCategories(token);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);

export const readProductsExtraReducer = createAsyncThunk(
    'extraReducer/readProducts',
    async ({ token }: { token: string }) => {
        try {
            return readApi.readProducts(token);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);

export const readOneCategoryExtraReducer = createAsyncThunk(
    'extraReducer/readOneCategory',
    async ({ token, name }: { token: string, name: string }) => {
        try {
            return readApi.readOneCategory(token, name);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);

export const readOneProductExtraReducer = createAsyncThunk(
    'extraReducer/readOneProduct',
    async({token, id}:{token:string, id:number})=>{
        try {
            return readApi.readOneProduct(token, id);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);
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

export const deleteCategoryExtraReducer = createAsyncThunk(
    'extraReducer/deleteCategory',
    async ({ token, id }: { token: string, id:number }) => {
        try {
            return readApi.deleteCategory(token, id);
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

export const addCategoryExtraReducer=createAsyncThunk(
    'extraReducer/addNewCategory',
    async({token, category}:{token:string, category:AddCategory})=>{
        try {
            return readApi.addCategory(token, category);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);

export const editProductExtraReducer = createAsyncThunk(
    'extraReducer/putProduct',
    async({token, id, data}:{token:string, id:number, data:PutProduct})=>{
        try {
            return readApi.putProduct(token, id, data);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);

export const addNewProdcuctExtraRedeucer = createAsyncThunk(
    'extraReducer/postProduct',
    async({token, data}:{token:string, data:AddProduct})=>{
        try {
            return readApi.addProduct(token, data);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);
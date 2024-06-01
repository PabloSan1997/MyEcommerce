import { createAsyncThunk } from "@reduxjs/toolkit";
import { CarritoApi } from "../../api/CarritoApi";



const readApi = new CarritoApi();
export const carritoExtraReducer = createAsyncThunk(
    'extraReducer/leerCarrito',
    async ({ token }: { token: string }) => {
        try {
            return readApi.readCarrito(token);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);

export const setCarritoExtraReducer = createAsyncThunk(
    'extraReducer/addCariito',
    async ({ token, carrito }: { token: string, carrito: SetCarrito }) => {
        try {
            return readApi.addCarrito(token, carrito);
        } catch (error) {
            const err = error as ErrorDto;
            throw err;
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/UserApi";


const readApi = new UserApi();

export const readInfoUserExtraReducer = createAsyncThunk(
    'extraReducer/ReadInfo',
    async ({ token }: { token: string }): Promise<{ eamil: string, name: string }> => {
        try {
            const data = readApi.userInfo(token);
            return data;
        } catch (error) {
            const { message } = error as ErrorDto;
            throw { message };
        }
    }
);

export const loginExtraReducer = createAsyncThunk(
    'extraReducer/login',
    async (data: LoginRequest) => {
        try {
            const respnse = readApi.login(data);
            return respnse;
        } catch (error) {
            const { message } = error as ErrorDto;
            throw { message };
        }
    }
);

export const registerExtraReducer = createAsyncThunk(
    'extraReducer/register',
    async (data: Register) => {
        try {
            return readApi.register(data);
        } catch (error) {
            const { message } = error as ErrorDto;
            throw { message };
        }
    }
)

export const viewAdmninExtraReducer = createAsyncThunk(
    'extraReducer/viewAdmin',
    async ({ token }: { token: string }) => {
        try {
            return readApi.viewAdmin(token);
        } catch (error) {
            const { message } = error as ErrorDto;
            throw { message };
        }
    }
);
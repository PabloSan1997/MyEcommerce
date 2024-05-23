import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../api/UserApi";


const readApi = new UserApi();

export const readInfoUserExtraReducer = createAsyncThunk(
    'extraReducer/ReadInfo',
    async({token}:{token:string}):Promise<{eamil: string,name: string}>=>{
        try {
            const data = readApi.userInfo(token);
            return data;
        } catch (error) {
            const {message} = error as ErrorDto;
            throw {message};
        }
    }
);
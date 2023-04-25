import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { pending, fulfilled, rejected } from '../helper/ReduxHelper';
import { cloneDeep } from 'lodash';

const URL = "http://localhost:3001/loginCheck";


/** 단일행 데이터 조회를 위한 비동기 함수 */
export const getIdPw = createAsyncThunk('LoginSlice/getIdPw', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(`${URL}`, {

                loginId: payload?.loginId || "",
                pwd: payload?.pwd || "",
            
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});



const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    extraReducers: {
        /** getIdPw */
        [getIdPw.pending]: pending,
        [getIdPw.fulfilled]: (state, { meta, payload }) => {
            return {
                data: payload.item,
                loading: false,
                error: null
            }
        },
       
        [getIdPw.rejected]: rejected,

    },
});

export const { getCurrentData } = LoginSlice.actions;
export default LoginSlice.reducer;
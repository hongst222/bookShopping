import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/category";
// 다중행 데이터 조회
export const ctgGetList = createAsyncThunk("CategorySlice/ctgGetList", async (payload, { rejectWithValue }) => {
    let result = null;
    
    try {
        const response = await axios.get(URL, {
            params: {
                page: payload?.page || 1,
                rows: payload?.rows || 30,
                query: payload?.keyword || ''
            }
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});
// 단일행 데이터 조회
export const ctgGetItem = createAsyncThunk("CategorySlice/ctgGetItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.get(`${URL}/${payload?.ctgNo}`);
        result = response.data;
    } catch (err) {
        console.log(err);
        result = rejectWithValue(err.response);
    }
    return result;
});

// 데이터 추가
export const ctgPostItem = createAsyncThunk("CategorySlice/ctgPostItem", async (payload, { rejectWithValue }) => {
    
    let result = null;
    try {
        const response = await axios.post(URL, payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

//  데이터 수정
export const ctgPutItem = createAsyncThunk("CategorySlice/ctgPutItem", async (payload, { rejectWithValue }) => {
    
    let result = null;
    const params = null;

    try {
        const response = await axios.put(`${URL}/${payload?.ctgNo}`,payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

//  데이터 삭제
export const ctgDeleteItem = createAsyncThunk("CategorySlice/ctgDeleteItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.delete(`${URL}/${payload?.ctgNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

/** Slice 정의   */
const CategorySlice = createSlice({
    name: 'CategorySlice',
    initialState: {
        // backend 
        data: null,
        pagination: null,
        loading: false,
        error: null
    },

    //  외부 action 및 비동기 action (Ajax용)
    //  동기 : reducers
    //  비동기: extraReducers
    reducers: {
        getCurrentData: (state, action) => {
            return state;
        }
    },
    extraReducers: {

        // 로딩중임을 표시

        [ctgGetList.pending]: pending,
        [ctgGetList.fulfilled]: (state, { meta, payload }) => {
            if (meta.page > 1) {
                payload.item = state.data.concat(payload.item);
            }

            return {
                pagination: payload.pagination,
                data: payload.item,
                loading: false,
                error: null,
            };
        },
        [ctgGetList.rejected]: rejected,


        [ctgGetItem.pending]: pending,
        [ctgGetItem.fulfilled]: fulfilled,
        [ctgGetItem.rejected]: rejected,

        [ctgPostItem.pending]: pending,
        [ctgPostItem.fulfilled]: fulfilled,
        [ctgPostItem.rejected]: rejected,


        [ctgPutItem.pending]: pending,
        [ctgPutItem.fulfilled]: fulfilled,
        [ctgPutItem.rejected]: rejected,


        [ctgDeleteItem.pending]: pending,
        [ctgDeleteItem.fulfilled]: fulfilled,
        [ctgDeleteItem.rejected]: rejected
    },
});

export const { getCurrentData } = CategorySlice.actions;
export default CategorySlice.reducer;
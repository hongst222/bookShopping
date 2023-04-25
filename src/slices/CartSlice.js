import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/cart";
// 다중행 데이터 조회
export const cartGetList = createAsyncThunk("cartSlice/cartGetList", async (payload, { rejectWithValue }) => {
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
export const cartGetItem = createAsyncThunk("cartSlice/cartGetItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.get(`${URL}/${payload?.cartNo}`);
        result = response.data;
    } catch (err) {
        console.log(err);
        result = rejectWithValue(err.response);
    }
    return result;
});

// 데이터 추가
export const cartPostItem = createAsyncThunk("cartSlice/cartPostItem", async (payload, { rejectWithValue }) => {
    
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
export const cartPutItem = createAsyncThunk("cartSlice/cartPutItem", async (payload, { rejectWithValue }) => {
    
    let result = null;
    const params = null;

    try {
        const response = await axios.put(`${URL}/${payload?.cartNo}`,payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

//  데이터 삭제
export const cartDeleteItem = createAsyncThunk("cartSlice/cartDeleteItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.delete(`${URL}/${payload?.cartNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

/** Slice 정의   */
const cartSlice = createSlice({
    name: 'cartSlice',
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

        [cartGetList.pending]: pending,
        [cartGetList.fulfilled]: (state, { meta, payload }) => {
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
        [cartGetList.rejected]: rejected,


        [cartGetItem.pending]: pending,
        [cartGetItem.fulfilled]: fulfilled,
        [cartGetItem.rejected]: rejected,

        [cartPostItem.pending]: pending,
        [cartPostItem.fulfilled]: fulfilled,
        [cartPostItem.rejected]: rejected,


        [cartPutItem.pending]: pending,
        [cartPutItem.fulfilled]: fulfilled,
        [cartPutItem.rejected]: rejected,


        [cartDeleteItem.pending]: pending,
        [cartDeleteItem.fulfilled]: fulfilled,
        [cartDeleteItem.rejected]: rejected
    },
});

export const { getCurrentData } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/orders";
// 다중행 데이터 조회
export const ordersGetList = createAsyncThunk("ordersSlice/ordersGetList", async (payload, { rejectWithValue }) => {
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
export const ordersGetItem = createAsyncThunk("ordersSlice/ordersGetItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.get(`${URL}/${payload?.orderNo}`);
        result = response.data;
    } catch (err) {
        console.log(err);
        result = rejectWithValue(err.response);
    }
    return result;
});

// 데이터 추가
export const ordersPostItem = createAsyncThunk("ordersSlice/ordersPostItem", async (payload, { rejectWithValue }) => {
    
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
export const ordersPutItem = createAsyncThunk("ordersSlice/ordersPutItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.put(`${URL}/${payload?.orderNo}`,payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

//  데이터 삭제
export const ordersDeleteItem = createAsyncThunk("ordersSlice/ordersDeleteItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.delete(`${URL}/${payload?.orderNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

/** Slice 정의   */
const ordersSlice = createSlice({
    name: 'ordersSlice',
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

        [ordersGetList.pending]: pending,
        [ordersGetList.fulfilled]: (state, { meta, payload }) => {
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
        [ordersGetList.rejected]: rejected,


        [ordersGetItem.pending]: pending,
        [ordersGetItem.fulfilled]: fulfilled,
        [ordersGetItem.rejected]: rejected,

        [ordersPostItem.pending]: pending,
        [ordersPostItem.fulfilled]: fulfilled,
        [ordersPostItem.rejected]: rejected,


        [ordersPutItem.pending]: pending,
        [ordersPutItem.fulfilled]: fulfilled,
        [ordersPutItem.rejected]: rejected,


        [ordersDeleteItem.pending]: pending,
        [ordersDeleteItem.fulfilled]: fulfilled,
        [ordersDeleteItem.rejected]: rejected
    },
});

export const { getCurrentData } = ordersSlice.actions;
export default ordersSlice.reducer;
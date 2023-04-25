import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/orderDetails";
// 다중행 데이터 조회
export const orderDetailsGetList = createAsyncThunk("orderDetailsSlice/orderDetailsGetList", async (payload, { rejectWithValue }) => {
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
export const orderDetailsGetItem = createAsyncThunk("orderDetailsSlice/orderDetailsGetItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.get(`${URL}/${payload?.orderDetailNo}`);
        result = response.data;
    } catch (err) {
        console.log(err);
        result = rejectWithValue(err.response);
    }
    return result;
});

// 데이터 추가
export const orderDetailsPostItem = createAsyncThunk("orderDetailsSlice/orderDetailsPostItem", async (payload, { rejectWithValue }) => {
    
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
export const orderDetailsPutItem = createAsyncThunk("orderDetailsSlice/orderDetailsPutItem", async (payload, { rejectWithValue }) => {
    
    let result = null;

    try {
        const response = await axios.put(`${URL}/${payload?.orderDetailNo}`,payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

//  데이터 삭제
export const orderDetailsDeleteItem = createAsyncThunk("orderDetailsSlice/orderDetailsDeleteItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.delete(`${URL}/${payload?.orderDetailNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

/** Slice 정의   */
const orderDetailsSlice = createSlice({
    name: 'orderDetailsSlice',
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

        [orderDetailsGetList.pending]: pending,
        [orderDetailsGetList.fulfilled]: (state, { meta, payload }) => {
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
        [orderDetailsGetList.rejected]: rejected,


        [orderDetailsGetItem.pending]: pending,
        [orderDetailsGetItem.fulfilled]: fulfilled,
        [orderDetailsGetItem.rejected]: rejected,

        [orderDetailsPostItem.pending]: pending,
        [orderDetailsPostItem.fulfilled]: fulfilled,
        [orderDetailsPostItem.rejected]: rejected,


        [orderDetailsPutItem.pending]: pending,
        [orderDetailsPutItem.fulfilled]: fulfilled,
        [orderDetailsPutItem.rejected]: rejected,


        [orderDetailsDeleteItem.pending]: pending,
        [orderDetailsDeleteItem.fulfilled]: fulfilled,
        [orderDetailsDeleteItem.rejected]: rejected
    },
});

export const { getCurrentData } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
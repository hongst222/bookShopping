import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { pending, fulfilled, rejected } from '../helper/ReduxHelper';
import { cloneDeep } from 'lodash';

const URL = "http://localhost:3001/review";

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const ReviewGetList = createAsyncThunk('ReviewSlice/ReviewGetList', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(URL, {
            params : {
                page: payload?.page || 1,
                rows: payload?.rows || 30,
                query: payload?.keyword || '',
                odby : payload?.odby || '',
                point: payload?.point || '',
            }
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 단일행 데이터 조회를 위한 비동기 함수 */
export const ReviewGetItem = createAsyncThunk('ReviewSlice/ReviewGetItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(`${URL}/${payload?.reviewNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 저장을 위한 비동기 함수 */
export const ReviewPostItem = createAsyncThunk('ReviewSlice/ReviewPostItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(URL, payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 수정을 위한 비동기 함수 */
export const ReviewPutItem = createAsyncThunk('ReviewSlice/ReviewPutItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.put(`${URL}/${payload?.reviewNo}`, payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 삭제를 위한 비동기 함수 */
export const ReviewDeleteItem = createAsyncThunk('ReviewSlice/ReviewDeleteItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.delete(`${URL}/${payload?.reviewNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});


const ReviewSlice = createSlice({
    name: "ReviewSlice",
    initialState: {
        pointCnt: null,
        pagination: null,
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        getCurrentData: (state, action) => {
            return state;
        },
    },
    extraReducers: {
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [ReviewGetList.pending]: pending,
        [ReviewGetList.fulfilled]: (state, {meta, payload}) => {
            if(meta.page > 1) {
                payload.item = state.data.concat(payload.item);
            }

            return {
                pointCnt: payload.pointCnt,
                pagination: payload.pagination,
                data: payload.item,
                loading: false,
                error: null
            }
        },
        [ReviewGetList.rejected]: rejected,


        /** 단일행 데이터 조회를 위한 액션 함수 */
        [ReviewGetItem.pending]: pending,
        [ReviewGetItem.fulfilled]: fulfilled,
        [ReviewGetItem.rejected]: rejected,

        /** 데이터 저장을 위한 액션 함수 */
        [ReviewPostItem.pending]: pending,
        [ReviewPostItem.fulfilled]: fulfilled,
        [ReviewPostItem.rejected]: rejected,

        /** 데이터 수정을 위한 액션 함수 */
        [ReviewPutItem.pending]: pending,
        [ReviewPutItem.fulfilled]: fulfilled,
        [ReviewPutItem.rejected]: rejected,

        /** 데이터 삭제 위한 액션 함수 */
        [ReviewDeleteItem.pending]: pending,
        [ReviewDeleteItem.fulfilled]: fulfilled,
        [ReviewDeleteItem.rejected]: rejected,
    },
});

export const { getCurrentData } = ReviewSlice.actions;
export default ReviewSlice.reducer;
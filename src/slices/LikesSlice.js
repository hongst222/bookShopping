import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/likes";
// 다중행 데이터 조회
export const likesGetList = createAsyncThunk("likesSlice/likesGetList", async (payload, { rejectWithValue }) => {
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
export const likesGetItem = createAsyncThunk("likesSlice/likesGetItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.get(`${URL}/${payload?.likeNo}`);
        result = response.data;
    } catch (err) {
        console.log(err);
        result = rejectWithValue(err.response);
    }
    return result;
});

// 데이터 추가
export const likesPostItem = createAsyncThunk("likesSlice/likesPostItem", async (payload, { rejectWithValue }) => {
    
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
export const likesPutItem = createAsyncThunk("likesSlice/likesPutItem", async (payload, { rejectWithValue }) => {
    
    let result = null;
    const params = null;

    try {
        const response = await axios.put(`${URL}/${payload?.likeNo}`,payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

//  데이터 삭제
export const likesDeleteItem = createAsyncThunk("likesSlice/likesDeleteItem", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.delete(`${URL}/${payload?.likeNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

/** Slice 정의   */
const likesSlice = createSlice({
    name: 'likesSlice',
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

        [likesGetList.pending]: pending,
        [likesGetList.fulfilled]: (state, { meta, payload }) => {
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
        [likesGetList.rejected]: rejected,


        [likesGetItem.pending]: pending,
        [likesGetItem.fulfilled]: fulfilled,
        [likesGetItem.rejected]: rejected,

        [likesPostItem.pending]: pending,
        [likesPostItem.fulfilled]: fulfilled,
        [likesPostItem.rejected]: rejected,


        [likesPutItem.pending]: pending,
        [likesPutItem.fulfilled]: fulfilled,
        [likesPutItem.rejected]: rejected,


        [likesDeleteItem.pending]: pending,
        [likesDeleteItem.fulfilled]: fulfilled,
        [likesDeleteItem.rejected]: rejected
    },
});

export const { getCurrentData } = likesSlice.actions;
export default likesSlice.reducer;
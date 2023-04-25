import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { pending, fulfilled, rejected } from '../helper/ReduxHelper';
import { cloneDeep } from 'lodash';

const URL = "http://localhost:3001/user";

/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getList = createAsyncThunk('UserSlice/getList', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(URL, {
            params : {
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

/** 탈퇴하지 않은 회원 조회만을 위한 비동기 함수 */
export const getUList = createAsyncThunk('UserSlice/getUList', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(URL, {
            params : {
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

/** 단일행 데이터 조회를 위한 비동기 함수 */
export const getItem = createAsyncThunk('UserSlice/getItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(`${URL}/${payload?.userNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 단일행 데이터 조회를 위한 비동기 함수 */
export const getIdPw= createAsyncThunk('UserSlice/getIdPw', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(`${URL}/${payload?.LoginId}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 저장을 위한 비동기 함수 */
export const userPostItem = createAsyncThunk('UserSlice/userPostItem', async (payload, { rejectWithValue }) => {
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
export const putItem = createAsyncThunk('UserSlice/putItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.put(`${URL}/${payload?.userNo}`, payload);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 삭제를 위한 비동기 함수 */
export const deleteItem = createAsyncThunk('UserSlice/deleteItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.delete(`${URL}/${payload?.userNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});


const UserSlice = createSlice({
    name: "UserSlice",
    initialState: {
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
        [getList.pending]: pending,
        [getList.fulfilled]: (state, { meta, payload }) => {
            // action함수의 meta에는 API에 요청시 전송한 파라미터가 포함되어 있다.
            // 1페이지 이후의 검색 결과는 기존 데이터를 덧붙여야 한다.
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
        [getList.rejected]: rejected,

        /** 탈퇴하지 않은 회원 조회만을 위한 액션 함수 */
        [getUList.pending]: pending,
        [getUList.fulfilled]: fulfilled,
        [getUList.rejected]: rejected,

        /** 단일행 데이터 조회를 위한 액션 함수 */
        [getItem.pending]: pending,
        [getItem.fulfilled]: fulfilled,
        [getItem.rejected]: rejected,

        /** getIdPw */
        [getIdPw.pending]: pending,
        [getIdPw.fulfilled]: fulfilled,
        [getIdPw.rejected]: rejected,


        /** 데이터 저장을 위한 액션 함수 */
        [userPostItem.pending]: pending,
        [userPostItem.fulfilled]: (state, { meta, payload }) => {
            // const data = cloneDeep(state?.data);
            // console.log(state.data);
            // data.push(payload?.item);

            return {
                ...state,
                data: payload.item,
                loading: false,
                error: null,
            };
        },
        [userPostItem.rejected]: rejected,

        /** 데이터 수정을 위한 액션 함수 */
        [putItem.pending]: pending,
        [putItem.fulfilled]: (state, { meta, payload }) => {
            // const data = cloneDeep(state.data);
            // const targetId = data.findIndex((v, i) => v.id == meta.arg.id);
            // data.splice(targetId, 1, payload.item);

            return {
                data: payload.item,
                loading: false,
                error: null,
            };
        },
        [putItem.rejected]: rejected,

        /** 데이터 삭제 위한 액션 함수 */
        [deleteItem.pending]: pending,
        [deleteItem.fulfilled]: (state, { meta, payload }) => {
            // const data = cloneDeep(state.data);
            // const targetId = data.findIndex((v, i) => v.id == meta.arg.id);
            // data.splice(targetId, 1);

            return {
                data: payload.item,
                loading: false,
                error: null,
            };
        },
        [deleteItem.rejected]: rejected,
    },
});

export const { getCurrentData } = UserSlice.actions;
export default UserSlice.reducer;
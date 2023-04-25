import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/book";
/** Inner Join (Author) 사용 */
/** 관련분야 TOP 5 (다중) */
export const BookAboutBestGetListTop5 = createAsyncThunk("BookAboutBestSlice/BookAboutBestGetListTop5", async (payload, { rejectWithValue }) => {
    let result = null;
    
    try {
        const response = await axios.get(`${URL}_Top5/${payload.bookNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

/** Slice 정의   */
const BookAboutBestSlice = createSlice({
    name: 'BookAboutBestSlice',
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
        [BookAboutBestGetListTop5.pending]: pending,
        [BookAboutBestGetListTop5.fulfilled]: (state, { payload }) => {
            return {
                data: payload.item,
                loading: false,
                error: null,
            };
        },
        [BookAboutBestGetListTop5.rejected]: rejected,

    },
});

export const { getCurrentData } = BookAboutBestSlice.actions;
export default BookAboutBestSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/book";
/** Inner Join (Author) 사용 */
/** 관련분야 신간 (다중) */
export const BookAboutNewGetList5 = createAsyncThunk("BookAboutNewSlice/BookAboutNewGetList5", async (payload, { rejectWithValue }) => {
    let result = null;
    
    try {
        const response = await axios.get(`${URL}_new5/${payload.bookNo}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

/** Slice 정의   */
const BookAboutNewSlice = createSlice({
    name: 'BookAboutNewSlice',
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
        [BookAboutNewGetList5.pending]: pending,
        [BookAboutNewGetList5.fulfilled]: (state, { payload }) => {
            return {
                data: payload.item,
                loading: false,
                error: null,
            };
        },
        [BookAboutNewGetList5.rejected]: rejected,

    },
});

export const { getCurrentData } = BookAboutNewSlice.actions;
export default BookAboutNewSlice.reducer;
// 공용 상태변수 관리 파일

import { createSlice } from '@reduxjs/toolkit'

const ReviewSlice = createSlice({
    name: "ReviewSlice",
    initialState: {
        // 리뷰 보는 순서
        rv: '',
        // 리뷰 쓰는 창 띄우는 상태변수
        writeReview: false,
        pm: "khj",  // proejct 멤버 선택 상태변수
        // 프로젝트 멤버 상태변수가 변함에따라 github 링크를 다르게 적용
        ml: {
            khj: "https://www.naver.com",
            ihw: "https://github.com/hyunwoomemo",
            hst: "https://www.google.com",
        },
       
    },
    reducers: {
        setRv: (state, action) => {
            state.rv = action.payload;
        },
        setWriteReviewTrue : (state,action) => {
            state.writeReview = true;
        },
        setWriteReviewFalse : (state,action) => {
            state.writeReview = false;
        },
        setPm : (state, action) => {
            state.pm = action.payload;
        },

        
    },
});

export const { setRv, setWriteReviewTrue, setWriteReviewFalse, setPm, } = ReviewSlice.actions;
export default ReviewSlice.reducer;
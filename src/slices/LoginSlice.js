// 공용 상태변수 관리 파일

import { createSlice } from '@reduxjs/toolkit'

const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState: {
        /**  로그인 관련 ( for use LoginFunc.js) */
        islogin: false,
        user: null,
        userNo: null,
    },
    reducers: {
        
        /** 로그인 관련 (LoginFunc.js) */
        setIslogin : (state, action) => {
            state.islogin = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserNo: (state, action) => {
            state.userNo = action.payload;
        }
    },
});

export const {  setIslogin, setUser, setUserNo } = LoginSlice.actions;
export default LoginSlice.reducer;
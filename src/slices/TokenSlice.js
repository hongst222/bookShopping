// 로그인 관련 상태 변수 관리 파일
import { createSlice } from '@reduxjs/toolkit'

const TokenSlice = createSlice({
    name: "TokenSlice",
    initialState: {
        token: null,
    },
    reducers: {
        TokenSuccess(state) {
            state.token = action.payload.token;
        },
        logoutSuccess(state) {
            state.token = null;
        },
    },
});

export const { TokenSuccess, logoutSuccess } = TokenSlice.actions;
export default TokenSlice.reducer;
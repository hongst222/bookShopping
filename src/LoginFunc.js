
import axios from 'axios';

const URL = "http://localhost:3001";

export const login = async (payload) => {
    try {
        // 로그인 성공처리
        await axios.post(`${URL}/login`, {
            loginId: payload?.loginId || "",
            pwd: payload?.password || "",
        }, {
            withCredentials: true // crednetials 설정
        });
        console.log(payload.loginId);
        console.log("로그인성공?");
    } catch (err) {
        console.log(err);
    }
}

export const accessToken = async () => {
    try {
        console.log("access토큰 검증");
        await axios.get(`${URL}/accesstoken`, {
            withCredentials: true // crednetials 설정
        });
    } catch (err) {
        console.log(err);
    }
}

export const refreshToken = async () => {
    try {
        console.log("refresh 토큰 검증 및 access 토큰 재발급");
        await axios.get(`${URL}/refreshtoken`, {
            withCredentials: true // crednetials 설정
        });
    } catch (err) {
        console.log(err);
    }
}
/** 로그인 성공 기능은 src/page/login.js의 useEffect안에 넣어 처리했음. */

// 로그아웃



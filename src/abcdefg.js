
import axios from 'axios';
const URL = "http://localhost:3001";

export const login = async (payload) => {
    let result = null;
    try {
        // 로그인 성공처리
        console.log(payload);
        const response = await axios.post(`${URL}/login`, {
            loginId: payload?.loginId || "",
            pwd: payload?.password || "",
        }, {
            withCredentials: true // crednetials 설정
        });
        result = response.data;
    } catch (err) {
    }
    return result;
}

export const accessToken = async () => {
    let result = null;
    try {
        console.log("actk")
        const response = await axios.get(`${URL}/accesstoken`, {
            withCredentials: true // crednetials 설정
        });
        result = response.data;
        console.log(result);
    } catch (err) {
        console.log(err);
    }
    return result;
}


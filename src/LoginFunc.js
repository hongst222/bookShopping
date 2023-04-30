
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIslogin, setUser, setUserNo } from './slices/LoginSlice';
import React from 'react';
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

        // "/"로 이동
        // window.location.replace("/"); 을 사용하면 아예 새로운 페이지로 교체하기때문에 브라우저 히스토리에 남는 게 없어 뒤로가기가 안된다.
        
        /** 아래와 같은 코드는 loginSuccess를 씹어버린다. */
        // window.history.pushState({}, "", "/");
        // window.location.reload();

        window.location.reload();


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
        return {status: err.response.status};
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
// /** 로그인 성공 기능은 src/page/login.js의 useEffect안에 넣어 처리했음. */
// export const LoginSuccess = async () => {
//     const dispatch = useDispatch();
//     try {
//         const result = await axios.get(`http://localhost:3001/login/success`, {
//             withCredentials: true,
//         })
//         if (result.data) {
//             dispatch(setIslogin(true));
//             dispatch(setUser(result.data.userName));
//             dispatch(setUserNo(result.data.userNo));
//             console.log("sda");
//         } else {
//             console.log("로그인 실패");
//         }
//     } catch (err) {
//         console.log("access token 유효기간 검증 실패");
//         console.log(err);
//         dispatch(setIslogin(false));
//         dispatch(setUser(null));
//         dispatch(setUserNo(null));
//     }
// }

// // 로그아웃
// export const Logout = async () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     try {
//         console.log("log out");
//         const response = await axios.post(`http://localhost:3001/logout`, {}, {
//             withCredentials: true
//         });
//         if (response.status == 200) {
//             dispatch(setIslogin(false));
//             dispatch(setUser(null));
//             dispatch(setUserNo(null));
//             navigate('/');
//         }

//     } catch (err) {
//         console.log(err);
//     }
// }


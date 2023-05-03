
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

        window.location.reload();


    } catch (err) {
        console.log(err);
    }
}

export const accessToken = async () => {
    try {
        console.log("access토큰 검증");
        const response = await axios.get(`${URL}/accesstoken`, {
            withCredentials: true // crednetials 설정
        });
        console.log(response.status);
        return {status: response.status}
    } catch (err) {
        console.log(err);
        return {status: err.response.status};
    }
}

export const refreshToken = async () => {
    try {
        console.log("refresh 토큰 검증 및 access 토큰 재발급");
        const response = await axios.get(`${URL}/refreshtoken`, {
            withCredentials: true // crednetials 설정
        });
        return {status: response.status}
    } catch (err) {
        console.log(err);
        return {status: err.response.status}
    }
}



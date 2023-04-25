import React, { memo, useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { getIdPw } from '../slices/LoginSlice';


const PROTOTYPE_LOGIN = memo(() => {
    const dispatch = useDispatch();
    const { data: data, loading: Loading, error: Error } = useSelector((state) => state.LoginSlice);

    // 로그인 시도 시 사용되는 이벤트.
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const {username, password} = e.target.elements;
        console.log("ss");
        dispatch(getIdPw({ loginId: username.value, pwd: password.value }));
    }, []);
    
     

    useEffect(() => {
        console.log(data)
    }, [data]);
    return (
        <>
            <h1>로그인 페이지 프로토 타입</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" required />
                <button type='submit' style={{ width: "100px", height: "20px" }}>로그인</button>
            </form>
        </>
    );
});

export default PROTOTYPE_LOGIN;
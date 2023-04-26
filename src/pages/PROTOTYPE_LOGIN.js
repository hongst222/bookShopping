import React, { memo } from 'react';
import { accessToken, login } from '../abcdefg';

const PROTOTYPE_LOGIN = memo(() => {
    // 로그인 시도 시 사용되는 이벤트.
    const handleSubmit = (e) => {
        e.preventDefault();
        const { loginId, password } = e.target.elements;
        login({ loginId: loginId.value, password: password.value });
    };
    
    const test1 = (e) => {
        e.preventDefault();
        accessToken();
    }

    return (
        <>
            <h1>로그인 페이지 프로토 타입</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="loginId">loginId:</label>
                <input type="text" name="loginId" required />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" required />
                <button type='submit' style={{ width: "100px", height: "20px" }}>로그인</button>
            </form>
            <button onClick={test1} style={{width:"100px" , height:"100px"}}></button>
        </>
    );
});

export default PROTOTYPE_LOGIN;
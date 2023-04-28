import React, { memo } from 'react';
import { accessToken, login, refreshToken } from '../LoginFunc';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// slice
import { setIslogin, setUser, setUserNo } from '../slices/LoginSlice';
import { useEffect } from 'react';
const PROTOTYPE_LOGIN = memo(() => {
    const dispatch = useDispatch();
    const { islogin: islogin, user: user } = useSelector((state) => state.LoginSlice);

    const navigate = useNavigate();
    /** 로그인 성공 시 발생하는 함수 */
    const LoginSuccess = async () => {
        try {
            const result = await axios.get(`http://localhost:3001/login/success`, {
                withCredentials: true,
            })
            if (result.data) {
                dispatch(setIslogin(true));
                dispatch(setUser(result.data.userName));
                dispatch(setUserNo(result.data.userNo));
                console.log("sda");
            } else {
                console.log("로그인 실패");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const logout = async () => {
        try {
            console.log("log out");
            const response = await axios.post(`http://localhost:3001/logout`, {}, {
                withCredentials: true
            });
            if (response.status == 200) {
                dispatch(setIslogin(false));
                dispatch(setUser(null));
                dispatch(setUserNo(null));
                navigate('/');
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        LoginSuccess();
       
    }, []);

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

    const test2 = (e) => {
        e.preventDefault();
        refreshToken();
        console.log(islogin, user);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <>
            <h1>로그인 페이지 프로토 타입</h1>
            {islogin ?
                <>
                    <h3>{user} 님이 로그인했습니다.</h3>
                    <button onClick={handleLogout} >
                        Logout
                    </button>
                </>
                :
                <form onSubmit={handleSubmit}>
                    <label htmlFor="loginId">loginId:</label>
                    <input type="text" name="loginId" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" required />
                    <button type='submit' style={{ width: "100px", height: "20px" }}>로그인</button>
                </form>
            }
            <button onClick={test1} style={{ width: "100px", height: "100px" }}>acttt</button>
            <button onClick={test2} style={{ width: "100px", height: "100px" }}>rfttt</button>
        </>
    );
});

export default PROTOTYPE_LOGIN;
import React, { memo } from 'react';
import { useSelector } from 'react-redux';


const index = memo(() => {
    const {user: user,userNo: userNo, islogin: islogin} = useSelector((state) => state.LoginSlice);
    const test = (e) => {
        console.log(user, userNo, islogin);
    }
    return (
        <div>
            <h1>임시 메인 페이지</h1>
            <button onClick={test}></button>
        </div>
    );
});

export default index;
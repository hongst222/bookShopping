/**
 * @autor : 홍승택  
 * @last_modified_date : 2023-03-06 monday
 * @discription : app.js
 */
import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
// reset css
import { Reset } from 'styled-reset';
import GlobalStyle from './GlobalStyle';
import Header from './components/common/Header';
import AppRouter from './routes';

import { HambugerContext } from './context/HamburgerContext';
import { useEffect } from 'react';
// page

const App = () => {
    useEffect(() => {

    }, []);

    const [isHambuger, setIsHambuger] = useState(false);
    return (
        <>

            <Reset />
            <GlobalStyle />
            
            <br />
            <nav style={{
                "width": "1200px",
                "margin": "0 auto"
            }}>
                <NavLink to='/'>홈페이지</NavLink>&nbsp;&nbsp;|&nbsp;&nbsp;
                <NavLink to='/product_detail/1'>상품디테일페이지</NavLink>&nbsp;&nbsp;|&nbsp;&nbsp;
                <NavLink to='/proto_login'>로그인(프로토타입)</NavLink>&nbsp;&nbsp;|&nbsp;&nbsp;
            </nav>

            <HambugerContext.Provider value={{ isHambuger, setIsHambuger }}>
                <Header/>
                <AppRouter />
            </HambugerContext.Provider>
        </>
    );
};

export default App;
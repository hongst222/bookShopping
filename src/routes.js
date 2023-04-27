import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AddAuthor from './pages/AddAuthor';
import AddBook from './pages/AddBook';
import AdminPage from './pages/AdminPage';
import Sellingbook from './pages/Sellingbook';
import PROTO from './pages/PROTOTYPE_LOGIN';
import Home from './pages/Home';
const AppRouter = () => {
    return (

        <Routes>
            // 메인 페이지 자리
            <Route exact path='/' element={<Home/>}/>
            <Route path='/product_detail/:bookNo' element={<ProductDetail />}>상품디테일페이지</Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/addbook' element={<AddBook />} />
            <Route path='/addauthor' element={<AddAuthor />} />
            <Route path='/sellingBook' element={<Sellingbook />} />
            <Route path='/proto_login' element={<PROTO />} />

        </Routes>
    );
};

export default AppRouter;
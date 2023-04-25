/**
 *  @filename : ProductDetail.js
 *  @author : 홍승택
 *  @description : 책 상세정보 부분
 *  @논의할부분 : 어정쩡한 Header 디자인
 *  @추가할부분 : 어정쩡한 Header 디자인 수정, poistion: sticky 방식의 총 상품 금액 0000 원 | 수량 | 장바구니 | 바로 구매 |  추가
 *               상세정보들 추가 별점 및  리뷰 보기 추가  
 *               (별점 구현이 생각보다 어려움) 1개 단위, 0.5개 단위 타협 봐야함
 */

import React, { memo, useEffect,useRef } from 'react';
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/** component */
import Footer from "../components/common/Footer";
import ErrorView from '../components/common/ErrorView';
import Spinner from '../components/common/Spinner';
import Top from "../components/ProductDetail/Top";
import Main from '../components/ProductDetail/Main';
import DetailNav from '../components/ProductDetail/DetailNav';
import DetailFooter from '../components/ProductDetail/DetailFooter';

/** slice */
import { BookGetItemAuthName } from '.././slices/BookSlice';
import { BookAboutBestGetListTop5 } from '../slices/BookAboutBestSlice';

import { ReviewGetList, ReviewGetItem } from "../slices/ReviewSlice"
import { BookAboutNewGetList5 } from '../slices/BookAboutNewSlice';

const ProductDetail = memo(() => {
    /** slice */
    const { data: bookData, ranks: bookRanks, loading: bookLoading, error: bookError } = useSelector((state) => state.BookSlice);
    const { data: BABData, loading: BABLoading, error: BABError } = useSelector((state) => state.BookAboutBestSlice);
    const { pointCnt: pointCnt, pagination: reviewPagination, data: reviewData, loading: reviewLoading, error: reviewError } = useSelector((state) => state.ReviewSlice);
    const { data: NewData, loading: NewLoading, error: NewError } = useSelector((state) => state.BookAboutNewSlice);

    
    /** 단일 책 data 받아오기 */
    const dispatch = useDispatch();
    const params = useParams();
    /** 상품네비게이터에서 클릭 시 스크롤 이동을 위해 만드는 Ref */
    const prodDetail = useRef(null);
    const review = useRef(null);
    const changeInfo = useRef(null);
    const arrDetailNav = {prodDetail: prodDetail, review:review, changeInfo: changeInfo}
    const {rv} = useSelector((state) => state.StateSlice);
    
    useEffect(() => {
        dispatch(BookGetItemAuthName({ bookNo : params.bookNo }));
        dispatch(BookAboutBestGetListTop5({ bookNo: params.bookNo }));
        dispatch(ReviewGetList({ keyword: params.bookNo , odby: rv}));
        dispatch(BookAboutNewGetList5({bookNo: params.bookNo}));
        window.scrollTo(0,0);
    }, [dispatch,params]);
    
    useEffect(() => {
        dispatch(ReviewGetList({ keyword: params.bookNo , odby: rv}));
    },[rv])
    return (

        bookError ? <ErrorView error={bookError} />
            : BABError ? <ErrorView error={BABError} />
                : reviewError ? <ErrorView error={bookError} />
                    : (

                        <>
                            {/* {reviewData&& JSON.stringify(reviewData)}
                            {pointCnt&& JSON.stringify(pointCnt)} */}
                            <Spinner loading={bookLoading || BABLoading || reviewLoading} />
                            {bookData &&
                                (<Top book={{ ...bookData }} ranks={{ ...bookRanks }} rvCount = {{...reviewPagination}} params = {{params}}/>)}
                            {reviewData &&
                                (<DetailNav review={{ ...reviewPagination }} navRef= {{...arrDetailNav}} />)}
                                {bookData && reviewData && NewData && 
                                (<Main book={{ ...bookData }} top5={{ ...BABData }} new5 = {{...NewData}} reviewDT={[...reviewData]} pointCnt={{...pointCnt}} pagination={{... reviewPagination}}  params = {{params}}  navRef= {{...arrDetailNav}}  rvCount = {{...reviewPagination}}/>)}
                            <Footer />
                            {bookData && (<DetailFooter price= {bookData.price} discount={bookData.discount}  params = {{params}} />)}
                        </>
                    )
    );
});
export default ProductDetail;
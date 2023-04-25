import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// module
import styled from "styled-components";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

// component
import Table from '../common/Table';
import ReviewModal from './ReviewModal';

// icon
import { BsPencilSquare, BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

import { useDispatch } from 'react-redux';
//slice
import { setRv } from '../../slices/StateSlice';

// styled component
const Left = styled.div`
    width:814px;
   
    .head_img{
            overflow: hidden;
            border-radius: 23px;
            margin-bottom: 50px;
        }
    .info_title{
        width: 100%;
        padding-bottom: 20px;
        p{
            font-size: 20px;
            font-weight: 700;
        } 
    }
    .desc_overflow{
                    .desc_inner{
                        width: 100%;
                        /* 펼치기 전에 크기가 넘어가면 3번째 줄에서 ...  */
                        max-height: 60px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        /* 줄조정 및 글씨 굵기,크기 조정 */
                        line-height: 1.4;
                        font-weight: 300;
                        font-size: 14px;
                        /* 문단 깔끔하게 */
                        text-align: justify;
                        word-break: break-all;

                        &.active{
                            max-height: none;
                        }
                        
                    }
                    .overflow_footer{
                        button{
                            display: flex;
                            align-items: center;
                            background: none;
                            border: none;
                            font-size: 11px;
                            padding: 0;
                            padding-top: 2px;
                            &:hover{
                                cursor: pointer;
                            }
                            
                            span{
                                &:first-of-type{
                                        display: block;
                                        text-decoration: underline;
                                        margin-right: 5px;
                                    }
                                    
                                &:nth-of-type(2){
                                    position: relative;
                                    width: 18px;
                                    height: 18px;
                                    background-color: white;
                                    border-radius: 50px;
                                    border: 0.5px solid rgba(125, 125, 125, 0.4);
                                    
                                    &:after{
                                        position: absolute;
                                        display: inline-block;
                                        top: 4.5px;
                                        left: 5.5px;
                                        content: '';
                                        width: 5px;
                                        height: 5px;
                                        border-top: 2px solid rgba(0,0,0,0.6);
                                        border-right: 2px solid rgba(0,0,0,0.6);
                                        transform: rotate(135deg);
                                    }
                                } 
                            }
                            &.active span{
                                    &:nth-of-type(2){
                                        &:after{
                                            position: absolute;
                                            display: inline-block;
                                            top: 6.5px;
                                            left: 5.5px;
                                            content: '';
                                            width: 5px;
                                            height: 5px;
                                            border-top: 2px solid rgba(0,0,0,0.6);
                                            border-right: 2px solid rgba(0,0,0,0.6);
                                            transform: rotate(315deg);
                                        }
                                    } 
                                }
                            }
                        }
                    }
                    
                
    .intro{
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid #eaeaea;
        .info_sub{
            width: 100%;
            padding-bottom: 12px;
            p{
                font-size: 14px;
                font-weight: 500;
            }
        }
        .info_list{
            width: 100%;
            margin-bottom: 10px;
            a{  
                text-decoration: none;
                color: black;
                font-size: 14px;
                font-weight: 300;
                &:hover{
                    text-decoration: underline;
                    color: green;
                }
            }
            span{
                &:last-of-type{
                    color: white;
                }
            }
        }
    }
    .intro_bottom{
        .info_text{
            margin-top: 16px;
            font-size: 15px;
            font-weight: 300;
            line-height: 23px;
            /* 문단 깔끔하게 */
            text-align: justify;
            word-break: break-all;
            /* br인식 */
            white-space: pre-wrap;
            &.letter_bold {
                font-weight: 700;
            }     
        }   
       
    }
    
    
    .author_box{
        margin-top: 70px;
        
        .gray_box{
            display: flex;
            flex-direction: column;
            padding: 36px 30px 40px;
            border-radius: 20px;
            background-color: #f7f7f7;
            box-sizing: border-box;
            .author_name{
                padding-bottom: 20px;
                box-sizing: border-box;
                span{
                    font-weight: 700;
                }
            }
            .auth_info{
                display: flex;
                flex-direction: row;
                .auth_profile{
                    flex: 0 0 100px;
                    height: 100px;
                    margin-right: 15px;
                    border-radius: 50px;
                    box-sizing: border-box;
                    overflow: hidden;
                   
                    text-align: center;
                    img{
                        vertical-align: middle;
                        width: 100px;
                    }
                }
                
             }
             .desc_overflow{
                    .desc_inner{
                        width: 100%;
                        /* 펼치기 전에 크기가 넘어가면 3번째 줄에서 ...  */
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        &.active{
                            display: inline-block;
                            max-height: none;
                        }
                    }
                }
        }
    }

    .prod_index{
        margin-top: 50px;
    }
    .prod_regular{
        margin-top: 50px;
        .table_wrap{
            padding: 18px 0px;
            border-bottom: 1px solid #eaeaea;
        }
    }
    .review_info{
        margin-top: 70px;
        .title_wrap{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 16px;
            
            .left{
                width: 20%;
                font-size: 20px;
                font-weight: 700;
            }
            .right{
                display: flex;
                align-items: center;
                span{
                    font-size: 13px;
                    line-height: 19px;
                    color: #beb9b9;
                    padding-right: 20px;
                }
                button{
                    font-size: 13px;
                    height: 38px;
                    background-color: #5055B1;
                    color: white;
                    padding: 0px 13px 1px;
                    border: 1px solid #5055B1;
                    border-radius: 7px;
                }

            }
        }

        .review_box{
            background-color: #f7f7f7;
            border-radius: 20px;
            border: 1px solid #eaeaea;
            box-sizing: border-box;
            width: 100%;
            height: 300px;
            padding: 35px 49px;
            display: flex;
            justify-content: center;
            .starbox{
                width:60%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .box_top{
                    p{
                        text-align: center;
                    }
                .rating_box{
                    padding-top: 15px;
                    display: flex;
                    justify-content: center;
                        span{
                            text-align: center;
                            :first-of-type{
                                color:rgba(80, 85, 177, 0.8);
                                line-height: 1;
                                font-size: 20px;
                                font-weight: 700;
                                margin-left: 10px;
                                margin-right: 5px;
                            }
                            :last-of-type{
                                font-size: 14px;
                                font-weight: 300;
                                color: #9f8476;
                                padding-top: 5px;
                                
                            }
                        }
                    }
                }
                .box_bottom{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    margin-top: 28px;
                    .scorebar_form{
                        display: flex;
                        align-items: center;
                        gap: 5%;
                        .scorebar{
                            --score: 0;
                            position: relative;
                            display: inline-block;
                            height: 10px;
                            width: 50%;
                            background-color: #e8e8e8;
                            border-radius: 20px;
                            &::before{
                                content: "";
                                position: absolute;
                                border-radius: 20px;
                                top: 0;
                                left: 0;
                                bottom: 0;
                                /* --score 변수 사용 */
                                width: calc(var(--score) * 100%);
                                /* --score 변수 사용 */
                                background-color: rgba(80, 85, 177, 0.8);
                            }
                        }
                        
                        .score_text{
                            font-size: 12px;
                            font-weight: 300;
                        }
                    }
                    
                }
            }
        }

        .review_list{
            margin-top: 40px;
            margin-bottom: 40px;
            .review_title{
                margin-bottom: 40px;
                font-weight: 700;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom:14px;
                border-bottom: #eaeaea solid 1px;
                select{
                    border-radius: 6px;
                    border: 1px solid #d5d5d5;
                    box-sizing: border-box;
                    transition: border-color 0.2s ease-out, border-radius 0.2s ease-out;
                    outline: none;
                    height: 38px;
                    padding: 0 14px;
                }
            }
            .review_list_box{
                margin-top: 20px;
                margin-bottom: 20px;
                .rv_top{
                    display: flex;
                    justify-content: space-between;
                    .rvt_left{
                        display: flex;
                        span{
                            color: #767676;
                            font-size: 14px;
                            &.gap{
                                margin: 0 7px 0 7px;
                            }
                        }
                    }
                    .rvt_right{
                       
                    }
                }
                .rv_content{
                    margin-top: 24px;
                    padding-bottom: 24px;
                    box-sizing: border-box;
                    width: 100%;
                    border-bottom: 1px solid #eaeaea
                }
                
            }
            
        }
}
    
`
// br태그를 인식하여 가져오는 컴포넌트
const WriteBR = memo(({ content }) => {
    // 데이터 크롤링 오류로 추가 코드..
    if (!content) {
        return;
    }
    content = content.replace(`<p class="info_text">`, "");
    content = content.replace(`</p>`, "");
    return (
        <>
            {content.indexOf("<br/>") != -1 ?
                content.split("<br/>").map((line, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            {line}
                            <br />
                        </React.Fragment>
                    );
                }) : (<>{content}</>)}
        </>
    )
});

// 주 컴포넌트
const MainLeft = memo(({ book, params, navRef, rvCount, pointCnt, reviewDT }) => {
    const reviewCount = rvCount.totalCount;
    const starPoint = book.totalSp / reviewCount;
    // 참조 변수
    const overflow = useRef(null);
    const ss = useRef(null);
    const overflow2 = useRef(null);
    // 접기 펼치기를 위한 상태변수
    const [collapse, setCollapse] = useState(false);
    const [collapse2, setCollapse2] = useState(false);
    const [btnShow, setBtnShow] = useState(false);
    const [btnShow2, setBtnShow2] = useState(false);

    const dispatch = useDispatch();

    // 표에서 사용될 배열
    const prodRegularArr = [book.ISBNum ? book.ISBNum : "준비중", dayjs(book.pubDate).format("YYYY년 MM월 DD일"), book.page ? book.page + "p" : "준비중", book.size ? book.size : "준비중"];

    const { rv: rv } = useSelector((state) => state.StateSlice);

    useEffect(() => {
        const contentHeight = overflow.current.clientHeight;
        const contentHeight2 = overflow2.current.clientHeight;


        if (contentHeight > 56) {
            setBtnShow(true);
        } else {
            setBtnShow(false);
        }

        if (contentHeight2 > 56) {
            setBtnShow2(true);
        } else {
            setBtnShow2(false);
        }
        overflow.current.classList.remove("active");
        overflow2.current.classList.remove("active");
        setCollapse(false);
        setCollapse2(false);
    }, [params]);



    // 함수
    // overflow 콘텐츠 버튼 클릭 시 발생하는 이벤트
    const onClickAuthDesc = useCallback(e => {
        e.preventDefault();
        const btn = e.currentTarget.classList;
        if (overflow.current.classList.contains("active")) {
            overflow.current.classList.remove("active");
            btn.remove("active");
            setCollapse(false);
        } else {
            overflow.current.classList.add("active");
            btn.add("active");
            setCollapse(true);
        }
    }, [])
    const onClickbookIntro = useCallback(e => {
        e.preventDefault();
        const btn = e.currentTarget.classList;
        if (overflow2.current.classList.contains("active")) {
            overflow2.current.classList.remove("active");
            btn.remove("active");
            setCollapse2(false);
        } else {
            overflow2.current.classList.add("active");
            btn.add("active");
            setCollapse2(true);
        }
    }, [])
    // // 별그리기 함수
    const drawStar = useCallback(() => {
        const result = [];


        const sp = Math.floor(starPoint);
        const floorSp = starPoint % 1;
        const restSp = 5 - Math.ceil(starPoint);
        const boolean1 = isNaN(floorSp)
        if (!boolean1) {
            for (let i = 0; i < sp; i++) {
                result.push(<BsStarFill key={i} style={{ color: "#ffdd70", width: "24px", height: "24px" }} />)
            }
            if (floorSp != 0) {
                if (floorSp >= 0.5) {
                    result.push(<BsStarHalf key={200} style={{ color: "#ffdd70", width: "24px", height: "24px" }} />)
                } else {
                    result.push(<BsStarFill key={100} style={{ color: "#ffdd70", width: "24px", height: "24px", opacity:0.5 }} />)
                }
            }
            for (let i = 0; i < restSp; i++) {
                result.push(<BsStarFill key={i + 10} style={{ color: "#ffdd70", width: "24px", height: "24px", opacity:0.5 }} />)
            }
            return result;
        }


    }, [params]);

    // 별그리기 ( 5, 4, 3 ,2, 1) [별점 분포를 위한 그리기]
    const drawDistributionStar = useCallback((sp, width = 24, height = 24) => {
        const result = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= sp) {
                result.push(<BsStarFill key={i} style={{ color: "#ffdd70", width: `${width}px`, height: `${height}px` }} />)
            }
            else {
                result.push(<BsStarFill key={i + 1} style={{ color: "#ffdd70", width: `${width}px`, height: `${height}px`, opacity: "0.5" }} />)
            }
        }


        return result;
    }, [book]);

    // 별점 분포 게이지 그리기
    function ScoreBar({ score }) {
        const scoreStyle = {
            '--score': score * 0.01,
        };

        return (
            <span className="scorebar" style={scoreStyle}>
            </span>
        );
    }
    // 리뷰 나열 순서 
    const OnChangeReviewList = useCallback((e) => {
        dispatch(setRv(e.currentTarget.value));
    }, []);




    return (
        <Left>
            {/* 스크롤 이동을 위한 위치 참조 */}
            <div ref={navRef.prodDetail}></div>
            {/*  책 content 이미지가 존재할때만 뜨게함. */}
            {book.content &&
                (<div className="head_img">
                    {/* <img src={book.content} alt={book.bookTitle+"콘텐츠 이미지"} /> */}
                </div>)
            }
            <div className="intro">
                {/* 인트로부분 */}
                <div className="info_title">
                    <p>책 소개</p>
                </div>
                <div className="info_sub">
                    <p>이 책이 속한 분야</p>
                </div>
                {/* (분야) */}
                <div className="info_list">
                    <Link to='/'>{book.ctgUp}</Link><span>&nbsp;&gt;&nbsp;</span>
                    <Link to='/'>{book.ctgName}</Link><span>&nbsp;&gt;&nbsp;</span>
                </div>

            </div>
            {/* 책 설명 */}
            <div className="intro_bottom">
                {book.bookIntro && <div className="info_text letter_bold">
                    <WriteBR content={book.bookIntro} />
                </div>}

                {book.bookDesc && <div className='info_text'>
                    <p>
                        <WriteBR content={book.bookDesc} />
                    </p>
                </div>}
            </div>

            {/* 작가정보 */}
            <div className="author_box">
                <div className="info_title">
                    <p>작가정보</p>
                </div>

                <div className="gray_box">
                    <div className="author_name">저자(글)
                        <span>&nbsp;{book.authName}</span>
                    </div>

                    <div className="auth_info">
                        <div className="auth_profile">
                            {book.authImg && <img src={book.authImg} alt={book.authName} />}
                        </div>
                        <div className="desc_overflow ">
                            <div className="desc_inner" ref={overflow}>
                                <p>
                                    <WriteBR content={book.authDesc} />
                                </p>
                            </div>
                            <div className="overflow_footer">
                                {btnShow && <button onClick={onClickAuthDesc} ref={ss}>
                                    {collapse ? <span>접기</span> : <span>펼치기</span>}
                                    <span></span>
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
            {/* 책 목차 */}

            <div className="prod_index">
                <div className="info_title"><p>책 소개</p>
                </div>
                <div className="desc_overflow">
                    <div className="desc_inner active" ref={overflow2}>
                        {book.bookIndex && <WriteBR content={book.bookIndex} />}
                    </div>
                    <div className="overflow_footer">
                        {btnShow2 && <button onClick={onClickbookIntro} >
                            {collapse2 ? <span>접기</span> : <span>펼치기</span>}
                            <span></span>
                        </button>}
                    </div>
                </div>
            </div>

            {/* 기본 정보 */}
            <div className="prod_regular">
                <div className="info_title"><p>기본정보</p></div>
                <hr />
                <div className="table_wrap">
                    <Table>
                        <tbody>
                            {["ISBN", "발행(출시)일자", "쪽수", "크기"].map((head, idx) => {
                                return (<tr key={idx}>
                                    <th>{head}</th>
                                    <td>{prodRegularArr[idx]}</td>
                                </tr>);
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* 리뷰 */}
            <div className="review_info" ref={navRef.review}>
                <div className='title_wrap'>
                    <div className="left">책 리뷰</div>
                    <div className="right">
                        <span>* 구매 후 작성 시 300P 적립</span>
                        <ReviewModal book={book}/>
                    </div>
                </div>
                <div className="review_box">
                    {reviewCount != 0 && <div className="starbox">
                        <div className="box_top">
                            <p>사용자 총점</p>
                            <div className="rating_box">
                                {drawStar()}
                                <span>{starPoint != null ? starPoint.toFixed(1) : 0}</span>
                                <span>/5</span>
                            </div>
                        </div>
                        <div className="box_bottom">
                            <div className='scorebar_form'>
                                <div>{drawDistributionStar(5)}</div>
                                {ScoreBar({ score: pointCnt.cnt5 * 100 / rvCount.totalCount })}
                                <span className='score_text'>{(pointCnt.cnt5 * 100 / rvCount.totalCount).toFixed(1)}%</span>
                            </div>
                            <div className='scorebar_form'>
                                <div>{drawDistributionStar(4)}</div>
                                {ScoreBar({ score: pointCnt.cnt4 * 100 / rvCount.totalCount })}
                                <span className='score_text'>{(pointCnt.cnt4 * 100 / rvCount.totalCount).toFixed(1)}%</span>
                            </div>
                            <div className='scorebar_form'>
                                <div>{drawDistributionStar(3)}</div>
                                {ScoreBar({ score: pointCnt.cnt3 * 100 / rvCount.totalCount })}
                                <span className='score_text'>{(pointCnt.cnt3 * 100 / rvCount.totalCount).toFixed(1)}%</span>
                            </div>
                            <div className='scorebar_form'>
                                <div>{drawDistributionStar(2)}</div>
                                {ScoreBar({ score: pointCnt.cnt2 * 100 / rvCount.totalCount })}
                                <span className='score_text'>{(pointCnt.cnt2 * 100 / rvCount.totalCount).toFixed(1)}%</span>
                            </div>
                            <div className='scorebar_form'>
                                <div>{drawDistributionStar(1)}</div>
                                {ScoreBar({ score: pointCnt.cnt1 * 100 / rvCount.totalCount })}
                                <span className='score_text'>{(pointCnt.cnt1 * 100 / rvCount.totalCount).toFixed(1)}%</span>
                            </div>

                        </div>
                    </div>}
                </div>
                <div className="review_list">
                    <div>
                        <div className='review_title'>
                            <span>전체 리뷰</span>
                            <select value={rv} onChange={OnChangeReviewList}>
                                <option value="">최신순</option>
                                <option value="spUp">별점 낮은 순</option>
                                <option value="spDown">별점 높은 순</option>
                            </select>
                        </div>
                    </div>
                    {reviewDT && reviewDT.map((v, i) => {
                        const id = v.loginId;
                        const newId = id.slice(0, 2) + "*".repeat(id.length - 2);
                        return (
                            <div className='review_list_box' key={i}>
                                <div className='rv_top'>
                                    <div className="rvt_left">
                                        <span>{newId}</span>
                                        <span className="gap">|</span>
                                        <span>{v.regDate}</span>
                                        <span className="gap">|</span>
                                        <span>신고/차단</span>
                                    </div>
                                    <div className="rvt_right">
                                        <div>{drawDistributionStar(v.sp, 12, 12)}</div>
                                    </div>
                                </div>
                                <div className="rv_content">
                                    <div>
                                        {v.comment}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
            <div ref={navRef.changeInfo}></div>
        </Left>
    );
});

export default MainLeft;
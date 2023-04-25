import React, { memo, useCallback, useEffect } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

/** icons */
import { AiFillTrophy } from "react-icons/ai";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

// style.scss
const ProductDetailTitle = styled.div`
    width: 1200px;
    margin: auto;
    margin-top: 36px;
    background-color: white;

    .title{
        width:100%;
        h1{
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            padding-bottom: 16px;
        }
        p{
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            color: rgba(0,0,0,0.9);
        }
    }
    .info{
        span{
            font-size: 16px;
            &:after{
                content: '·';
                display: inline-block;
                padding: 0 5px;
            }
            &:last-of-type::after{
                color: white;
            }
        }
    }
`
const ProductDetailPrice = styled.div`
    width: 1200px;
    margin: auto;
    margin-top: 36px;
    background-color: white;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    padding-bottom: 20px;
    box-sizing: border-box;
    .info_left{
        width: 26%;
        height: 700px;
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        .author{
            font-size: 15px;
            font-weight: 700;
        }
        .publish{
            span{
                font-size: 14px;
                color: rgba(0,0,0,0.8);
                &:after{
                    content: '·';
                    display: inline-block;
                    padding: 0 5px;
                }
                &:last-of-type::after{
                    color: white;
                }
            }
        }
        .rank{
            display: flex;
            align-items: center;
            span{
                font-size: 11px;
                font-weight: 500;
                &:after{
                    content: '·';
                    display: inline-block;
                    padding: 0 5px;
                }
                &:first-of-type {
                    font-size: 12px;
                    font-weight: 700;
                }
                &:first-of-type::after{
                    content: '';
                }
                &:last-of-type::after{
                    color: white;
                }
            }
        }
        .rating{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 112px;
            border: 1px solid rgba(125,125,125,0.4);
            border-radius: 12px;
            margin-top: 30px;
            .box{
                div{
                    text-align: center;
                    p{
                        font-size: 12px;
                        line-height: 20px;
                    }
                    &.stars{
                        
                    }
                }
            }

        }
    }
    .img{
        display: flex;
        justify-content: center;
        width: 40%;
        height: 700px;
        img {
            
            height: 700px;
            object-fit: scale-down;
        }
    }
    .info_right{
        width: 26%;
        height: 700px;
        padding-top: 15px;
        div{
            display: flex;
            gap: 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
            padding-top: 24px;
            padding-bottom: 24px;
            
            span{
                font-weight: 700;
                &.salePrice{
                        span{
                            font-weight: 700;
                            font-size: 24px;
                            &:nth-of-type(3){
                                font-weight: 500;
                            }
                            &:nth-of-type(4){
                                font-size: 12px;
                                font-weight: 500;
                                color: #767676;
                                text-decoration: line-through;
                            }
                        }
                    }
                &.LItem{
                    font-size: 15px;
                    width: 25%;
                    font-weight: 700;
                }
                &.RItem{
                    text-align: end;
                    width:65%;
                    font-weight: 700;
                }
            }
            &:nth-of-type(1){
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 0px;
                border: none;
                .badge{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #5055b1;
                    border-radius: 5px;
                    span{
                        text-align: center;
                        color: #5055b1;
                        padding: 2px 5px;
                        font-size: 12px;
                        font-weight: 300;
                    }
                }
            }
        }



    }
`
// 상세페이지 이미지  458x0
const Top = memo(({ book, ranks, rvCount, params }) => {
    const reviewCount = rvCount.totalCount;
    const starPoint = book.totalSp ? book.totalSp/reviewCount : 0
     // // 별그리기 함수
     const drawStar = useCallback(() => {
        const result = [];
        const sp = Math.floor(starPoint);
        const floorSp = starPoint % 1;
        const restSp = 5 - Math.ceil(starPoint);
        const boolean1 = isNaN(floorSp)
        if(!boolean1){
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

    return (
        <>
            <ProductDetailTitle>
                <div className="title">
                    <h1>{book.bookTitle}</h1>
                    <p>{book.authName}&nbsp;{book.ctgName}</p>
                </div>
            </ProductDetailTitle>

            <ProductDetailPrice>
                <div className="info_left">
                    <div className='author'>
                        <span>{book.authName + " 저자(글)"}</span>
                    </div>
                    <div className="publish">
                        <span>{book.pubName}</span>
                        <span>{book.pubDate}</span>
                    </div>
                    {/* 순위 */}
                    {ranks &&
                        (ranks.allrank != null || ranks.bigrank != null || ranks.smallrank != null) && (
                            <div className="rank">
                                {<AiFillTrophy style={{ color: "ffd700", width: "20px", height: "20px" }} />}&nbsp;<span>주간베스트</span>
                                {ranks.allrank != null && (<span>전체 {ranks.allrank}위</span>)}
                                {ranks.bigrank != null && (<span>{book.ctgUp} {ranks.bigrank}위</span>)}
                            </div>
                        )}
                    {/* 별점 */}
                    <div className="rating">
                        <div className='box'>
                            {book.totalSp !== 0 ?
                                // 별점이 있을때
                                (<>
                                    <div style={{color:"#ffdd70", fontWeight:"700", fontSize:"22px"}}>
                                        {starPoint.toFixed(1)}
                                    </div>
                                    <div className='stars'>
                                        {drawStar()}
                                    </div>
                                    <div>
                                        <p>({reviewCount}개의 리뷰)</p>
                                    </div>
                                </>)
                                // 별점이 없을때
                                : (
                                    <> 해당 제품은 현재 리뷰가 없습니다.</>
                                )}
                        </div>
                    </div>
                </div>
                <div className="img">
                    <img src={book.img.replace("IMAGE_SIZE", "458x0")} alt={book.bookTitle + "이미지"} />
                </div>
                <div className="info_right">
                    <div>
                        {book.discount > 0 && (<span className='badge'><span>할인중</span></span>)}
                        <span className='badge'><span>사은품</span></span>
                        <span className='badge'><span>이벤트</span></span>
                    </div>
                    <div>
                        <span className="salePrice">

                            {/* 할인율이 존재한다면 할인 가를 적용함. */}
                            {book.discount != null && book.discount != 0 && (
                                <>
                                    <span style={{ color: "#4DAC27" }}>{book.discount * 100}%</span>&nbsp;
                                    <span>{(book.price - book.price * book.discount).toLocaleString()}</span>
                                    <span>원</span>&nbsp;&nbsp;
                                </>
                            )}
                            <span>{book.price}원</span>
                        </span>
                    </div>
                    <div>
                        <span className="LItem">적립/혜택</span><span className="RItem" style={{ color: "green" }}>{Math.floor(book.price * 0.05)}P</span>
                    </div>
                    <div>
                        <span className="LItem">배송안내</span><span className="RItem">무료</span>
                    </div>
                </div>
            </ProductDetailPrice>

        </>
    );
});

export default Top;
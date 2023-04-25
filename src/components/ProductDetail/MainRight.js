import React, { memo, useCallback, useEffect } from 'react';
import styled from "styled-components";
import { Link,useNavigate,useParams } from "react-router-dom";


const Right = styled.div`
    width: 360px;
    margin-left: 56px;
    .title_wrap{
        width: 96%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        &:nth-of-type(2){
            margin-top: 60px;
        }
        .title_heading{
            font-size: 20px;
            font-weight: 700;
        }
        .title_right{
            a{
                font-size: 13px;
                font-weight: 700;
                text-decoration: none;
                color: rgba(0,0,0,0.5);
            }
            
        }
    }
    ul.prod_rowlist{
        display: flex;
        gap: 20px;
        flex-direction: column;
        li{
            div{
                display: flex;
                align-items: center;
                max-height: calc((100px - 2px) * 1.618 - 10px);
                div{
                    /* 상품이미지 */
                    &:first-of-type{
                        a{
                            display: flex;
                            width: 100px;
                            max-height: calc((100px - 2px) * 1.618 - 10px);
                            border: 1px solid #eaeaea;
                            box-sizing: border-box;
                            img{
                                width: 100%;
                            }
                        }
                    }
                    /* 상품정보 */
                    &:nth-of-type(2){
                        display: flex;
                        align-items: baseline;
                        flex-direction: column;
                        gap: 5px;
                        height: 100%;
                        margin-left: 16px;
                        .prod_rank{
                            width: 20px;
                            height: 19px;

                            display: flex;
                            justify-content: center;
                            align-items: center;

                            margin-bottom: 5px;
                            border-radius: 5px 0px 5px;
                            font-size: 12px;
                            font-weight: 700;
                            color: white;
                        }
                        a{
                           text-decoration: none;
                           &:hover {
                            text-decoration: underline
                           }
                           span{
                                display: -webkit-box;
                                overflow: hidden;
                                max-height: 46px;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                color:black;
                                font-size: 15px;
                                font-weight: 500;
                                
                           }

                        }
                        .prod_author{
                            margin-top:5px;
                            font-size: 13px;
                            font-weight: 300;
                        }
                        .prod_price_info{
                            margin-top:12px;
                            font-size:14px;
                            .prod_discount{
                                font-weight: 700;
                                color: #4DAC27;
                            }
                            .prod_price{
                                font-weight: 500;
                            }
                        }
                    }

                }
            }
        }
    }
`

const MainRight = memo(({ top5, new5, params }) => {
    // top5 리스트의 key값들 
    /** 사용되는 곳
     * 받아오기 top5값이 있는지 진위 여부 
     * 상품 각각의 정보를 받아올 때 사용 될 것
     */
    const topList = Object.keys(top5);
    const newList = Object.keys(new5);
    return (
        <Right>
            <div className="title_wrap">
                <p className="title_heading">이 분야의 베스트</p>
                <div className="title_right">
                    <Link to="/payment">{"더보기 >"} </Link>
                </div>
            </div>
            
            <ul className='prod_rowlist'>
                {   
                    // top5 값이 존재하는지 확인 
                    topList.length === 0 ? 
                    // top5 값이 존재하지 않을때
                    <>해당 분야 판매 기록이 없습니다.</> : 
                    // top5 값이 존재할 때
                    (topList.map((v) => {
                        const book = top5[v];
                        return (
                            <li key={v}>
                                <div>
                                    {/* 상품 이미지 */}
                                    <div>
                                        <Link className='prod_link' to={"/product_detail/" + book.bookNo}>
                                            <img src={book.img.replace("IMAGE_SIZE", "100x0")} alt={book.bookTitle} />
                                        </Link>
                                    </div>
                                    {/* 상품 정보 */}
                                    <div>
                                        {/* 순위 */}
                                        {book.ranking != 1 ? 
                                        (<span className="prod_rank"  style={{backgroundColor: "#767676"}} ><span>{book.ranking}</span></span>)
                                        :(<span className="prod_rank" style={{backgroundColor: "#4DAC27"}}><span>{book.ranking}</span></span>)
                                        }
                                        {/* 제목 */}
                                        <Link  to={"/product_detail/" + book.bookNo}>
                                            <span>{book.bookTitle}</span>
                                        </Link>
                                        {/* 작가 */}
                                        <span className="prod_author">{book.authName}</span>
                                        {/* 가격 */}
                                        <div className="prod_price_info">
                                            {book.discount != 0 && <span className='prod_discount'>{book.discount*100}%&nbsp;</span>}
                                            <span className='prod_price'>{book.price*(1-book.discount)}</span>
                                            <span>원</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    }))

                }
            </ul>

            <div className="title_wrap">
                <p className="title_heading">이 분야의 신작</p>
                <div className="title_right">
                    <Link to="/payment">{"더보기 >"} </Link>
                </div>
            </div>
            
            <ul className='prod_rowlist'>
                {   
                    // top5 값이 존재하는지 확인 
                    newList.length === 0 ? 
                    // top5 값이 존재하지 않을때
                    <>해당 분야 신작이 없습니다.</> : 
                    // top5 값이 존재할 때
                    (newList.map((v) => {
                        const book = new5[v];
                        return (
                            <li key={v}>
                                <div>
                                    {/* 상품 이미지 */}
                                    <div>
                                        <Link className='prod_link' to={"/product_detail/" + book.bookNo}>
                                            <img src={book.img.replace("IMAGE_SIZE", "100x0")} alt={book.bookTitle} />
                                        </Link>
                                    </div>
                                    {/* 상품 정보 */}
                                    <div>
                                        {/* 제목 */}
                                        <Link  to={"/product_detail/" + book.bookNo}>
                                            <span>{book.bookTitle}</span>
                                        </Link>
                                        {/* 작가 */}
                                        <span className="prod_author">{book.authName}</span>
                                        {/* 가격 */}
                                        <div className="prod_price_info">
                                            {book.discount != null && <span className='prod_discount'>{book.discount*100}%&nbsp;</span>}
                                            <span className='prod_price'>{book.price*(1-book.discount)}</span>
                                            <span>원</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    }))

                }
            </ul>

        </Right>
    );
});

export default MainRight;
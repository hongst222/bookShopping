import React, { memo, useCallback, useState,useEffect, useRef } from 'react';
import styled from 'styled-components';

import {BsPlus, BsDash} from 'react-icons/bs';
import {HiOutlineHeart, HiHeart} from 'react-icons/hi';
const ProdFooter = styled.div`
    width: 100%;
    height: 94px;
    border-top: 1px solid #ccc;
    position: fixed;
    z-index: 999;
    left: 0;
    bottom:0;
    background-color: white;
    .inner{
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        .left{
            width:20%;
            height: 30px;
            display: flex;
            align-items: center;
            font-size: 25px;
            font-weight:700;
            span{
                &:first-of-type{
                    font-size: 15px;
                    margin-right: 30px;
                }
                &:last-of-type{
                    font-weight: 500;
                }
            }
        }
        .right{
            width: 40%;
            margin-left: 20%;
            display: flex;
            align-content: center;

            .count_button{
                font-size: 16px;
                display: flex;
                align-items: center;
                margin-right: 20px;
                input{    
                    width: 35px;
                    height: 40px;
                    text-align: center;
                    border: 1px solid #ccc;
                    border-left: none;
                    border-right: none;
                    
                    box-sizing: border-box;
                    &:focus{
                        outline: none;
                    }
                }
                button{
                    width: 35px;
                    height: 40px;
                    background-color: white;
                    cursor: pointer;
                   
                    &.down{
                        vertical-align: center;
                        border : 1px solid #ccc;
                        border-radius: 6px 0 0 6px;
                        border-right: none;
                        
                    }
                    &.up{
                        vertical-align: center;
                        border : 1px solid #ccc;
                        border-radius: 0 6px 6px 0;
                        border-left: none;
                    }
                }
            }
            .like{
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center; 
                background-color: white;
            
                border: 1px solid #ccc;
                border-radius: 6px;

                &:hover{
                    cursor: pointer;
                }
                .unfill_heart{
                    &.fill{
                        .symbol{
                            color: red;
                            fill : red;
                        }
                    }
                }
            }
            .btn{
                width: 130px;
                height: 50px;
                color: white;
                border: 1px solid #ccc;
                border-radius: 6px;
                margin-left : 15px;
                font-size: 16px;
                font-weight: 700;
                &.cart{
                    background-color: #767676;
                }
                &.buynow{
                    background-color: #5055B1;
                }
            }
        }
    }

`

const DetailFooter = memo(({price,discount,params}) => {
    useEffect(() => {
        setCount(1);    
    },[params]);

    const heart = useRef(null);
    const [count, setCount] = useState(1);
    const onClickToLike = useCallback( e => {
        if(heart.current.classList.contains('fill')){
            heart.current.classList.remove('fill');
            console.log('fill');
        } else {
            heart.current.classList.add('fill');
            console.log('unfill');
        }
    },[]);
    const onClickUp = useCallback(e => {
        setCount(Math.min(count+1,99));
        console.log("업버튼 눌림");
    },[count])
    const onClickDown = useCallback(e => {
        setCount(Math.max(count-1,1));
        console.log("다운버튼 눌림");
    },[count])
    const onChangeValue = useCallback(e => {
        const cnt =e.target.value;
        if(cnt >999){
            setCount(Math.min(cnt,999))
        } else {
            setCount(Math.max(cnt,1));
        }
        
        console.log(count);
    },[])

    return (
        <ProdFooter>
            <div className="inner">
                <div className="left">
                    <span>총 상품 금액</span>
                    {/* toLocaleStirng()으로 세자리마다 쉼표로 구분하여 사용자가 이용하기 쉽게함. */}
                    <span>{(price * (1-discount) *count).toLocaleString()}</span><span>원</span>
                </div>
                <div className="right">
                    <div className="count_button">
                        <button className='down' onClick={onClickDown}>
                            <BsDash style={{width: "20px", height: "20px"}}/>
                        </button>
                        
                        <input type="number"  value={count} title="prod_count" autoComplete='off' onChange={onChangeValue}/>
                       
                        <button className='up' onClick={onClickUp}>
                            <BsPlus style={{width: "20px", height: "20px"}}/>
                        </button>
                    </div>

                    <button className="like" onClick={onClickToLike}>
                        <span className= "unfill_heart" ref = {heart}>
                            <HiOutlineHeart className= "symbol" style={{width: "20px", height: "20px" }} />
                        </span>
                    </button>
                    <button className="btn cart">장바구니</button>
                    <button className="btn buynow">바로구매</button>
                </div>
            </div>
        </ProdFooter>
    );
});

export default DetailFooter;
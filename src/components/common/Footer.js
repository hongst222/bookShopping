import styled from "styled-components";
import React, { memo, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//icons
import { BsFillFilePersonFill } from "react-icons/bs";
import {FaGithub} from "react-icons/fa";
import { setPm } from "../../slices/StateSlice";
const FooterContainer = styled.div`
    width: 100%;
    height: 320px;

    display: flex;
    justify-content: center;


    background-color: white;
    margin-top: 16px;
    border-top: 1px solid rgba(125,125,125,0.4);
    border-bottom: 1px solid rgba(125,125,125,0.4);
    
    >.content{
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 1200px;
        font-size: 30px;
        padding: 40px;
        box-sizing: border-box;
        >.content_top{
            display:flex;
            align-items: center;
            justify-content: space-between;
            >.left{
            }
            >.right{
                display: flex;
                align-items: center;
                flex-direction: row;
                gap:12px;
                >.r_l{
                    display: flex;
                    align-items: center;
                }
                >.r_r{
                    
                    >select{
                        border-radius: 6px;
                        border: 2px solid #d5d5d5;
                        box-sizing: border-box;
                        transition: border-color 0.2s ease-out, border-radius 0.2s ease-out;
                        outline: none;
                        height: 38px;
                        padding: 0 14px;
                    }
                }
                >a{
                    color:black;
                }
            }
        }
        >.content_bottom{
            >p{
                font-size: 20px;
                color: rgb(80, 85, 177);
            }
        }
    }
`

const Footer = memo(() => {
    const dispatch = useDispatch();
    const { pm: pm , ml: ml } = useSelector((state) => state.StateSlice);

    const onChangeMember = useCallback((e) => {
        dispatch(setPm(e.currentTarget.value));
    })
    return (
        <FooterContainer>
            <div className="content">
                <div className="content_top">
                    <div className="left">
                        <img src="https://contents.kyobobook.co.kr/resources/fo/images/common/ink/img_logo_kyobo_footer.png" alt="" />
                    </div>
                    <div className="right">
                        <div className="r_l">
                            <BsFillFilePersonFill style={{width: "30px", height:"30px", fill: "#57be57"}}/>
                        </div>
                        <div className="r_r">
                            <select value={pm} onChange={onChangeMember}>
                                <option value="khj">김효진</option>
                                <option value="hst">홍승택</option>
                                <option value="ihw">이현우</option>
                            </select>
                        </div>
                        <a href={ml[pm]} ><FaGithub style={{cursor:"pointer"}}/></a>
                    </div>
                </div>
                <div className="content_bottom">
                    <p>해당 페이지는 포트폴리오를 위한 프로젝트입니다.</p>
                </div>
            </div>
        </FooterContainer>
    );
});

export default Footer;
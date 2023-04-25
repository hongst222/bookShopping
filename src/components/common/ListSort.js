/**
 *  @filename : ListSort.js
 *  @author : 홍승택
 *  @description : 콘텐츠 윗부분(카드형,리스트형 선택 && 몇 개씩 볼지 정하기)
 *  @추가해야할기능 : state 값에 따라 보는 개수 바꾸기
 */

import { useCallback } from 'react';
import { useEffect, useState, useRef, memo } from 'react';
import styled from 'styled-components';
import card from '../assets/img/card.png';
import list from '../assets/img/list.png';

const ListSortContainer = styled.div`
        width: 100%;
        height: 70px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 10px;
        
        align-items: center;
        margin-bottom: 10px;
        background-color: rgba(125,125,125,0.2);
        border-radius: 15px;
        select{
            width: 150px;
            height: 30px;
            border-radius: 7px;
        }
        .btn_wrap{
            margin-right: 20px;
            button{
                background-color: white;
                width: 30px;
                height: 30px;
                padding: 0;
                border: 0.1px solid black;
                
            img{

                    object-fit: contain;
                    height: 20px;
            }
            }
        }
`
const ListSort = memo(() => {
    /** 몇개 씩 볼지 정하는 State */
    const [count, setCount] = useState(20);

    /** 개수 정하는 드롭다운 클릭 이벤트 */
    const onChangeSelect = useCallback((e) => {
        const current = e.currentTarget;
        setCount(current.value);
    }, []);

    /**  count state가 바뀔 때 마다 로그로 체크 */
    useEffect(() => {
        console.log(count);
    }, [count]);

    return (
        <ListSortContainer>
            <select defaultValue={20} onChange={onChangeSelect}>
                <option value="20">20개씩 보기</option>
                <option value="50">50개씩 보기</option>
            </select>
            <div className='btn_wrap'>
                <button>
                    <img src={list} alt="리스트형 이미지" />
                </button>
                <button>
                    <img src={card} alt="카드형 이미지" />
                </button>
            </div>
        </ListSortContainer>
    );
});

export default ListSort;
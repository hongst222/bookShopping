import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
/** Slice */
import { BookGetItem } from './slices/BookSlice';
import Spinner from './components/common/Spinner';
import { ordersPostItem } from './slices/OrdersSlice';
import { orderDetailsPostItem } from './slices/OrderDetailsSlice';
const Table = styled.table`
    width: 50%;
    margin: auto;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    border: #000000 1px solid;
    
    th {
        border: #000000 1px solid;
        width:20%;
        background: white;
        padding: 12px 10px;
        box-sizing: content-box;
        font-weight: 700;
    }
    td {
        border: #000000 1px solid;
        padding: 12px 10px;
        color:#767676;
    }
   
`;

const Test = memo(() => {
    const dispatch = useDispatch();
    const { data: bookData, loading: bookLoading, error: bookError } = useSelector((state) => state.BookSlice);
    
    const [list, setList] = useState([]);
    const [a1, setA1] = useState(1);
    const [formdata, setFormdata] = useState({
        orderNo: 1,
        userNo: 1,
        bookNo: 0,
        cnt: 1,
        price: 0,

    });
    const draw = useCallback(() => {
        return list.map((v, i) => {
            return (
                <tr key={i}>
                    <td>{v.orderNo}</td>
                    <td>{v.userNo}</td>
                    <td>{v.bookNo}</td>
                    <td>{v.cnt}</td>
                    <td>{v.price}</td>
                </tr>
            );
        })

    }, [list]);
    const clickOrder = useCallback(() => {
        const a = list.reduce((acc, cur) => acc + (cur.price * cur.cnt), 0);
        dispatch(ordersPostItem({
            userNo: formdata.userNo,  
            orderDate: "2023-04-05",
            totalPrice: a,
        }))
    }, [list])

    const clickDetail = useCallback(() => {
        list.map((v) => {
            dispatch(orderDetailsPostItem({
                orderNo: v.orderNo,
                userNo: v.userNo,
                bookNo: v.bookNo,
                price: v.price,
                amount: v.cnt
            }))
        })
    }, [list]);
    const onChangeInput = useCallback((e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value == 0 ? '' : Number(e.target.value),
        });
        if (e.target.name == "bookNo") {
            if(e.target.value != 0){
                dispatch(BookGetItem({ bookNo: Number(e.target.value) }))
            }
        }
    }, [formdata])

    useEffect(() => {
        bookData && setFormdata({
            ...formdata,
            price: bookData.price
        });
    }, [bookData])
    const onSubmitHandler = useCallback((e) => {
        e.preventDefault();
        const bn = formdata["bookNo"];
        a1 ? setA1(false) : setA1(true);
    }, [formdata, dispatch]);

    useEffect(() => {
        if (formdata["bookNo"] != 0) {
            setList([
                ...list,
                formdata
            ])
        }
    }, [a1]);

    useEffect(() => {
        console.log(list);
    }, [list])


    return (<>
        <form action="" onSubmit={onSubmitHandler} style={{ width: "50%", margin: "auto", display: "flex", flexDirection: "column" }}>
           
            <label htmlFor='orderNo'>
                주문 번호:&nbsp;
                <input
                    id='orderNo'
                    name='orderNo'
                    type="number"
                    placeholder='주문 번호 입력'
                    min="0"
                    value={formdata.orderNo}
                    onChange={onChangeInput}
                />
            </label>
            <label htmlFor='bookNo'>
                유저 번호:&nbsp;
                <input
                    id='userNo'
                    name='userNo'
                    type="number"
                    placeholder='user 번호 입력'
                    min="0"
                    value={formdata.userNo}
                    onChange={onChangeInput}
                />
            </label>

            <label htmlFor='bookNo'>
                책 번호:&nbsp;
                <input
                    id='bookNo'
                    name='bookNo'
                    type="number"
                    placeholder='책 번호 입력'
                    min="0"
                    value={formdata.bookNo}
                    onChange={onChangeInput}
                />
            </label>
            <label htmlFor='cnt'>
                수량:&nbsp;
                <input
                    id='cnt'
                    name='cnt'
                    type="number"
                    min="0"
                    value={formdata.cnt}
                    onChange={onChangeInput}
                />
            </label>

            <button onSubmit={onSubmitHandler} style={{ width: "35%" }}>제출하기</button>
        </form>
        <br />

        {bookLoading ? <Spinner loading={bookLoading} /> : bookData && (
            <Table>
                <thead>
                    <tr>
                        <th colSpan={2} style={{ textAlign: "center", fontSize: "24px" }}>책정보</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>제목</td><td>{bookData.bookTitle}</td></tr>
                    <tr><td>가격</td><td>{bookData.price}</td></tr>
                </tbody>
            </Table>
        )}


        <br />
        <Table>
            <thead>
                <tr>
                    <th colSpan={5} style={{ textAlign: "center", fontSize: "24px" }}>주문정보</th>
                </tr>
                <tr>
                    <th>주문번호</th>
                    <th>구매자번호</th>
                    <th>책번호</th>
                    <th>수량</th>
                    <th>가격</th>
                </tr>
            </thead>
            <tbody>
                {draw()}
            </tbody>
        </Table>
        <br />
        <div style={{width:"50%", margin: "auto"}}>
            <button onClick={clickOrder}>order 만들기</button>
            <button onClick={clickDetail}>orderdetail 만들기</button>
        </div>
    </>);
});

export default Test;
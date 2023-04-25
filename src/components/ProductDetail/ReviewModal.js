import React, { memo, useCallback, useEffect } from 'react';
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { setWriteReviewTrue, setWriteReviewFalse } from '../../slices/StateSlice';
import { BsPencilSquare } from 'react-icons/bs';
import styled from 'styled-components';
const RVM = styled.div`
    .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:100%;
        >.cl_title{
            font-size: 20px;
            font-weight: 700;
        }
        .close{
            position: relative;
            width: 25px;
            height: 25px;
            cursor: pointer;
            background-color: transparent;
            border: none;
            padding: 0;
        }
        .close::before, .close::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: #000;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
        .close::before{
            transform: rotate(45deg);
        }
        .close::after{
            transform: rotate(-45deg);
        }
    }

    >.content_box{

    }
    
`

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropOpcatiy: 0.3,
        zIndex: 1000
    },

    content: {
        width: '26%',
        height: '75%',
        padding: '30px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '14px'
    }
};

const ReviewModal = memo((book) => {
    const dispatch = useDispatch();
    const { writeReview: writeReview } = useSelector((state) => state.StateSlice);
    useEffect(() => {
        dispatch(setWriteReviewFalse());
    }, [])
    const handleReviewClick = useCallback(() => {
        dispatch(setWriteReviewTrue());
    }, []);
    const handleReviewClose = useCallback(() => {
        dispatch(setWriteReviewFalse());
    }, [])

    return (
        <>
            <button onClick={handleReviewClick}> <BsPencilSquare /> 리뷰 작성</button>
            <Modal isOpen={writeReview} style={modalStyle}>
                <RVM>
                    <div className="head">
                        <div className='cl_title'>리뷰쓰기</div>
                        <button className='close' onClick={handleReviewClose}></button>
                    </div>
                    <div className="content_box">
                        <div className="img_box">
                            {book.img && <img src={book.Img} alt={book.title} />}
                        </div>
                        <div className="info_box">
                            {book.title && <div>{book.title}</div>}
                            <div></div>
                        </div>
                    </div>
                </RVM>

            </Modal>
        </>
    );
});

export default ReviewModal;
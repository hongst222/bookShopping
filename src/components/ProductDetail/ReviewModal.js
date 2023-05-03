import React, { memo, useCallback, useEffect } from 'react';
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { setWriteReviewTrue, setWriteReviewFalse } from '../../slices/StateSlice';
import { BsPencilSquare } from 'react-icons/bs';
import styled from 'styled-components';


const RVM = styled.div`
    padding: 20px;
    
    .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:100%;
        margin-bottom: 15px;
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
    >.rvs_box{
        >.content_box{
            width: 100%;
            border: 1px solid #eaeaea;
            box-sizing: border-box;
            padding: 16px;
            display: flex;
            flex-direction: row;
            align-items: center;
            >.img_box{

            }
            >.info_box{
                margin-left: 16px;
                
            }
        }
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

const ReviewModal = memo(({ book }) => {
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
        console.log("aa");
    }, [])

    return (
        <>
            <button style={{
                cursor: "pointer"
            }} onClick={handleReviewClick}> <BsPencilSquare /> 리뷰 작성</button>
            <Modal isOpen={writeReview} style={modalStyle}>
                <RVM>
                    <div className="head">
                        <div className='cl_title'>리뷰쓰기</div>
                        <button className='close' onClick={handleReviewClose}></button>
                    </div>
                    <div className="rvs_box">
                        <div className="content_box">
                            <div className="img_box">
                                {<img src={book.img.replace("IMAGE_SIZE", "60x0")} alt={"sds"} />}
                            </div>
                            <div className="info_box">
                                {book.bookTitle && <span>{book.bookTitle}</span>}
                                <div></div>
                            </div>
                        </div>

                    </div>

                </RVM>

            </Modal>
        </>
    );
});

export default ReviewModal;
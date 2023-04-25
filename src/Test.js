import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** Slice */
import { BookGetListHotPotato, BookGetList, BookGetItem, BookPostItem, BookDeleteItem, BookPutItem, BookGetItemAuthName, BookGetListAuthName, BookGetItemRank } from './slices/BookSlice';
import { getList, getItem, postItem, deleteItem, putItem } from './slices/AuthorSlice';
import { ctgGetList, ctgGetItem, ctgPostItem, ctgDeleteItem, ctgPutItem } from './slices/CategorySlice';
import { likesGetList, likesGetItem, likesPostItem, likesDeleteItem, likesPutItem } from './slices/LikesSlice';
import { cartGetList, cartGetItem, cartPostItem, cartDeleteItem, cartPutItem } from './slices/CartSlice';
import dayjs from 'dayjs';
import { BookGetListTop5 } from './slices/BestBookSlice';
import { ReviewGetList } from './slices/ReviewSlice';
const Test = memo(() => {

    const dispatch = useDispatch();

    /** slice */
    const { ranks: bookRanks, pagination: bookpagination, data: bookData, loading: bookLoading, error: bookError } = useSelector((state) => state.BookSlice);
    const { ranks: babRanks, pagination: babPagination, data: babData, loading: babLoading, error: babError } = useSelector((state) => state.BestBookSlice);
    const { pagination: authpagination, data: authData, loading: authLoading, error: authError } = useSelector((state) => state.AuthorSlice);
    const { pagination: ctgpagination, data: ctgData, loading: ctgLoading, error: ctgError } = useSelector((state) => state.CategorySlice);
    const { pagination: likespagination, data: likesData, loading: likesLoading, error: likesError } = useSelector((state) => state.LikesSlice);
    const { pagination: cartpagination, data: cartData, loading: cartLoading, error: cartError } = useSelector((state) => state.CartSlice);
    const { pointCnt: pointcnt ,pagination: reviewpagination, data: reviewData, loading: reviewLoading, error: reviewError } = useSelector((state) => state.ReviewSlice);
    useEffect(() => {
        dispatch(ordersPutItem({
            
        }))
        
    }, [dispatch]);
    
    return (
        reviewData && pointcnt && (<>
            {JSON.stringify(reviewData)}
            {JSON.stringify(pointcnt)}
        </>)
    );
});

export default Test;
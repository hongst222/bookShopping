import { configureStore, combineReducers } from "@reduxjs/toolkit";
// react-persist 사용을 위한
import storage from "redux-persist/lib/storage/session";
import AuthorSlice from "./slices/AuthorSlice";
import BookSlice from "./slices/BookSlice";
import BestBookSlice from "./slices/BestBookSlice";
import CartSlice from "./slices/CartSlice";

import CategorySlice from "./slices/CategorySlice";
import EventSlice from "./slices/EventSlice"
import LikesSlice from "./slices/LikesSlice";
import OrderDetailsSlice from "./slices/OrderDetailsSlice";
import OutuserSlice from "./slices/OutuserSlice"
import QnaSlice from "./slices/QnaSlice";
import ReviewSlice from "./slices/ReviewSlice";
import UserSlice from "./slices/UserSlice";
import BookAboutBestSlice from "./slices/BookAboutBestSlice";
import BookAboutNewSlice from "./slices/BookAboutNewSlice";
import OrdersSlice from "./slices/OrdersSlice";

// 별도로 관리하는 상태변수
import StateSlice from "./slices/StateSlice";
// 로그인 관련 상태변수
import LoginSlice from "./slices/LoginSlice";
// persist 사용으로 로그인 상태 유지를 위함 (리액트는 새로고침하면 상태변수가 날라감)
import persistReducer from "redux-persist/es/persistReducer";

const reducers = combineReducers({

    //   책 관련
    BookSlice: BookSlice,
    BookAboutBestSlice: BookAboutBestSlice,
    BookAboutNewSlice: BookAboutNewSlice,
    BestBookSlice: BestBookSlice,

    AuthorSlice: AuthorSlice,
    CategorySlice: CategorySlice,
    OrderDetailsSlice: OrderDetailsSlice,
    OrdersSlice: OrdersSlice,
    LikesSlice: LikesSlice,
    CartSlice: CartSlice,
    UserSlice: UserSlice,
    ReviewSlice: ReviewSlice,
    QnaSlice: QnaSlice,
    OutuserSlice: OutuserSlice,
    EventSlice: EventSlice,

    // 따로 사용하는 상태변수
    StateSlice: StateSlice,
    LoginSlice: LoginSlice,


});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['LoginSlice']
}

const persistReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistReducers,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            // payload 가 직렬화 가능한 형태가 아니어도 오류를 발생시키지 않게 하기위함
            serializableCheck: false
        }),
    ],
});
export default store;
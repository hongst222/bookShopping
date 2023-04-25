import { configureStore } from "@reduxjs/toolkit";
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

import StateSlice from "./slices/StateSlice";
import LoginSlice from "./slices/LoginSlice";

const store = configureStore({
  reducer: {
      //   책 관련
      BookSlice: BookSlice,
      BookAboutBestSlice: BookAboutBestSlice,
      BookAboutNewSlice: BookAboutNewSlice,
      BestBookSlice: BestBookSlice,
      
      AuthorSlice : AuthorSlice,
      CategorySlice : CategorySlice,
      OrderDetailsSlice : OrderDetailsSlice,
      OrdersSlice : OrdersSlice,
      LikesSlice : LikesSlice,
      CartSlice : CartSlice,
      UserSlice : UserSlice,
      ReviewSlice : ReviewSlice,
      QnaSlice : QnaSlice,
      OutuserSlice : OutuserSlice,
      EventSlice : EventSlice,
      
      // 로그인에 사용하는 상태변수들
      LoginSlice : LoginSlice,
      // 따로 사용하는 상태변수
      StateSlice : StateSlice,

  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
        // payload 가 직렬화 가능한 형태가 아니어도 오류를 발생시키지 않게 하기위함
        serializableCheck: false
    }),
  ],
});
export default store;
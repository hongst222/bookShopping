const express = require('express');
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const CartService = require("../services/CartService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/cart";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.userNo = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await CartService.getCount(params);
            pageInfo =  pagination(totalCount, page, rows);
           
            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await CartService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:cartNo`, async (req, res, next) => {
        // 파라미터 받기
        const { cartNo } = req.params;

        // 파라미터 유효성검사
        try {
            //regexHelper.value(userNo, "userNo 입력 바람.");
        } catch (err) {
            return next(err);
        }
        // 데이터 조회
        let json = null;
        try {
            json = await CartService.getItem({
                cartNo: cartNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 추가 --> Create(INSERT) */
    router.post(url, async (req, res, next) => {
        // 파라미터 받기
        const { cartCnt, bookNo, userNo } = req.body;
        // 유효성 검사
        try {
            
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await CartService.addItem({
                cartCnt: cartCnt,
                bookNo : bookNo, 
                userNo : userNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:cartNo`, async (req, res, next) => {
        // 파라미터 받기
        const { cartNo } = req.params;
        const { cartCnt, bookNo, userNo } = req.body;

        // 데이터 저장
        let json = null;

        try {
            json = await CartService.editItem({
                cartNo : cartNo,
                cartCnt: cartCnt,
                bookNo : bookNo, 
                userNo : userNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:cartNo`, async (req, res, next) => {
        // 파라미터 받기
        const { cartNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(cartNo, "장바구니 번호 없습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await CartService.deleteItem({
                cartNo : cartNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
const express = require('express');
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const OrderDetailsService = require("../services/OrderDetailsService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/orderDetails";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.orderDetailNo = query;
            params.bookNo = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await OrderDetailsService.getCount(params);
            pageInfo =  pagination(totalCount, page, rows);
           
            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await OrderDetailsService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:orderDetailNo`, async (req, res, next) => {
        // 파라미터 받기
        const { orderDetailNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(orderDetailNo, "해당하는 orderDetailNo가 없습니다.");
        } catch (err) {
            return next(err);
        }
        // 데이터 조회
        let json = null;
        try {
            json = await OrderDetailsService.getItem({
                orderDetailNo: orderDetailNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 추가 --> Create(INSERT) */
    router.post(url, async (req, res, next) => {
        // 파라미터 받기
        const { orderNo, amount, bookNo, price } = req.body;
        // 유효성 검사
        try {
            
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await OrderDetailsService.addItem({
                orderNo : orderNo, 
                amount : amount,
                bookNo: bookNo,
                price : price,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:orderDetailNo`, async (req, res, next) => {
        // 파라미터 받기
        const { orderDetailNo } = req.params;
        const { orderNo, amount, bookNo,price } = req.body;

        // 데이터 저장
        let json = null;

        try {
            json = await OrderDetailsService.editItem({
                orderDetailNo: orderDetailNo,
                orderNo: orderNo,
                amount : amount,
                bookNo: bookNo,
                price : price,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:orderDetailNo`, async (req, res, next) => {
        // 파라미터 받기
        const { orderDetailNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(orderDetailNo, "해당하는 판매 번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await OrderDetailsService.deleteItem({
                orderDetailNo: orderDetailNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    /** Inner Join */
    /** 순위 구하기 */
    

    return router;
})();
const express = require('express');
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const OrdersService = require("../services/OrdersService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/orders";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page = 1, rows = 5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.orderNo = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await OrdersService.getCount(params);
            pageInfo = pagination(totalCount, page, rows);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await OrdersService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:orderNo`, async (req, res, next) => {
        // 파라미터 받기
        const { orderNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(orderNo, "해당하는 orderNo가 없습니다.");
        } catch (err) {
            return next(err);
        }
        // 데이터 조회
        let json = null;
        try {
            json = await OrdersService.getItem({
                orderNo: orderNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 추가 --> Create(INSERT) */
    router.post(url, async (req, res, next) => {
        // 파라미터 받기
        const { orderDate, userNo, totalPrice,  } = req.body;
        // 유효성 검사
        try {
            regexHelper.value(orderDate, "날짜 입력바람.");
            regexHelper.value(totalPrice, "tt입력바람");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await OrdersService.addItem({
                orderDate: orderDate,
                userNo: userNo,
                totalPrice: totalPrice,
                
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:orderNo`, async (req, res, next) => {
        // 파라미터 받기
        const { orderNo } = req.params;
        const { orderDate, userNo, totalPrice,  } = req.body;

        // 데이터 저장
        let json = null;

        try {
            json = await OrdersService.editItem({
                userNo: userNo,
                orderDate: orderDate,
                totalPrice: totalPrice
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:orderNo`, async (req, res, next) => {
        // 파라미터 받기
        const { orderNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(orderNo, "해당하는 판매 번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await OrdersService.deleteItem({
                orderNo: orderNo,
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
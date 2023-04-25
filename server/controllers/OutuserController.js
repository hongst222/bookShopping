const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const outuserService = require("../services/OutuserService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/outuser";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.userNo = query;
            params.outDate = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await outuserService.getCount(params);
            pageInfo = pagination(totalCount, page, rows);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await outuserService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:userNo`, async (req, res, next) => {
        // 파라미터 받기
        const { userNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(userNo, "일련번호가 없습니다.");
            regexHelper.num(userNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 조회
        let json = null;

        try {
            json = await outuserService.getItem({
                userNo: userNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 추가 --> Create(INSERT) */
    router.post(url, async (req, res, next) => {
        // 파라미터 받기
        const params = req.body;
        
        // 유효성 검사
        try {
            regexHelper.value(params.userNo, "사용자 일련번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await outuserService.addItem({
                userNo: params.userNo,
                outDate: params.outDate
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:userNo`, async (req, res, next) => {
        // 파라미터 받기
        const { userNo } = req.params;
        const params = req.body;

        // 유효성 검사
        try {
            regexHelper.value(params.outDate, "탈퇴날짜가 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await outuserService.editItem({
                userNo: userNo,
                outDate: params.outDate
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:userNo`, async (req, res, next) => {
        // 파라미터 받기
        const { userNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(userNo, "일련번호가 없습니다.");
            regexHelper.num(userNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await outuserService.deleteItem({
                userNo: userNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
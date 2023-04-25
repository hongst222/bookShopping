const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const eventService = require("../services/EventService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/event";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.eventNo = query;
            params.evTitle = query;
            params.evDate = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await eventService.getCount(params);
            pageInfo = pagination(totalCount, page, rows);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await eventService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:eventNo`, async (req, res, next) => {
        // 파라미터 받기
        const { eventNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(eventNo, "일련번호가 없습니다.");
            regexHelper.num(eventNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 조회
        let json = null;

        try {
            json = await eventService.getItem({
                eventNo: eventNo,
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
        if(!params.evImg){
            params.evImg=null;
        }
        
        // 유효성 검사
        try {
            regexHelper.value(params.evTitle, "이벤트 제목이 없습니다.");
            regexHelper.value(params.evContent, "이벤트 내용이 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await eventService.addItem({
                evTitle: params.evTitle,
                evContent: params.evContent,
                view: params.view,
                evDate:params.evDate,
                evImg: params.evImg
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:eventNo`, async (req, res, next) => {
        // 파라미터 받기
        const { eventNo } = req.params;
        const params = req.body;
        if(!params.evImg){
            params.evImg=null;
        }

        // 유효성 검사
        try {
            regexHelper.value(params.evTitle, "이벤트 제목이 없습니다.");
            regexHelper.value(params.evContent, "이벤트 내용이 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await eventService.editItem({
                eventNo: eventNo,
                evTitle: params.evTitle,
                evContent: params.evContent,
                view: params.view,
                evDate:params.evDate,
                evImg: params.evImg
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:eventNo`, async (req, res, next) => {
        // 파라미터 받기
        const { eventNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(eventNo, "일련번호가 없습니다.");
            regexHelper.num(eventNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await eventService.deleteItem({
                eventNo: eventNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
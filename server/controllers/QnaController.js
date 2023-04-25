const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const qnaService = require("../services/QnaService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/qna";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.qnaTitle = query;
            params.qnaDate = query;
        }

        console.log(params);
        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await qnaService.getCount(params);
            pageInfo = pagination(totalCount, page, rows);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await qnaService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:qnaNo`, async (req, res, next) => {
        // 파라미터 받기
        const { qnaNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(qnaNo, "일련번호가 없습니다.");
            regexHelper.num(qnaNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 조회
        let json = null;

        try {
            json = await qnaService.getItem({
                qnaNo: qnaNo,
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

        if(!params.qnaAnswer) {
            params.qnaAnswer = null;
        }
        
        // 유효성 검사
        try {
            regexHelper.value(params.qnaTitle, "제목이 없습니다.");
            regexHelper.value(params.qnaContent, "내용이 없습니다.");
            regexHelper.value(params.userNo, "작성자가 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await qnaService.addItem({
                qnaTitle: params.qnaTitle,
                qnaContent: params.qnaContent,
                qnaDate: params.qnaDate,
                qnaAnswer: params.qnaAnswer,
                userNo: params.userNo
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:qnaNo`, async (req, res, next) => {
        // 파라미터 받기
        const { qnaNo } = req.params;
        const params = req.body;

        // 유효성 검사
        try {
            regexHelper.value(params.qnaTitle, "제목이 없습니다.");
            regexHelper.value(params.qnaContent, "내용이 없습니다.");
            regexHelper.value(params.userNo, "작성자가 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await qnaService.editItem({
                qnaNo: qnaNo,
                qnaTitle: params.qnaTitle,
                qnaContent: params.qnaContent,
                qnaDate: params.qnaDate,
                qnaAnswer: params.qnaAnswer,
                userNo: params.userNo
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:qnaNo`, async (req, res, next) => {
        // 파라미터 받기
        const { qnaNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(qnaNo, "일련번호가 없습니다.");
            regexHelper.num(qnaNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await qnaService.deleteItem({
                qnaNo: qnaNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
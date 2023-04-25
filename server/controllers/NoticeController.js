const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const noticeService = require("../services/NoticeService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/notice";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.noticeNo = query;
            params.ntTitle = query;
            params.ntDate = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await noticeService.getCount(params);
            pageInfo = pagination(totalCount, page, rows);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await noticeService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:noticeNo`, async (req, res, next) => {
        // 파라미터 받기
        const { noticeNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(noticeNo, "일련번호가 없습니다.");
            regexHelper.num(noticeNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 조회
        let json = null;

        try {
            json = await noticeService.getItem({
                noticeNo: noticeNo,
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
        if(!params.ntImg){
            params.ntImg=null;
        }
        
        // 유효성 검사
        try {
            regexHelper.value(params.ntTitle, "공지사항 제목이 없습니다.");
            regexHelper.value(params.ntContent, "공지사항 내용이 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await noticeService.addItem({
                ntTitle: params.ntTitle,
                ntContent: params.ntContent,
                ntView: params.ntView,
                ntDate:params.ntDate,
                ntImg: params.ntImg
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:noticeNo`, async (req, res, next) => {
        // 파라미터 받기
        const { noticeNo } = req.params;
        const params = req.body;
        if(!params.ntImg){
            params.ntImg=null;
        }

        // 유효성 검사
        try {
            regexHelper.value(params.ntTitle, "공지사항 제목이 없습니다.");
            regexHelper.value(params.ntContent, "공지사항 내용이 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await noticeService.editItem({
                noticeNo: noticeNo,
                ntTitle: params.ntTitle,
                ntContent: params.ntContent,
                ntView: params.ntView,
                ntDate:params.ntDate,
                ntImg: params.ntImg
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:noticeNo`, async (req, res, next) => {
        // 파라미터 받기
        const { noticeNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(noticeNo, "일련번호가 없습니다.");
            regexHelper.num(noticeNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await noticeService.deleteItem({
                noticeNo: noticeNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
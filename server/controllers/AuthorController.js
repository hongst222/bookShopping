const express = require('express');
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const AuthorService = require("../services/AuthorService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/author";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.authName = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await AuthorService.getCount(params);
            pageInfo =  pagination(totalCount, page, rows);
           
            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await AuthorService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:authNo`, async (req, res, next) => {
        // 파라미터 받기
        const { authNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(authNo, "해당하는 작가가 없습니다.");
        } catch (err) {
            return next(err);
        }
        // 데이터 조회
        let json = null;
        try {
            json = await AuthorService.getItem({
                authNo: authNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 추가 --> Create(INSERT) */
    router.post(url, async (req, res, next) => {
        // 파라미터 받기
        const { authName, authDesc } = req.body;
        // 유효성 검사
        try {
            regexHelper.value(authName, "작가 이름 입력바람.");
            regexHelper.maxLength(authName, 20, "작가 이름은 최대 20자까지 입력 가능합니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await AuthorService.addItem({
                authName : authName, 
                authDesc : authDesc,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:authNo`, async (req, res, next) => {
        // 파라미터 받기
        const { authNo } = req.params;
        const { authName, authDesc } = req.body;

        // 데이터 저장
        let json = null;

        try {
            json = await AuthorService.editItem({
                authNo: authNo,
                authName : authName, 
                authDesc : authDesc,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:authNo`, async (req, res, next) => {
        // 파라미터 받기
        const { authNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(authNo, "해당하는 책이 없습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await AuthorService.deleteItem({
                authNo: authNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
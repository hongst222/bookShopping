const express = require('express');
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const CategoryService = require("../services/CategoryService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/category";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.ctgName = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await CategoryService.getCount(params);
            pageInfo =  pagination(totalCount, page, rows);
           
            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await CategoryService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:ctgNo`, async (req, res, next) => {
        // 파라미터 받기
        const { ctgNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(ctgNo, "해당하는 작가가 없습니다.");
        } catch (err) {
            return next(err);
        }
        // 데이터 조회
        let json = null;
        try {
            json = await CategoryService.getItem({
                ctgNo: ctgNo,
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
        if(!params.ctgup){
            params.ctgup = null;
        }
        // 유효성 검사
        try {
            regexHelper.value(params.ctgName, "카테고리 이름 입력바람.");
            regexHelper.maxLength(params.ctgName, 20, "카테고리 이름은 최대 20자까지 입력 가능합니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await CategoryService.addItem({
                ctgNo: params.ctgNo,
                ctgName: params.ctgName,
                ctgUp : params.ctgUp,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:ctgNo`, async (req, res, next) => {
        // 파라미터 받기
        const { ctgNo } = req.params;
        const { ctgName, ctgUp } = req.body;

        // 데이터 저장
        let json = null;

        try {
            json = await CategoryService.editItem({
                ctgNo: ctgNo,
                ctgName : ctgName, 
                ctgUp : ctgUp,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:ctgNo`, async (req, res, next) => {
        // 파라미터 받기
        const { ctgNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(ctgNo, "해당하는 책이 없습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await CategoryService.deleteItem({
                ctgNo: ctgNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
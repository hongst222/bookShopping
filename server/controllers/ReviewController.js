const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const reviewService = require("../services/ReviewService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/review";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { odby, query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.bookNo = query;
        }
        if(odby) {
            params.odby = odby;
        }
        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await reviewService.getCount(params);
            pageInfo = pagination(totalCount, page, rows);
            // 점수당 데이터 얻기
            const cntArr = [];
            for(let i = 1; i<=5; i++){
                const cnt = await reviewService.getCount({bookNo: (params.bookNo|0) , point: i});
                cntArr.push(cnt);
            }
            
            pointCnt = {
                cnt1: cntArr[0], 
                cnt2: cntArr[1], 
                cnt3: cntArr[2], 
                cnt4: cntArr[3], 
                cnt5: cntArr[4]
            };

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await reviewService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pointCnt: pointCnt, pagination: pageInfo, item: json });
    });
    

    
    /** 단일행 조회 --> Read(SELECT) */
    router.get(`${url}/:reviewNo`, async (req, res, next) => {
        // 파라미터 받기
        const { reviewNo } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(reviewNo, "일련번호가 없습니다.");
            regexHelper.num(reviewNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 조회
        let json = null;

        try {
            json = await reviewService.getItem({
                reviewNo: reviewNo,
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
            regexHelper.value(params.comment, "내용이 없습니다.");
            regexHelper.value(params.sp, "별점이 없습니다.");
            regexHelper.value(params.userNo, "작성자가 없습니다.");
            
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await reviewService.addItem({
                comment: params.comment,
                sp: params.sp,
                regdate: params.regdate,
                userNo: params.userNo,
                bookNo: params.bookNo
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 수정 --> Update(UPDATE) */
    router.put(`${url}/:reviewNo`, async (req, res, next) => {
        // 파라미터 받기
        const { reviewNo } = req.params;
        const params = req.body;

        // 유효성 검사
        try {
            regexHelper.value(params.comment, "내용이 없습니다.");
            regexHelper.value(params.sp, "별점이 없습니다.");
            regexHelper.value(params.userNo, "작성자가 없습니다.");
            regexHelper.value(params.bookNo, "책 번호가 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await reviewService.editItem({
                reviewNo: reviewNo,
                comment: params.comment,
                sp: params.sp,
                regdate: params.regdate,
                userNo: params.userNo,
                bookNo: params.bookNo
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });

    /** 데이터 삭제 --> Delete(DELETE) */
    router.delete(`${url}/:reviewNo`, async (req, res, next) => {
        // 파라미터 받기
        const { reviewNo } = req.params;

        // 유효성 검사
        try {
            regexHelper.value(reviewNo, "일련번호가 없습니다.");
            regexHelper.num(reviewNo, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        try {
            await reviewService.deleteItem({
                reviewNo: reviewNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
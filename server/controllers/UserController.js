const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const userService = require("../services/UserService");
const { pagination } = require('../helper/UtilHelper');

module.exports = (() => {
    const url = "/user";
    const router = express.Router();

    /** 전체 목록 조회 --> Read(SELECT) */
    router.get(url, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.loginId = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await userService.getCount(params);
            pageInfo = pagination(totalCount, page, rows);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await userService.getList(params);
        } catch (err) {
            return next(err);
        }

        res.sendResult({ pagination: pageInfo, item: json });
    });

    /** 탈퇴하지 않은 회원만 조회 */
    router.get(`${url}/noout`, async (req, res, next) => {
        // 검색어, 페이지 번호, 한 페이지에 표시할 목록 수 파라미터
        const { query, page=1, rows=5 } = req.query;

        // 검색어를 MyBatis에 전달하기 위한 객체로 구성
        const params = {};
        if (query) {
            params.userNo = query;
            params.userName = query;
            params.loginId = query;
        }

        // 데이터 조회
        let json = null;

        try {
            // 전체 데이터 수 얻기
            const totalCount = await userService.getCount(params);
            pageInfo = pagination(totalCount, page, rows);

            params.offset = pageInfo.offset;
            params.listCount = pageInfo.listCount;
            json = await userService.getUList(params);
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
            json = await userService.getItem({
                userNo: userNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult({ item: json });
    });


    /** 단일행 조회 (id, pwd)--> Read(SELECT) */
    router.get(`${url}/:loginId`, async (req, res, next) => {
        // 파라미터 받기
        const { loginId, pwd } = req.params;

        // 파라미터 유효성검사
        try {
            regexHelper.value(loginId, "일련번호가 없습니다.");
            regexHelper.num(loginId, "일련번호가 잘못되었습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 조회
        let json = null;

        try {
            json = await userService.getIdPw({
                loginId: loginId,
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
        if(!params.bthDate){
            params.bthDate=null;
        }
        if(!params.outDate) {
            params.outDate=null;
        }
        
        // 유효성 검사
        try {
            regexHelper.value(params.loginId, "사용자 아이디가 없습니다.");
            regexHelper.value(params.pwd, "비밀번호가 없습니다.");
            regexHelper.value(params.userName, "이름이 없습니다.");
            regexHelper.value(params.email, "이메일이 없습니다.");
            regexHelper.value(params.postNum, "우편번호가 없습니다.");
            regexHelper.value(params.address, "주소가 없습니다.");
            regexHelper.value(params.phoneNum, "핸드폰 번호가 없습니다.");
            regexHelper.value(params.profile, "이미지파일경로가 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await userService.addItem({
                loginId: params.loginId,
                pwd: params.pwd,
                userName: params.userName,
                bthDate: params.bthDate,
                email: params.email,
                postNum: params.postNum,
                address: params.address,
                phoneNum: params.phoneNum,
                profile: params.profile,
                regDate: params.regDate,
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
        if(!params.bthDate){
            params.bthDate=null;
        }
        if(!params.outDate) {
            params.outDate=null;
        }

        // 유효성 검사
        try {
            regexHelper.value(params.loginId, "사용자 아이디가 없습니다.");
            regexHelper.value(params.pwd, "비밀번호가 없습니다.");
            regexHelper.value(params.userName, "이름이 없습니다.");
            regexHelper.value(params.email, "이메일이 없습니다.");
            regexHelper.value(params.postNum, "우편번호가 없습니다.");
            regexHelper.value(params.address, "주소가 없습니다.");
            regexHelper.value(params.phoneNum, "핸드폰 번호가 없습니다.");
            regexHelper.value(params.profile, "이미지파일경로가 없습니다.");
        } catch (err) {
            return next(err);
        }

        // 데이터 저장
        let json = null;

        try {
            json = await userService.editItem({
                userNo: userNo,
                loginId: params.loginId,
                pwd: params.pwd,
                userName: params.userName,
                bthDate: params.bthDate,
                email: params.email,
                postNum: params.postNum,
                address: params.address,
                phoneNum: params.phoneNum,
                profile: params.profile,
                regDate: params.regDate,
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
            await userService.deleteItem({
                userNo: userNo,
            });
        } catch (err) {
            return next(err);
        }

        res.sendResult();
    });

    return router;
})();
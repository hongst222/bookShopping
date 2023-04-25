const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const LoginService = require("../services/LoginService");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = (() => {
    const url = "/loginCheck";
    const router = express.Router();
    /** 로그인기능 */
    router.post(`${url}`, async (req, res, next) => {
        // 파라미터 받기
        const { loginId, pwd } = req.body;
        // 데이터 조회
        let json = null;
        try {
            json = await LoginService.getLoginInfo({
                loginId: loginId,
                pwd: pwd,
            });
        } catch (err) { 
            return next(err);
        }
        const inputPassword = pwd;
        const hashPassword = json.pwd;
        let result = false;
        try{
            result = bcrypt.compareSync(inputPassword, hashPassword);
        } catch(err){
            return next(err);
        }
        if (result) {
            // ("비밀번호 일치!");
            const refreshToken = jwt.sign({ userNo: json.userNo }, process.env.JWT_SECRET_KEY);
            res.cookie("tk", refreshToken, {signed:false, maxAge: 1000 * 60 * 60 * 10, httpOnly: false, path: "/" });
            res.cookie("userNo", json.userNo, {maxAge: 1000 * 60 * 60 * 10, httpOnly: false, path: "/" });
            res.sendResult({ item: { ...json, abcd: result, tk: req.cookies } });
            // 로그인 성공 처리
        } else {
            res.sendResult({item:{abcd:false}});
        }
    });


    return router;
})();
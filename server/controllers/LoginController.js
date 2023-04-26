const express = require("express");
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const LoginService = require("../services/LoginService");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = (() => {
   
    const router = express.Router();
    /** 로그인기능 */
    router.post('/login', async (req, res, next) => {
        // 파라미터 받기
        const { loginId, pwd } = req.body;

        let json = null;
        try {
            json = await LoginService.getLoginInfo({
                loginId: loginId,
                pwd: pwd,
            });

        } catch (err) {
            return next(err);
        }
        console.log(json);
        console.log(json.loginId);
        logger.debug("--------------------------------------------------");
        logger.debug("|         ss            |");
        logger.debug("--------------------------------------------------");
        if (json == null) {
            // 해당 아이디가 없는 경우
            res.status(403).json("Not Authorized");
        } else {
            // 해당 아이디가 존재하는 경우
            const inputPassword = pwd;
            const hashPassword = json.pwd;
            const userNo = json.userNo;
            const email = json.email;
            const bthDate = json.bthDate;
            let result = false;
            try {
                result = bcrypt.compareSync(inputPassword, hashPassword);
            } catch (err) {
                return next(err);
            }
            if (result) {
                // 로그인 성공 처리
                // accessToken 발급
                try {
                    const accessToken = jwt.sign({ userNo: userNo, email: email, bthDate: bthDate }, process.env.ACCESS_SECRET_KEY, {
                        expiresIn: '1m',
                        issuer: 'Seungtaek',

                    });
                    //refreshToekn 발급
                    const refreshToken = jwt.sign({ userNo: userNo, email: email, bthDate: bthDate}, process.env.REFRESH_SECRET_KEY, {
                        expiresIn: '24h',
                        issuer: 'Seungtaek',
                    });
                    res.cookie("rf_tk", refreshToken, { signed: false, httpOnly: true, secure: false, path: "/" });
                    res.cookie("ac_tk", accessToken, { signed: false, httpOnly: true, secure: false, path: "/" });
                    logger.debug("--------------------------------------------------");
                    logger.debug(`|         ${json.userNo}번 유저가 로그인 하였습니다.`);
                    logger.debug("--------------------------------------------------");
                    res.status(200).json("login success");
                    
                } catch (error) {
                    res.status(500).json(error);
                }

            } else {
                res.status(403).json("wrong password");
            }
        }
    });

    // accessToken 관련 기능
    router.get('/accesstoken', async (req, res, next) =>{
        try{
            //accesstoken의 쿠키명은 ac_tk
            const token = req.cookies.ac_tk;
            logger.debug("token: "+token);
            const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            const token_userNo = data.userNo;
            let userData = null;
            // 데이터 베이스에 token에 들어있는 user정보가 있는 지 확인하기 위해 데이터를 뽑음
            try{
                userData = await LoginService.getTokenUserInfo({
                  userNo: token_userNo,  
                });
            } catch (error){
                return next(err);
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json("no token");
        }
    });

    // refreshToken 관련 기능
    router.get('/refreshtoken', async (req, res, next) =>{

    });

    // 로그인 성공 관련 기능
    router.get('/login/success', async (req, res, next) =>{

    });

    // 로그아웃 관련 기능
    router.get('logout', async (req, res, next) =>{

    });
    return router;
})();
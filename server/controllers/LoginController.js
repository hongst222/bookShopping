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
        if (json == null) {
            // 해당 아이디가 없는 경우
            res.status(403).json("Not Authorized");
        } else {
            // 해당 아이디가 존재하는 경우
            const inputPassword = pwd;
            const hashPassword = json.pwd;
            const userNo = json.userNo;
            const userName = json.userName;
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
                    const accessToken = jwt.sign({
                        userNo: userNo,
                        userName: userName,
                        email: email,
                        bthDate: bthDate
                    }, process.env.ACCESS_SECRET_KEY, {
                        expiresIn: '1m',
                        issuer: 'Seungtaek',

                    });
                    //refreshToken 발급
                    const refreshToken = jwt.sign({
                        userNo: userNo,
                        userName: userName,
                        email: email,
                        bthDate: bthDate
                    }, process.env.REFRESH_SECRET_KEY, {
                        expiresIn: '24h',
                        issuer: 'Seungtaek',
                    });

                    res.cookie("ac_tk", accessToken, {
                        signed: false,
                        httpOnly: true,
                        secure: false,
                        path: "/"
                    });

                    res.cookie("rf_tk", refreshToken, {
                        signed: false,
                        httpOnly: true,
                        secure: false,
                        path: "/"
                    });
                    
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
    router.get('/accesstoken', async (req, res, next) => {
        try {
            //accesstoken의 쿠키명은 ac_tk
            const token = req.cookies.ac_tk;
            const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            let userData = null;
            // 데이터 베이스에 token에 들어있는 user정보가 있는 지 확인하기 위해 데이터를 뽑음
            try {
                userData = await LoginService.getTokenUserInfo({
                    userNo: data.userNo,
                });
            } catch (err) {
                return next(err);
            }
            res.status(200).json(userData);
        } catch (error) {
            res.status(401).json(error);
        }
    });

    // refreshToken 관련 기능
    router.get('/refreshtoken', async (req, res, next) => {
        // access token 갱신
        try {
            const token = req.cookies.rf_tk;
            const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
            let userData = null;
            // 데이터 베이스에 token에 들어있는 user정보가 있는 지 확인하기 위해 데이터를 뽑음
            try {
                userData = await LoginService.getTokenUserInfo({
                    userNo: data.userNo,
                });
            } catch (err) {
                return next(err);
            }
            // access Token 새로 발급
            const accessToken = jwt.sign({
                userNo: userData.userNo,
                userName: userData.userName,
                email: userData.email,
                bthDate: userData.bthDate
            }, process.env.ACCESS_SECRET_KEY, {
                expiresIn: '1m',
                issuer: 'Seungtaek',
            });
            res.cookie("ac_tk", accessToken, {
                signed: false,
                httpOnly: true,
                secure: false,
                path: "/"
            });
            
            res.status(200).json(userData);
        } catch (error) {
            res.status(401).json(error);
        }
    });

    // 로그인 성공 관련 기능
    router.get('/login/success', async (req, res, next) => {
        try {
            const token = req.cookies.ac_tk;
            const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            let userData = null;
            // 데이터 베이스에 token에 들어있는 user정보가 있는 지 확인하기 위해 데이터를 뽑음
            try {
                userData = await LoginService.getTokenUserInfo({
                    userNo: data.userNo,
                });
            } catch (err) {
                return next(err);
            }
            res.status(200).json(userData);
        } catch (error) {
            res.clearCookie("ac_tk");
            res.status(500).json(error);
        }
    });

    // 로그아웃 관련 기능
    // 따로 비동기작업이 필요하지 않으므로 async /await문이 없음
    router.post('/logout', (req, res) => {
        try {
            res.clearCookie('ac_tk', {path: "/"});
            res.clearCookie("rf_tk");
            res.status(200).json("Logout Success!");
        } catch (error) {
            res.status(500).json(error);
        }
    });
    return router;
})();
/**
 * app.js (최종)
 *
 * 
 * yarn add axios body-parser cookie-parser cors dayjs dotenv
            express express-session express-useragent method-override
            multer node-schedule node-thumbnail nodemailer
            serve-favicon serve-static winston winston-daily-rotate-file
            mysql2 mybatis-mapper express-mysql-session
            @babel/core @babel/node @babel/preset-env babel-loader

*/

/*----------------------------------------------------------
 | 1) 모듈참조
 -----------------------------------------------------------*/
/** 직접 구현한 모듈  */
const logger = require("./helper/LogHelper");
const { myip, urlFormat } = require("./helper/UtilHelper");
const WebHelper = require("./helper/WebHelper");

const fs = require("fs");
const { join, resolve } = require("path");


const dotenv = require("dotenv");
const express = require("express");
const useragent = require("express-useragent");
const serveStatic = require("serve-static");
const serveFavicon = require("serve-favicon");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);
const cors = require("cors");

/** 예외처리 관련 클래스 */
const { PageNotFoundException } = require("./helper/ExceptionHelper");

/*-----------------------------------------------------------
 | 2) Express 객체 생성
 -----------------------------------------------------------*/
const app = express();
const configFileName = process.env.NODE_ENV !== "production" ? ".env.server.development" : ".env.server.production";
const configPath = join(resolve(), configFileName);

if (!fs.existsSync(configPath)) {
    try {
        throw new Error();
    } catch (e) {
        console.error("================================================");
        console.error("|          Configuration Init Error            |");
        console.error("================================================");
        console.error("환경설정 파일을 찾을 수 없습니다. 환경설정 파일의 경로를 확인하세요.");
        console.error(`환경설정 파일 경로: ${configPath}`);
        console.error("프로그램을 종료합니다.");
        process.exit(1);
    }
}

dotenv.config({ path: configPath });

/*----------------------------------------------------------
 | 3) 클라이언트의 접속시 초기화
 -----------------------------------------------------------*/
app.use(useragent.express());

app.use((req, res, next) => {
    logger.debug("클라이언트가 접속했습니다.");
    const beginTime = Date.now();

    const current_url = urlFormat({
        protocol: req.protocol,
        host: req.get("host"),
        port: req.port,
        pathname: req.originalUrl,
    });

    logger.debug(`[${req.method}] ${decodeURIComponent(current_url)}`);

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    logger.debug(`[client] ${ip} / ${req.useragent.os} / ${req.useragent.browser} (${req.useragent.version}) / ${req.useragent.platform}`);

    res.on("finish", () => {
        const endTime = Date.now();
        const time = endTime - beginTime;
        logger.debug(`클라이언트의 접속이 종료되었습니다. ::: [runtime] ${time}ms`);
        logger.debug("--------------------------------------------------");
    });

    next();
});

/*----------------------------------------------------------
 | 4) Express 객체의 추가 설정
 -----------------------------------------------------------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));

app.use(cookieParser(process.env.COOKIE_ENCRYPT_KEY));

app.use("/", serveStatic(process.env.PUBLIC_PATH));
app.use(process.env.UPLOAD_URL, serveStatic(process.env.UPLOAD_DIR));
app.use(process.env.THUMB_URL, serveStatic(process.env.THUMB_DIR));

app.use(serveFavicon(process.env.FAVICON_PATH));

app.use(cors({
    origin: true,
    credentials: true // 사용자 인증이 필요한 리소스 접근
}));

app.use(WebHelper());

app.use(
    expressSession({
        secret: process.env.SESSION_ENCRYPT_KEY,
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore({
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_SCHEMA,
            createDatabaseTable: process.env.MYSQL_SESSION_CREATE_TABLE,
            schema: {
                tableName: process.env.MYSQL_SESSION_TABLE_NAME,
                columnNames: {
                    session_id: process.env.MYSQL_SESSION_FIELD_ID,
                    expires: process.env.MYSQL_SESSION_FIELD_EXPIRES,
                    data: process.env.MYSQL_SESSION_FIELD_DATA,
                },
            },
        }),
    })
);

const router = express.Router();
app.use("/", router);


/*----------------------------------------------------------
 | 5) 각 URL별 백엔드 기능 정의
 -----------------------------------------------------------*/
// 이미지 업로드 및 썸네일 제작 관련 기능 
// app.use(require(`./ResizingImage`));
// const FileHelper = require("./helper/FileHelper");
// router.route('/upload/single').post((req, res, next) => {
//     const upload = FileHelper.initMulter().single('myphoto');

//     upload(req, res, async (err) => {
//         console.group('request');
//         console.debug(req.file);
//         console.groupEnd();

//         try {
//             FileHelper.checkUploadError(err);
//         } catch (err) {
//             console.error(err);
//             res.status(500).send({
//                 rt: err.code,
//                 rtmsg: err.message
//             });

//             return;
//         }

//         // 썸네일을 생성
//         try {
//             await FileHelper.createThumbnail(req.file);
//         } catch (err) {
//             console.error(err);
//             res.status(500).send({
//                 rt: err.code,
//                 rtmsg: err.message
//             });
//             return;
//         }

//         res.status(200).send(req.file);
//     });
// });

// router.route('/upload/multiple').post((req, res, next) => {
//     req.file = [];

//     const upload = FileHelper.initMulter().array('myphoto');

//     upload(req, res, async (err) => {
//         console.group('request');
//         console.debug(req.file);
//         console.groupEnd();

//         try {
//             FileHelper.checkUploadError(err);
//         } catch (err) {
//             console.error(err);
//             res.status(500).send({
//                 rt: err.code,
//                 rtmsg: err.message
//             });
//             return;
//         }

//         // 썸네일을 생성
//         try {
//             await FileHelper.createThumbnailMultiple(req.file);
//         } catch (err) {
//             console.error(err);
//             res.status(500).send({
//                 rt: err.code,
//                 rtmsg: err.message
//             });
//             return;
//         }

//         res.status(200).send(req.file);
//     });
// });
// 컨트롤러 연결

const controllers = [
    "Author",
    "Book",
    "Cart",
    "Category",
    "Event",
    "Likes",
    "OrderDetails",
    "Outuser",
    "Qna",
    "Review",
    "User",
    "Orders",
    "Login",
];

controllers.forEach((controller) => {
    app.use(require(`./controllers/${controller}Controller`));
});
app.use((err, req, res, next) => res.sendError(err));
app.use("*", (req, res, next) => res.sendError(new PageNotFoundException()));

/*----------------------------------------------------------
 | 6) 설정한 내용을 기반으로 서버 구동 시작
 -----------------------------------------------------------*/
const ip = myip();

app.listen(process.env.PORT, () => {
    logger.debug("--------------------------------------------------");
    logger.debug("|              Start Express Server              |");
    logger.debug("--------------------------------------------------");

    ip.forEach((v, i) => {
        logger.debug(`server address => http://${v}:${process.env.PORT}`);
    });

    logger.debug("--------------------------------------------------");
});

process.on("exit", function () {
    logger.debug("백엔드가 종료되었습니다.");
});

process.on("SIGINT", () => {
    process.exit();
});

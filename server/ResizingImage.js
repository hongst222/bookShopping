const FileHelper = require("./helper/FileHelper");

module.exports = (() => {
    const router = express.Router();
    router.route('/upload/single').post((req, res, next) => {
        const upload = FileHelper.initMulter().single('myphoto');

        upload(req, res, async (err) => {
            console.group('request');
            console.debug(req.file);
            console.groupEnd();

            try {
                FileHelper.checkUploadError(err);
            } catch (err) {
                console.error(err);
                res.status(500).send({
                    rt: err.code,
                    rtmsg: err.message
                });

                return;
            }

            // 썸네일을 생성
            try {
                await FileHelper.createThumbnail(req.file);
            } catch (err) {
                console.error(err);
                res.status(500).send({
                    rt: err.code,
                    rtmsg: err.message
                });
                return;
            }

            res.status(200).send(req.file);
        });
    });

    router.route('/upload/multiple').post((req, res, next) => {
        req.file = [];

        const upload = FileHelper.initMulter().array('myphoto');

        upload(req, res, async (err) => {
            console.group('request');
            console.debug(req.file);
            console.groupEnd();

            try {
                FileHelper.checkUploadError(err);
            } catch (err) {
                console.error(err);
                res.status(500).send({
                    rt: err.code,
                    rtmsg: err.message
                });
                return;
            }

            // 썸네일을 생성
            try {
                await FileHelper.createThumbnailMultiple(req.file);
            } catch (err) {
                console.error(err);
                res.status(500).send({
                    rt: err.code,
                    rtmsg: err.message
                });
                return;
            }

            res.status(200).send(req.file);
        });
    });

    return router;
})();
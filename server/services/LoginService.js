const mybatisMapper = require('mybatis-mapper');
const DBPool = require('../helper/DBPool');
const { RuntimeException } = require('../helper/ExceptionHelper');

class LoginService {

    /** 생성자 - Mapper파일을 로드한다 */
    constructor() {
        // mapper의 위치는 이 소스 파일이 아닌 프로젝트 root를 기준으로 상대경로
        mybatisMapper.createMapper([
            './server/mappers/LoginMapper.xml',
        ]);
    }

    /** 로그인 기능을 위해 ID와 패스워드를 조회한다. */
    async getLoginInfo(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('LoginMapper', 'selectIdPw', params);
            let [result] = await dbcon.query(sql);
            data = result[0];
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    }


    /** 전체 데이터 수 조회 */
    async getCount(params) {
        let dbcon = null;
        let cnt = 0;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('LoginMapper', 'selectCountAll', params);
            let [result] = await dbcon.query(sql);

            if (result.length > 0) {
                cnt = result[0].cnt;
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return cnt;
    }
}

module.exports = new LoginService();
const mybatisMapper = require('mybatis-mapper');
const DBPool = require('../helper/DBPool');
const { RuntimeException } = require('../helper/ExceptionHelper');

class BookService {

    /** 생성자 - Mapper파일을 로드한다 */
    constructor() {
        // mapper의 위치는 이 소스 파일이 아닌 프로젝트 root를 기준으로 상대경로
        mybatisMapper.createMapper([
            './server/mappers/BookMapper.xml',
            './server/mappers/SellingRankMapper.xml', 
        ]);
    }

    /** 목록 데이터를 조회한다 */
    async getList(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'selectList', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('조회된 데이터가 없습니다.');
            }

            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }
     
    
    /** 화제의 신상 리스트 조회 (3권) */
    async getListHotPotato(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'selectListHotPotato', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('조회된 데이터가 없습니다.');
            }

            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }

    /** 단일 데이터를 조회한다 */
    async getItem(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'selectItem', params);
            let [result] = await dbcon.query(sql);
            
            if (result.length === 0) {
                throw new RuntimeException('조회된 데이터가 없습니다.');
            }

            data = result[0];
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }

    /** 데이터를 추가하고 추가된 결과를 조회하여 리턴한다. */
    async addItem(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'insertItem', params);
            let [{insertId, affectedRows}] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException('저장된 데이터가 없습니다.');
            }

            // 새로 저장된 데이터의 PK값을 활용하여 다시 조회
            sql = mybatisMapper.getStatement('BookMapper', 'selectItem', {bookNo: insertId});
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('저장된 데이터를 조회할 수 없습니다.');
            }

            data = result[0];
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }

    /** 데이터를 수정하고 수정된 결과를 조회하여 리턴한다. */
    async editItem(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'updateItem', params);
            let [{affectedRows}] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException('저장된 데이터가 없습니다.');
            }

            // 새로 저장된 데이터의 PK값을 활용하여 다시 조회
            sql = mybatisMapper.getStatement('BookMapper', 'selectItem', {bookNo: params.bookNo});
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('저장된 데이터를 조회할 수 없습니다.');
            }

            data = result[0];
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }

    /** 데이터를 삭제한다. */
    async deleteItem(params) {
        let dbcon = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'deleteItem', params);
            let [{affectedRows}] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException('삭제된 데이터가 없습니다.');
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
    }

    /** 전체 데이터 수 조회 */
    async getCount(params) {
        let dbcon = null;
        let cnt = 0;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'selectCountAll', params);
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

    /** InnerJoinMapper */
    async getListAuthName(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'selectListAuthName', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('조회된 데이터가 없습니다.');
            }

            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }
    /** 단일 데이터를 조회한다 */
    async getItemAuthName(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'selectItemAuthName', params);
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException('조회된 데이터가 없습니다.');
            }

            data = result[0];
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }

    // 순위 구하기
    /** 해당 책의 판매량 순위 구하기  (주간) */
    async getItemRank(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('SellingRankMapper', 'selectItemRank', params);
            let [result] = await dbcon.query(sql);
            // 베스트 순위에 없다면 skip 하기 위해 result 길이 검사를 하지  않음.
            data = result[0];
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }
    /** 관련 분야 TOP 5  */
    async getListTop5(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'selectListTop5', params);
            let [result] = await dbcon.query(sql);
            // 데이터 유무 검사
            
            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }
    /** 관련 분야 신작 5개  */
    async getListNew5(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement('BookMapper', 'selectListNew5', params);
            let [result] = await dbcon.query(sql);
            // 데이터 유무 검사
            
            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) { dbcon.release(); }
        }

        return data;
    }
}

module.exports = new BookService();
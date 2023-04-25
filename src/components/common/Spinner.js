/**
 * @autor : 장진호
 * @last_modified_date : 22.12.02(금)
 * @discription : 데이터가 로딩될 떄 실행될 spinner 입니다.
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

/** 로딩바 컴포넌트 */
// --> https://mhnpd.github.io/react-loader-spinner

import { ThreeDots } from 'react-loader-spinner';

const Spinner = ({ loading, width, height }) => {
    return (
        <>
            {loading && (
                <ThreeDots
                    height={height}
                    width={width}
                    ariaLabel="three-dots-loading"
                    color= "#4fa94d"
                    wrapperStyle={{
                        position: 'absolute',
                        zIndex: 9999,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    wrapperClass="ThreeDots-wrapper"
                />)}
        </>
    );
};

/** 기본값 정의 */
Spinner.defaultProps = {
    loading: false,
    width: 70,
    height: 70
};

/** 데이터 타입 설정 */
Spinner.propTypes = {
    loading: PropTypes.bool.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
};

export default memo(Spinner);
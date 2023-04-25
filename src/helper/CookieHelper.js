/**
 *  @author: 홍승택
 *  @description: 쿠키 관련 기능을 명시한 Helper 파일입니다.
 *  @updateDate : 2023-04-22
 * 
 */

const reactCookie = require('react-cookie');

const cookies = new reactCookie();

/**
 * @param {string} name 
 * @param {string} value 
 * @param {object} option 
 */

// cookie에 값을 넣어줍니다. 이때 http-only 속성을 넣어 보안을 강화합니다.
export const setPrivateCookie = (name,value, option = {} ) => {
    const defaultOption = {path: '/', httpOnly: true, secure:false}; // 기본 option을 명시해놓습니다.
    const cookieOption = {...defaultOption, ...option};
    // option값에 아무것도 건너오지 않을 경우 defaultOption의 값이 적용되고, 값이 넘어오는 경우 덮어쓰게됩니다.
    cookies.set(name, value, {...defaultOption, ...cookieOption}); 
}

/**
 * @param {string} name 
 * @param {string} value 
 * @param {object} option 
 */
// cookie에 값을 넣어줍니다.
export const setCookie = (name, value, option = {}) => {
    cookies.set(name, value, {...option});
}


/**
 * 
 * @param {string} name 
 * @returns {string}
 */
// 파라미터로 명시한 cookie의 value을 가져옵니다.
export const getCookie = (name) => {
    return cookies.get(name);
}


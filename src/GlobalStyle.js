import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Roboto", "Noto Sans KR", "PingFang SC", "Apple SD Gothic Neo", "Microsoft YaHei UI", "Malgun Gothic", sans-serif;
        line-height: 1;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin : 0;
    }


    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
`;
export default GlobalStyle;
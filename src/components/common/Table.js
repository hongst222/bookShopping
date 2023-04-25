import styled from "styled-components";

/** 표에 css를 적용한 stlyedComponent */
const Table = styled.table`
    width: 100%;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    
    th {
        width:30%;
        background: white;
        padding: 12px 10px;
        box-sizing: content-box;
        font-weight: 700;
    }
    td {
        padding: 12px 10px;
        color:#767676;
    }
   
`;

export default Table;
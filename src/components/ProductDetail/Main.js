import React, { memo } from 'react';
import styled from 'styled-components';
import MainLeft from './MainLeft';
import MainRight from './MainRight';
const MainBody = styled.main`
        width: 1200px;
        margin-top: 36px;
        margin: auto;
        background-color: white; 
        display: flex;
        justify-content: space-between;
        padding-top: 80px;
        box-sizing: border-box;
  
`
const Main = memo(({book, top5, new5, params, navRef,pointCnt, rvCount, reviewDT}) => {
    return (
        <MainBody>
            <MainLeft book={{ ...book}} params={{...params}}  navRef= {{...navRef}} pointCnt = {{...pointCnt}} rvCount= {{...rvCount}} reviewDT = {[...reviewDT]}/>
            <MainRight top5 = {{...top5}}  new5 = {{...new5}}  params={{...params}} />
        </MainBody>
    );
});

export default Main;
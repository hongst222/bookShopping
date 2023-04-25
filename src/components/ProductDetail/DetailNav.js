import React, { memo, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
const TopNav = styled.div`
     width: 100%;
     position: sticky;
     top:95px;
     z-index: 999;
     background-color: white;
     border-bottom: 0.5px solid rgba(125,125,125,0.2);
     .inner{
        width: 1200px;
        margin: 0 auto;
     }
    .tabs{
       display: flex;
       flex-direction: row;
       height: 70px;
      
        .tab_item{
           padding-left: 30px;
           padding-right: 30px;
           
           &:first-of-type{
            padding-left: 0px;
           }
           &:last-of-type{
            padding-right: 0px;
           }
            button {
                display: block;
                line-height: 4.5;
                height: 70px;
                font-size: 16px;
                font-weight: 700;
                text-decoration: none;
                background-color: white;
                color: rgba(0,0,0,0.5);
                text-align: center;
                border: none;
                &:hover {
                    cursor: pointer;
                }
                &.select{
                    color: black;
                    font-weight: 700;
                    border-bottom: 3px solid black;
                    box-sizing: border-box;
                }
            }

        }
    }
`
const DetailNav = memo(({ review, navRef }) => {
    //  scroll 상태변수
    const [activeTab, setActiveTab] = useState(null);
    const onClickBtn = useCallback((e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const target = navRef[value].current;
        // 숫자부분 nav높이 구해서 바꿔야함.
        const scrollPosition = target.offsetTop - 110;
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    })

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const prodDetail = navRef.prodDetail.current.offsetTop-170;
            const review = navRef.review.current.offsetTop -170;
            const changeInfo = navRef.changeInfo.current.offsetTop -170;

            if (scrollTop >= prodDetail && scrollTop < review) {
                setActiveTab("prodDetail");
            } else if (scrollTop >= review && scrollTop < changeInfo) {
                setActiveTab("review");
            } else if (scrollTop >= changeInfo){
                setActiveTab("changeInfo");
            } else {
                setActiveTab(null);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [navRef]);
    return (
        <TopNav>
            <div className="inner">
                <ul className="tabs">
                    <li className="tab_item">
                        <button className={activeTab === "prodDetail" ? "select" : ""} value="prodDetail" onClick={onClickBtn} >상품정보</button>
                    </li>
                    <li className="tab_item">
                        <button className={activeTab === "review" ? "select" : ""} value="review" onClick={onClickBtn}>리뷰 ({review.totalCount})</button>
                    </li>
                    <li className="tab_item">
                        <button className={activeTab === "changeInfo" ? "select" : ""} value="changeInfo" onClick={onClickBtn} >교환/반품</button>
                    </li>
                </ul>
            </div>
        </TopNav>
    );
});

export default DetailNav;
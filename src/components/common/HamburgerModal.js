import styled from "@emotion/styled/macro";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const HambugerMenu = styled.div`
  width: 1200px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  border-radius: 20px;
  z-index: 999;
`;

const HbHeader = styled.ul`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 50px;
`;

const HbHeaderItem = styled.li`
  width: 50%;
  padding: 1rem 0;
  cursor: pointer;
  ${({ active }) =>
    active === true
      ? css`
          font-weight: bold;
        `
      : css`
          background-color: #f2f2f2;
        `}
  ${({ pos }) =>
    pos === "left"
      ? css`
          border-radius: 20px 0 0 0;
        `
      : css`
          border-radius: 0 20px 0 0;
        `}
`;

const HbBody = styled.div`
  padding: 2rem;
`;

const HbCategory = styled.div`
  display: flex;
  gap: 5rem;
`;

const MainCategory = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 20%;
`;

const MainCategoryItem = styled.li`
  cursor: pointer;
  font-size: 15px;
  ${({ active }) =>
    active === true
      ? css`
          color: #4248b5;
          font-weight: bold;
        `
      : css``}
`;

const MiddleCategory = styled.ul`
  width: 100%;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const MiddleCategoryItem = styled.li``;

const CategoryLink = styled.div`
  width: 30%;
  text-decoration: none;
  color: black;
  font-weight: 600;
`;

const HbService = styled.div``;

const domesticCategory = [
  "전체",
  "소설",
  "시/에세이",
  "인문",
  "가정/육아",
  "건강",
  "취미/실용/스포츠",
  "경제/경영",
  "자기계발",
  "역사/문화",
  "예술/대중문화",
  "기술/공학",
  "외국어",
  "과학",
  "여행",
  "컴퓨터/IT",
];

const overseasCategory = ["전체", "에세이", "소설", "인문", "취미/실용/여행", "경제/경영", "과학", "컴퓨터/IT"];

const HambugerModal = ({ selector = "#modal-root", short, noSticky }) => {
  const [isCategoryAll, setIsCategoryAll] = useState(true);
  const [isServiceAll, setIsServiceAll] = useState(false);
  const [isDomesticBooks, setIsDomesticBooks] = useState(true);

  const handleCategoryClick = () => {
    setIsCategoryAll(true);
    setIsServiceAll(false);
  };

  const handleServiceClick = () => {
    setIsCategoryAll(false);
    setIsServiceAll(true);
  };

  const handleDomesticBooksClick = () => {
    setIsDomesticBooks(true);
  };

  const handleOverseasBooksClick = () => {
    setIsDomesticBooks(false);
  };

  return (
    <HambugerMenu>
      <HbHeader>
        <HbHeaderItem active={isCategoryAll} pos="left" onClick={handleCategoryClick}>
          카테고리 전체보기
        </HbHeaderItem>
        <HbHeaderItem active={isServiceAll} pos="right" onClick={handleServiceClick}>
          서비스 전체보기
        </HbHeaderItem>
      </HbHeader>
      <HbBody>
        {isCategoryAll ? (
          <HbCategory>
            <MainCategory>
              <MainCategoryItem active={isDomesticBooks} onClick={handleDomesticBooksClick}>
                국내 도서
              </MainCategoryItem>
              <MainCategoryItem active={!isDomesticBooks} onClick={handleOverseasBooksClick}>
                해외 도서
              </MainCategoryItem>
            </MainCategory>
            <MiddleCategory>
              {isDomesticBooks
                ? domesticCategory.map((item) => (
                    <CategoryLink to={item}>
                      <MiddleCategoryItem>{item}</MiddleCategoryItem>
                    </CategoryLink>
                  ))
                : overseasCategory.map((item) => (
                    <CategoryLink>
                      <MiddleCategoryItem>{item}</MiddleCategoryItem>
                    </CategoryLink>
                  ))}
            </MiddleCategory>
          </HbCategory>
        ) : (
          false
        )}

        <HbService></HbService>
      </HbBody>
    </HambugerMenu>
  );
};

export default HambugerModal;
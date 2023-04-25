import styled from "@emotion/styled/macro";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart, AiFillCloseCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoSearch, IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

import HambugerModal from "./HamburgerModal";
import { HambugerContext } from "../../context/HamburgerContext"
import { Link } from "react-router-dom";

const OverLay = styled.div`
  ${({ sticky }) =>
    sticky === true
      ? css`
          position: sticky;
        `
      : css`
          position: relative;
        `}
  top: 0;
  background-color: #fff;
  width: 100%;
  margin: 1rem auto;
  z-index: 999;
`;

const Base = styled.div`
  ${({ shortHedaer }) =>
    shortHedaer === true
      ? css`
          display: flex;
          align-items: center;
        `
      : false}
  background-color: #fff;
  max-width: 1200px;
  margin: 1rem auto;
  z-index: 999;
`;

const HeaderMain = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem auto;
  width: 100%;

  > a {
    text-decoration: none;
    color: #000;
  }
`;

const Logo = styled.h1`
  background-image: url(https://cdn-icons-png.flaticon.com/512/3209/3209922.png);
  background-repeat: no-repeat;
  width: 100px;
  height: 30px;
  text-indent: -99em;
  background-position: center center;
  background-size: contain;
  transform: rotate(5deg);
  margin-right: 2rem;
`;

const SearchWrapper = styled.div`
  height: 46px;
  padding: 0 1rem;
  border: 1px solid #5055b1;
  border-radius: 30px;
  margin: 0 auto 0 0;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  ${({ shortHeader }) =>
    shortHeader === true
      ? css`
          margin: 0 auto 0 0;
        `
      : false}

  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #5055b1;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1 1 auto;
  font-size: 14px;
`;

const LinkIconWrapper = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;

  > a {
    text-decoration: none;
    color: #000;
  }
`;

const LinkIcon = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;

  svg {
    width: 100%;
    height: 100%;
    ${({ user }) =>
      user === "true"
        ? css`
            color: #57be57;
          `
        : css`false`}
  }
`;

const NavWrapper = styled.div`
  display: flex;
  margin: 2rem 0 0 3rem;
  align-items: center;
  ${({ shortHedaer }) =>
    shortHedaer === true
      ? css`
          order: -1;
          margin: 0;
        `
      : false}
`;

const Hambuger = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 2rem;
  border: 1px solid #797979;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
  ${({ hambuger }) =>
    !hambuger
      ? css`
          background-color: #000;
          color: #fff;
        `
      : false}
`;

const CategoryWrapper = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  ${({ shortHedaer }) =>
    shortHedaer === true
      ? css`
          display: none;
        `
      : false};

  > a {
    text-decoration: none;
    color: #000;
  }
`;

const CategoryItem = styled.li`
  font-weight: bold;

  position: relative;
`;

const Divider = styled.span`
  width: 1px;
  height: 1px;
  background-color: #000;
  border-radius: 50%;
  border: 1px solid black;
`;

const LineDivider = styled.div`
  width: 100vw;
  height: 1px;
  background-color: rgba(125,125,125,0.2);
  position: sticky;
  top: 105px;
`;

const Header = ({ selector = "#modal-root", short, noSticky }) => {
  const [isChange, setIsChange] = useState(false);
  const inputRef = useRef();
  const { isHambuger, setIsHambuger } = useContext(HambugerContext);
  const [isShortHeader, setIsShortHeader] = useState(false);

  const handleChange = (e) => {
    setIsChange(true);
    e.target.value.length === 0 ? setIsChange(false) : setIsChange(true);
  };

  const handleClick = () => {
    inputRef.current.value = "";
    setIsChange(false);
  };

  const handleHambugerClick = () => {
    setIsHambuger(!isHambuger);
  };

  const [scrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태
  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  });

  useEffect(() => {
    if (scrollY > 0) {
      setIsShortHeader(true);
    } else {
      setIsShortHeader(false);
    }
  }, [scrollY]);

  return (
    <OverLay sticky={noSticky === "true" ? false : true}>
      <Base shortHedaer={short === "true" ? true : isShortHeader}>
        <HeaderMain>
          <Link to="/">
            <Logo>라이브러리</Logo>
          </Link>
          <SearchWrapper shortHedaer={short === "true" ? true : isShortHeader}>
            <SearchInput placeholder="2022년 우수출판콘텐츠 선정작" onChange={handleChange} ref={inputRef} />
            {isChange ? <AiFillCloseCircle style={{ marginRight: "20px", width: "20px", height: "20px", color: "gray" }} onClick={handleClick} /> : false}
            <IoSearch />
          </SearchWrapper>
          <LinkIconWrapper>
            <Link to="/cart">
              <LinkIcon>
                <AiOutlineShoppingCart />
              </LinkIcon>
            </Link>
            <Link to="/user">
              <LinkIcon user="true">
                <FaUserCircle />
              </LinkIcon>
            </Link>
          </LinkIconWrapper>
        </HeaderMain>
        <NavWrapper shortHedaer={short === "true" ? true : isShortHeader}>
          <Hambuger onClick={handleHambugerClick} hambuger={!isHambuger}>
            {isHambuger ? <IoClose /> : <BsList />}
          </Hambuger>
          <CategoryWrapper shortHedaer={short === "true" ? true : isShortHeader}>
            <Link to="/">
              <CategoryItem>베스트</CategoryItem>
            </Link>
            <Divider />
            <Link to="/">
              <CategoryItem>신상품</CategoryItem>
            </Link>
            <Divider />
            <Link to="/">
              <CategoryItem>이벤트</CategoryItem>
            </Link>
          </CategoryWrapper>
        </NavWrapper>
      </Base>
      <LineDivider>
        {isHambuger ? (
          <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duraiton: 0.2 }}>
            <HambugerModal />
          </motion.div>
        ) : (
          false
        )}
      </LineDivider>
    </OverLay>
  );
};

export default Header;
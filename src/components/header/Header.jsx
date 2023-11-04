import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
// import logo from "../../assets/movix-logo.svg";
import logo from "../../assets/Otaku Club.svg";
import icon from "../../assets/otakuIcon.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
        window.scrollTo(0,0); //when we switch page from somewhere end then it'll redirect to back of the new page.... so when location changes (url) scroll to top of the page.
  },[location])


  const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
          navigate(`/search/${query}`);
          setTimeout(() => {
                setShowSearch(false);
          }, 1000);
        }
      }; 

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type)=>{
        if(type === 'manga') navigate("/explore/manga");
        else navigate("/explore/anime");
        setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate(`/`)}>
          <img className="icon" src={icon} alt="" />
          <img className="text" src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler('anime')}>Anime</li>
          <li className="menuItem" onClick={() => navigationHandler('manga')}>Manga</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch}/>
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>


       {showSearch && (<div className="searchBar">
        <ContentWrapper>
        <div className="searchInput">
              <input
                type="text"
                placeholder="search Anime or Manga....."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
        </ContentWrapper>
      </div>)}


    </header>
  );
};

export default Header;

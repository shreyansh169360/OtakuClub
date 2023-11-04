import React, { useEffect } from "react";
import "./styles.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import contentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import backgroundImg from "../../../assets/Backdrop_img.png"

const Herobanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const aspectRatios = ["4:3", "16:9", "5:4", "17:9"];

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    const getBackgroundImage = async () => {
      try {
        const res = await fetch(
          `https://api.nekosapi.com/v3/images/random?rating=safe&limit=1`
        );
        // const  { data } = await res.json();
        // const bg = data?.attributes?.file;
        const {items} = await res.json();
        // console.log("asdfdasfadfadsfdsaf");
        // console.log(items[0]?.image_url);
        setBackground(items[0]?.image_url);
      } catch (err) {
        setBackground(backgroundImg);
      }
    };
    getBackgroundImage();
  }, []);

  return (
    <>
    <div className="heroBanner">
      {background && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of Anime and Manga for Otakus and Weebs. Explore Now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="search Anime or Manga....."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={() => navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
    {/* <div className="opacity-layer"></div> */}
    </>
  );
};

export default Herobanner;

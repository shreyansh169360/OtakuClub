import React, { useState } from "react";

import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../detailBanner/Playbtn";
import Img from "../../../components/lazyLoadImage/Img";

const Episodes = ({ data, loading , posterImg}) => {

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Epsiodes</div>
        {!loading ? (
          <div className="videos">
            {data?.map((obj, idx) => (
              <div
                key={idx}
                className="videoItem"
              >
                <a href={obj?.url} target="_blank">
                <div className="videoThumbnail">
                        <Img src={posterImg}/>
                        <PlayIcon/>
                </div>
                <div className="videoTitle">{idx+1}. {obj?.title}</div>
                </a>
                
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Episodes;

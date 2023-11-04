import React, { useState } from "react";

import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../detailBanner/Playbtn";
import Img from "../../../components/lazyLoadImage/Img";

const Pictures = ({ data, loading}) => {

        console.log("pictues");
        console.log(data);
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
        <div className="sectionHeading">Related Artworks</div>
        {!loading ? (
          <div className="videos">
            {data?.map((obj, idx) => (
              <div
                key={idx}
                className="videoItem"
              >
                <div className="videoThumbnail">
                        <Img src={obj?.jpg?.large_image_url || obj?.webp?.large_image_url}/>
                </div>
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

export default Pictures;

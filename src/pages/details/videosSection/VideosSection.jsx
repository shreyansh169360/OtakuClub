import React, { useState } from "react";

import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../detailBanner/Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";

const VideosSection = ({ data, loading , posterImg}) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
//   console.log("videos");
//   console.log(data);

  const normalVideos = data?.promo?.concat(data?.music_videos);
  const episodes = data?.episodes;
  console.log(episodes);
//   console.log(normalVideos);

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
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {normalVideos?.map((obj, idx) => (
              <div
                key={idx}
                className="videoItem"
                onClick={() => {
                  setShow(true);
                  setVideoId(obj?.trailer ? obj?.trailer?.youtube_id : obj?.video?.youtube_id);
                }}
              >
                <div className="videoThumbnail">
                        <Img src={obj?.trailer ? obj?.trailer?.images?.medium_image_url : obj?.video?.images?.medium_image_url}/>
                        <PlayIcon/>
                </div>
                <div className="videoTitle">{obj?.title}</div>
                
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
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;

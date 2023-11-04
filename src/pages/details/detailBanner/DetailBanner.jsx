import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./styles.scss";
import { PlayIcon } from "./Playbtn";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailBanner = ({ data , loading }) => {
  const { mediaType, id } = useParams();

  const [show , setShow] = useState(false);
  const [videoId , setVideoId] = useState(null);

        const getStudioData = (studios) => {
                const studio = studios.map((st) => st.name);
                return studio.join(", ");
        }

        const getYear = (item , type) =>
        {
                
                if(type === 'TV')
                {
                        const startDate = dayjs(item?.aired?.from).format("MMM YYYY");
                        const endDate = item?.aired?.to ? dayjs(item?.aired?.to).format("MMM YYYY") : "Present";
                        return startDate + " - " + endDate;
                } 
                else
                {
                        const startDate = dayjs(item?.published?.from).format("MMM YYYY");
                        const endDate = !item?.publishing ? dayjs(item?.published?.to).format("MMM YYYY") : "Present";
                        return startDate + " - " + endDate;
                }
        }



  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.data?.images?.jpg ? (
                      <Img
                        className="posterImg"
                        src={data?.data?.images?.jpg?.large_image_url}
                      />
                    ) : data?.data?.images?.webp ? (
                      <Img
                        className="posterImg"
                        src={data?.data?.images?.webp?.large_image_url}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                        <div className="title">
                                {`${data?.data?.title_english || data?.data?.title} (${getYear(data?.data , data?.data?.type)})`}
                        </div>

                        <div className="subtitle">
                        </div>

                        <Genres data={data?.data?.genres}/>
                        <div className="row">
                                <CircleRating rating={data?.data?.score?.toFixed(1)}/>
                                {mediaType !== "manga" && 
                                <div className="playbtn" onClick={() => {setShow(true); setVideoId(data?.data?.trailer?.youtube_id)}}>
                                        <PlayIcon/>
                                        <span className="text">Watch Trailer</span>
                                </div>}
                        </div>

                        <div className="overview">
                                <div className="heading">Overview</div>
                                <div className="description">{data?.data?.background || data?.data?.synopsis}</div>
                        </div>

                        <div className="info">
                                {
                                        data?.data?.status && (
                                                <div className="infoItem">
                                                        <span className="text bold">Status:{" "}</span>
                                                        <span className="text">{data?.data?.status}</span>
                                                </div>
                                        )
                                }

                                {
                                        data?.data?.type === "Manga" ? 
                                        (
                                                data?.data?.published?.from && (
                                                        <div className="infoItem">
                                                                <span className="text bold">Published:{" "}</span>
                                                                <span className="text">{dayjs(data?.data?.published?.from).format("DD MMM, YYYY")}</span>
                                                        </div>
                                                )
                                        )
                                        :
                                        (
                                                data?.data?.aired?.from && (
                                                        <div className="infoItem">
                                                                <span className="text bold">Released Date:{" "}</span>
                                                                <span className="text">{dayjs(data?.data?.aired?.from).format("DD MMM, YYYY")}</span>
                                                        </div>
                                                )
                                        )
                                }


                                {
                                        mediaType === 'manga' ? 
                                        (
                                               (
                                                        <div className="infoItem">
                                                                <span className="text bold">Chapters:{" "}</span>
                                                                <span className="text">{data?.data?.chapters ? data?.data?.chapters : "Ongoing"}</span>    
                                                        </div>
                                                )
                                        )
                                        :
                                        (
                                                data?.data?.duration && (
                                                        <div className="infoItem">
                                                                <span className="text bold">Duration:{" "}</span>
                                                                <span className="text">{data?.data?.duration}</span>    
                                                        </div>
                                                )
                                        )
                                }

                                {
                                        mediaType === "manga" &&  
                                        (
                                        <div className="infoItem">
                                                <span className="text bold">Volumes:{" "}</span>
                                                <span className="text">{data?.data?.volumes ? data?.data?.volumes : "Ongoing"}</span>    
                                        </div>
                                        )
                                }
                        </div>

                        {
                                data?.data?.studios && (
                                        <div className="info">
                                                <span className="text bold">Studios:{" "}</span>
                                                <span className="text">{getStudioData(data?.data?.studios)}</span>    
                                        </div>
                                )
                        }

                        {
                                mediaType==="manga" && (
                                        <div className="info">
                                                <span className="text bold">Themes:{" "}</span>
                                                <span>{
                                                     data?.data?.themes?.map((obj , i)=>(
                                                        <span>
                                                        <a href={obj?.url} target="_blank">
                                                                <span className="links">{obj?.name}</span>
                                                        </a>
                                                        <span>{i !== (data?.data?.themes?.length - 1) && ","} </span>
                                                        </span>
                                                     ))   
                                                }
                                                </span>    
                                        </div>
                                )
                        }

                        {
                                data?.data?.streaming && (
                                        <div className="info">
                                                <span className="text bold">Streaming on:{" "}</span>
                                                <span>{
                                                     data?.data?.streaming?.map((obj , i)=>(
                                                        <span>
                                                        <a href={obj?.url} target="_blank">
                                                                <span className="links">{obj?.name}</span>
                                                        </a>
                                                        <span>{i !== (data?.data?.streaming?.length - 1) && ","} </span>
                                                        </span>
                                                     ))   
                                                }</span>    
                                        </div>
                                )
                        }


                        {
                                mediaType === "manga" && (
                                        <div className="info">
                                                <span className="text bold">Authors:{" "}</span>
                                                <span>{
                                                     data?.data?.authors?.map((obj , i)=>(
                                                        <span>
                                                        <a href={obj?.url} target="_blank">
                                                                <span className="links">{obj?.name}</span>
                                                        </a>
                                                        <span>{i !== (data?.data?.streaming?.length - 1) && "."}</span>
                                                        </span>
                                                     ))   
                                                }</span>    
                                        </div>
                                )
                        }

                  </div>
                </div>

                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />

              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailBanner;

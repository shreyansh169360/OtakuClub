import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./styles.scss";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading , title}) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount = direction === 'left' ? container.scrollLeft-(container.offsetWidth+20) : container.scrollLeft+(container.offsetWidth+20)
    container.scrollTo({
      left : scrollAmount,
      behavior : "smooth"
    })
  }

  const skeletonItem = () => {
    return(

      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    )
  }

  const getDate = (item , type) =>
  {
    
    if(type === 'TV')
    {
      const startDate = dayjs(item?.aired?.from).format("MMM D, YYYY");
      const endDate = item?.aired?.to ? dayjs(item?.aired?.to).format("MMM D, YYYY") : "Present";
      return startDate + " - " + endDate;
    } 
    else
    {
      const startDate = dayjs(item?.published?.from).format("MMM D, YYYY");
      const endDate = !item?.publishing ? dayjs(item?.published?.to).format("MMM D, YYYY") : "Present";
      return startDate + " - " + endDate;
    }
  }

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />

        {
          !loading ? (
            <div className="carouselItems" ref={carouselContainer}>
              {
                data?.map((item) => {
                  const imageurl = (item?.images?.jpg?.image_url )? (item?.images?.jpg?.image_url ) : (item?.images?.webp?.image_url ? item?.images?.webp?.image_url : PosterFallback); 
                  return(
                    <div key={item?.mal_id} className="carouselItem" onClick={() => navigate(`/${item?.type === 'TV' ? "anime" : "manga"}/${item?.mal_id}`)}>
                      <div className="posterBlock">
                        <Img src={imageurl}/>
                        <CircleRating rating={item?.score.toFixed(1)}/>
                        <Genres data={item?.genres.slice(0,2)}/>
                      </div>
                      <div className="textBlock">
                        <span className="title">
                          {item?.title_english || item?.title}
                        </span>
                        <span className="date">
                          {getDate(item , item?.type)}
                        </span>
                      </div>

                    </div>
                  )
                })
              }

            </div>
          ) : (
            //loading 
            <div className="loadingSkeleton">
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()}
              {skeletonItem()} 
            </div>
          )
        }
      </ContentWrapper>
    </div>
  );
};

export default Carousel;

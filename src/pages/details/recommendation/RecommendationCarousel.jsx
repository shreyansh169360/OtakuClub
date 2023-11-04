import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png"
import "./styles.scss";

const RecommendationCarousel = ({ data, loading , title , mediaType}) => {
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

  console.log("Recommedation");
  console.log(data);

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
                  const imageurl = (item?.entry?.images?.jpg?.image_url )? (item?.entry?.images?.jpg?.image_url ) : (item?.entry?.images?.webp?.image_url ? item?.entry?.images?.webp?.image_url : PosterFallback); 
                  return(
                    <div key={item?.mal_id} className="carouselItem" onClick={() => navigate(`/${mediaType}/${item?.entry?.mal_id}`)}>
                      <div className="posterBlock">
                        <Img src={imageurl}/>
                      </div>
                      <div className="textBlock">
                        <span className="title">
                          {item?.entry?.title || item?.entry?.title_english}
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

export default RecommendationCarousel;

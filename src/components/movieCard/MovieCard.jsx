import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const navigate = useNavigate();
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${mediaType}/${data.mal_id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={data?.images?.jpg?.image_url || data?.images?.webp?.image_url || PosterFallback} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data?.score?.toFixed(1) || "N/A"} />
                        <Genres data={data?.genres?.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data?.title}</span>
                <span className="date">
                    {dayjs(data?.aired?.from).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
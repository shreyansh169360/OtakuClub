import React from "react";
import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Characters = ({ data, loading }) => {
    // console.log("characters");
    // console.log(data);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {
                                data?.map((item) => {
                                        return(
                                                <div key={item?.character?.mal_id} className="listItem">
                                                        <div className="profileImg">
                                                                <Img src={item?.character?.images?.webp?.image_url || avatar}/>
                                                        </div>
                                                        <div className="name">{item?.character?.name}</div>
                                                </div>
                                        )
                                })
                        }
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Characters;
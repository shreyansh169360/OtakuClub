import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Airing = () => {
  const onTabChange = (tab) => {
    setEndPoint(tab === "Anime" ? "anime" : "manga");
  };
  const [endPoint, setEndPoint] = useState("anime"); //this state os to fet data depending different media typee(anime/manga);

  const { data, loading } = useFetch(
    `/top/${endPoint}?filter=${endPoint === "anime" ? "airing" : "publishing"}&sfw=true`
  );
  // console.log(endPoint + "airing");
  // console.log(data?.data);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Ongoing</span>
        <SwitchTabs data={["Anime", "Manga"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.data} loading={loading} />
    </div>
  );
};

export default Airing;

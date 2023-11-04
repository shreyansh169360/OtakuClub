import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Popular = () => {
  const onTabChange = (tab) => {
    setEndPoint(tab === "Anime" ? "anime" : "manga");
  };
  const [endPoint, setEndPoint] = useState("anime"); //this state os to fet data depending different media typee(anime/manga);

  const { data, loading } = useFetch(
    `/top/${endPoint}?filter=bypopularity&sfw=true`
  );
  // console.log(endPoint + "Popular");
  // console.log(data?.data);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular</span>
        <SwitchTabs data={["Anime", "Manga"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.data} loading={loading} />
    </div>
  );
};

export default Popular;

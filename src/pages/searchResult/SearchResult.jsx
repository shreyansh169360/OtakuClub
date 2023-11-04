import React from "react";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../utils/api";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
import "./styles.scss";
import MovieCard from "../../components/movieCard/MovieCard";
import SwitchTabs from "../../components/switchTabs/SwitchTabs";

const SearchResult = () => {
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(null);
  const [endPoint, setEndPoint] = useState("anime"); //this state os to fet data depending different media typee(anime/manga);
  
  
  const onTabChange = (tab) => {
    setEndPoint(tab === "Anime" ? "anime" : "manga");
  };

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromAPI(`/${endPoint}?q=${query}&page=1`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    setLoading(true);
    fetchDataFromAPI(`/anime?q=${query}&page=${pageNum}`).then((res) => {
      //here we want to merge the fresh data to previous(if any) data.
      if (data) {
        setData({
                ...data,
                data : [...data?.data , ...res?.data],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  useEffect(() => {
        setPageNum(1);
    fetchInitialData();
  }, [query , endPoint]);


  console.log(pageLimit)
  return (
    <div className="searchResultsPage">
      <div className="pageTitle">
        {`Search Results of '${query}'`}
        <SwitchTabs data={["Anime", "Manga"]} onTabChange={onTabChange} />
      </div>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.data?.length ? (
            <>
              <InfiniteScroll
                className="content"
                dataLength={data?.data?.length || []}
                next={fetchNextPageData}
                hasMore={((pageNum-1)*data?.pagination?.items?.per_page)<= data?.pagination?.items?.total}
                loader={<Spinner />}
              >
                {data?.data?.map((item, idx) => {
                  return (
                    <MovieCard
                      key={idx}
                      data={item}
                      mediaType={item?.type === "TV" ? "anime" : "manga"}
                      fromSearch={true}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry , Results Not Found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;

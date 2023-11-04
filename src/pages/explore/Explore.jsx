import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./styles.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromAPI } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};

const sortbyData = [
    { label: "Popularity Descending" , order_by : "popularity" , sort : "desc" },
    { label: "Popularity Ascending" , order_by : "popularity" , sort : "asc" },
    { label: "Rating Descending"  , order_by : "score" , sort : "desc" },
    { label: "Rating Ascending" , order_by : "score" , sort : "asc"  },
    { label: "Rank Descending" , order_by : "rank" , sort : "desc"  },
    { label: "Rank Ascending" , order_by : "rank" , sort : "asc"  },
    {
        label: "Release Date Descending",
        order_by : "start_date" , sort : "desc" 
    },
    { label: "Release Date Ascending" , order_by : "start_date" , sort : "asc"  },
    { label: "Title (A-Z)"  , order_by : "title" , sort : "asc" },
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genres/${mediaType}`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromAPI(`/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromAPI(
            `/${mediaType}?p=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.data) {
                setData({
                    ...data,
                    data: [...data?.data, ...res?.data],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
            setLoading(false)
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        console.log("this is selectedItems", selectedItems);
        console.log("this is action", action);
        
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.order_by = selectedItems.order_by;
                filters.sort = selectedItems.sort;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.mal_id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.genres = genreId;
            } else {
                delete filters.genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
        
    };
    console.log("pawan")
    console.log(data);
    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "anime"
                            ? "Explore Anime"
                            : "Explore Manga"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.data}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.mal_id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!!!loading && (
                    <>
                        {data?.data?.length ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.data?.length || []}
                                next={fetchNextPageData}
                                hasMore={((pageNum-1)*data?.pagination?.items?.per_page)<= data?.pagination?.items?.total}
                                loader={<Spinner />}
                            >
                                {data?.data?.map((item, index) => {
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;
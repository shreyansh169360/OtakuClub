/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import { fetchDataFromAPI } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import {getGenres } from "./store/homeSlice"; //these are the actions.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { BsDatabaseFillDash } from "react-icons/bs";

function App() {
  const dispatch = useDispatch(); //this is used to push/save data into the redux store.
  const url = useSelector((state) => {
    //here we have access to entire redux store (state).In this case we have home :homeSLice and homeSlice itself has two properties :url,genre,
    //Since we need to use the url part ,we need to extract it
    return state.home.url;
  });

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["anime","manga"]
    let allgenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genres/${url}`))
    })
    
    const arr = await Promise.all(promises);
    arr.map(({data}) => {
      return data.map((item) => (allgenres[item?.mal_id] = item))
    })
    dispatch(getGenres(allgenres));
  }

  useEffect(() => {
    // genresCall();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

import React from 'react'
import "./styles.scss"
import Herobanner from './heroBanner/Herobanner'
import Trending from './trending/Trending'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { fetchDataFromAPI } from '../../utils/api'
import Popular from './popular/Popular'
import Recommendation from './airing/Airing'

const Home = () => {
        return (
                <>
                <div className='homePage'>
                        <Herobanner/>
                        <Trending/>
                        <Popular/>
                        <Recommendation/>
                </div>
                {/* <div style={{height:1000}}>
                </div> */}
                </>
        )
}

export default Home

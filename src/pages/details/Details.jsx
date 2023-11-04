import React from 'react'
import "./styles.scss";
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailBanner from './detailBanner/DetailBanner';
import Characters from './characters/Characters';
import VideosSection from './videosSection/VideosSection';
import Episodes from './episodes/Episodes';
import PosterFallback from "../../assets/no-poster.png";
import Pictures from './pictures/Pictures';
import Recommendation from './recommendation/Recommendation';

const Details = () => { 

        const {mediaType , id} = useParams();
        const { data, loading } = useFetch(`/${mediaType}/${id}/full`);
        const {data : characterData , loading : characterLoading} = useFetch(`/${mediaType}/${id}/characters`);
        
        const {data : videoData , loading : videoLoading} = mediaType === 'anime' ? useFetch(`/${mediaType}/${id}/videos`) : {data:null,loading:null};
        const {data : pictureData , loading : pictureLoading} = mediaType === 'manga' ? useFetch(`/${mediaType}/${id}/pictures`) : {data:null,loading:null};


        return (
                <div>
                        <DetailBanner data={data} loading={loading}/>
                        <Characters data={characterData?.data} loading={characterLoading}/>
                        {mediaType === 'anime' && <VideosSection data={videoData?.data} loading={videoLoading}/>}
                        {mediaType === 'anime' && <Episodes data={videoData?.data?.episodes} loading={videoLoading} posterImg={data?.data?.images?.jpg?.image_url || PosterFallback}/>}
                        {mediaType === 'manga' && <Pictures data={pictureData?.data} loading={pictureLoading}/>}
                        <Recommendation mediaType={mediaType} id={id}/>
                        
                </div>
        )
}

export default Details

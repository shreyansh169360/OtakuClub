import React from 'react'
import "./styles.scss";
import { useSelector } from 'react-redux';


const Genres = ({data}) => {
        return (
                <div className='genres'>
                        {data?.map((g) => {
                                return(
                                        <div className='genre' key={g?.mal_id}>
                                                {g?.name}
                                        </div>
                                )
                        })}
                </div>
        )
}

export default Genres

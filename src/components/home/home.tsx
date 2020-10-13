import React from "react";
import MovieCard from "../movieCard/movieCard";
import './home.css';
import {useSelector} from "react-redux";
import {selectMedias} from "../../store/media/mediaSlice";

export function Home (){
    const medias = useSelector(selectMedias);

    return (
        <div className="catalogue-container">
            <div className="movieCard-list">
                {medias == null || medias.length <= 0 ? (
                    <p><b>Ops, no one here yet</b></p>
                ) : (
                    medias.map(media => (
                        <MovieCard {...media}/>
                    ))
                )}
            </div>
        </div>
    );
}
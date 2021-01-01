import React, {useEffect} from "react";
import './Catalogue.css';
import {useDispatch, useSelector} from "react-redux";
import {loadAllMedia, selectMedias, selectMediasByGenre} from "../../store/media/mediaSlice";
import {Media} from "../../constants";
import {loadAllUsers} from "../../store/user/userSlice";
import MovieCard from "../MovieCard/MovieCard";

function getMediaByGenre(medias: Media[], genre: string, index: number){
    const filteredMedia: Media[] = [];
    medias.forEach(media => {
        if(media.genre.includes(genre)){
            filteredMedia.push(media);
        }
    });
    if(filteredMedia.length > 0){
        return (
            <div key={index} className="catalogue-genre-list">
                <h1 className="ml-20">{genre}</h1>
                <div className="movieCard-list">
                    {filteredMedia.map((mediaf, index) => (
                        <MovieCard key={index} media={mediaf}/>
                    ))}
                </div>
                <br></br>
            </div>
        );
    }
    return null;
}

export default function Catalogue (){
    const dispatch = useDispatch();
    const medias = useSelector(selectMedias);
    const genres: string[] = ['Sci-Fi', 'Action', 'Fantasy', 'Thriller', 'Horror', 'Comedy', 'Romance', 'Mystery', 'Crime', 'Adventure', 'Animation', 'SuperHero'];

    useEffect(() => {
        dispatch(loadAllMedia(0));
        dispatch(loadAllUsers(0));
    }, []);

    return (
        <div className="catalogue-container">
            {genres.map((genre, i) => {
                return getMediaByGenre(medias, genre, i);
            })}
        </div>
    );
}
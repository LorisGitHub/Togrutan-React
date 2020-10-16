import React, {useEffect} from "react";
import './catalogue.css';
import {useDispatch, useSelector} from "react-redux";
import {loadAll, selectMedias, selectMediasByGenre} from "../../store/media/mediaSlice";
import {Media} from "../../constants";
import {loadAllUsers} from "../../store/user/userSlice";
import MovieCard from "../movieCard/movieCard";

function getMediaByGenre(medias: Media[], genre: string){
    const filteredMedia: Media[] = [];
    medias.forEach(media => {
        if(media.Genre.toLowerCase().includes(genre.toLowerCase())){
            filteredMedia.push(media);
        }
    });
    if(filteredMedia.length > 0){
        return (
            <div className="catalogue-genre-list">
                <h1 className="ml-20">{genre}</h1>
                <div className="movieCard-list">
                    {filteredMedia.map((mediaf, index) => (
                        <MovieCard key={mediaf.Title} media={mediaf}/>
                    ))}
                </div>
                <br></br>
            </div>
        );
    }
    return null;
}

export function Catalogue (){
    const dispatch = useDispatch();
    const medias = useSelector(selectMedias);
    const genres: string[] = ['Sci-Fi', 'Action', 'Fantasy', 'Thriller', 'Horror', 'Comedy', 'Romance', 'Mystery', 'Crime', 'Adventure', 'Animation', 'SuperHero'];

    useEffect(() => {
        dispatch(loadAll(0));
        dispatch(loadAllUsers(0));
    }, []);

    return (
        <div className="catalogue-container">
            {genres.map(genre => {
                return getMediaByGenre(medias, genre);
            })}
        </div>
    );
}
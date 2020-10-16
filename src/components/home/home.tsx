import React, {useEffect} from "react";
import MovieCard from "../movieCard/movieCard";
import './home.css';
import {useDispatch, useSelector} from "react-redux";
import {loadAll, selectMedias, selectMediasByGenre} from "../../store/media/mediaSlice";
import Media from "../../constants";

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
                    {filteredMedia.map(mediaf => (
                        <MovieCard {...mediaf}/>
                    ))}
                </div>
                <br></br>
            </div>
        );
    }
    return null;
}

export function Home (){
    const dispatch = useDispatch();
    const medias = useSelector(selectMedias);
    const genres: string[] = ['Sci-Fi', 'Action', 'Fantasy', 'Thriller', 'Horror'];

    useEffect(() => {
        dispatch(loadAll(0));
    }, []);

    return (
        <div className="catalogue-container">
            {genres.map(genre => {
                return getMediaByGenre(medias, genre);
            })}
        </div>
    );
}
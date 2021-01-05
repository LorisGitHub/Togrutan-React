import React, {useEffect} from "react";
import './Catalogue.css';
import {useDispatch, useSelector} from "react-redux";
import {loadAllMedia, selectIsMediaLoading, selectMedias} from "../../store/media/mediaSlice";
import {Media} from "../../constants";
import MovieCard from "../MovieCard/MovieCard";
import {Row} from "react-bootstrap";
import {CircularProgress} from "@material-ui/core";

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

export default function Catalogue (props){
    const dispatch = useDispatch();
    const medias = useSelector(selectMedias);
    const isMediaLoading = useSelector(selectIsMediaLoading);
    const genres: string[] = ['Sci-Fi', 'Action', 'Fantasy', 'Thriller', 'Horror', 'Comedy', 'Romance', 'Mystery', 'Crime', 'Adventure', 'Animation', 'SuperHero', 'Biography','Drama'];

    useEffect(() => {
        if(props.currentUser){
            dispatch(loadAllMedia(props.currentUser));
        }
    }, []);

    return (
        <div className="catalogue-container">
            <div style={{margin: '35px'}}>{isMediaLoading}</div>
            {medias && medias.length > 0 ?
                genres.map((genre, i) => {
                        return getMediaByGenre(medias, genre, i);
                }): isMediaLoading ?
                    <div style={{margin: '30px', width: '100%', height: '500px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                        <CircularProgress style={{width: 200, height: 'auto', marginBottom: '30px'}}/>
                        <h3>Loading your library...</h3>
                    </div>:
                    <div style={{margin: '30px', width: '100%', height: '500px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                        <h2>Your library is empty</h2>
                    </div>
            }
        </div>
    );
}
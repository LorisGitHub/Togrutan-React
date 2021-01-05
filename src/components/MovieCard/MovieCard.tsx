import React from 'react';
import './MovieCard.css';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import {setCurrentMedia} from "../../store/media/mediaSlice";
import {useDispatch} from "react-redux";

export default function MovieCard(props) {
    const dispatch = useDispatch();

    const onSelectMoviePreview = (media) => {
        dispatch(setCurrentMedia(media));
    }

    return (
        <div className="movieCard-div">
            <p className={props.media.type.toLowerCase() === 'movie' ? 'bg-red media-type-badge':'bg-green media-type-badge'}>{props.media.type.toLowerCase() === 'movie' ? 'M':'S'}</p>
            <Card className="movieCard" onClick={() => onSelectMoviePreview(props.media)}>
                <CardActionArea className="movie-button">
                    <CardMedia component="img" className="mediaImg" image={props.media.image}/>
                    <CardContent className="media-content">
                        <Typography variant="body2">
                            {props.media.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
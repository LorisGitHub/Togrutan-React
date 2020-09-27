import React, {Component} from 'react';
import Media from "../../constants"
import './movieCard.css';
import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography} from "@material-ui/core";
import {Col, Row} from "react-bootstrap";

class MovieCard extends Component<Media, {}> {

    render() {
        const media = this.props;
        return (
            <div>
                <Card className="movieCard">
                    <CardActionArea className="movie-button">
                        <CardHeader className="media-header" title={<Typography noWrap gutterBottom variant="h6" component="h4">
                            A world wide web - the revolution
                        </Typography>
                        }></CardHeader>
                        <CardMedia component="img" className="mediaImg" image={media.Poster} title="Contemplative Reptile"/>
                        <CardContent className="media-content">
                            <Typography variant="body2">
                                {media.Year} | {media.Genre}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

export default MovieCard;

import React, {Component} from 'react';
import Media from "../../constants"
import './movieCard.css';
import {AppBar, Card, CardActionArea, CardContent, CardMedia, Modal, Toolbar, Typography} from "@material-ui/core";
import {Col, Container, Row} from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

class MovieCard extends Component<Media, {}> {

    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    onClickCard(media: Media){
        console.log("card has been clicked", media);
    }


    render() {
        const media = this.props;
        const body = (
            <div style={getModalStyle()} className="paper">
                <Container fluid>
                    <Row>
                        <Col md="auto" style={{padding: 0}}>
                            <img src={media.Poster} className="modal-poster" alt="logo" />
                        </Col>
                        <Col>
                            <Row>
                                <AppBar position="static" style={{height: '50px', alignItems: 'center', justifyContent: 'center'}}>
                                    <Toolbar style={{height: '50px'}}>
                                        <Typography variant="h6">
                                            {media.Title}
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Row>
                            <Container style={{paddingTop: '15px'}}fluid>
                                <Row>
                                    <span style={{fontWeight: 'bold'}}>Released:&nbsp;</span> {media.Released}
                                </Row>
                                <Row>
                                    <span style={{fontWeight: 'bold'}}>Genre:&nbsp;</span> {media.Genre}
                                </Row>
                                <Row>
                                    <span style={{fontWeight: 'bold'}}>Rated:&nbsp;</span>{media.Rated}
                                </Row>
                                <Row>
                                    <span style={{fontWeight: 'bold'}}>Director:&nbsp;</span> {media.Director}
                                </Row>
                                <Row>
                                    <span style={{fontWeight: 'bold'}}>Actors:&nbsp;</span>{media.Actors}
                                </Row>
                                <Row style={{marginTop: '20px'}}>
                                    <span style={{fontWeight: 'bold'}}>Plot:&nbsp;</span>{media.Plot}
                                </Row>
                                <Row style={{marginTop: '20px'}}>
                                    <span style={{fontWeight: 'bold'}}>Rating:&nbsp;</span>
                                    <Rating name="read-only" value={media.imdbRating} max={10} readOnly />
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
        return (
            <div className="movieCard-div">
                <p className={media.Type.toLowerCase() === 'movie' ? 'bg-red media-type-badge':'bg-green media-type-badge'}>{media.Type.toLowerCase() === 'movie' ? 'M':'S'}</p>
                <Card className="movieCard" onClick={() => this.handleOpen()}>
                    <CardActionArea className="movie-button">
                        <CardMedia component="img" className="mediaImg" image={media.Poster} title="Contemplative Reptile"/>
                        <CardContent className="media-content">
                            <Typography variant="body2">
                                {media.Title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Modal
                    disableAutoFocus={true}
                    open={this.state.open}
                    onClose={() => this.handleClose()}>
                    {body}
                </Modal>
            </div>
        )
    }
}

export default MovieCard;

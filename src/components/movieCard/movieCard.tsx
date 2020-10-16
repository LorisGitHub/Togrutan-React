import React from 'react';
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

export default function MovieCard(props) {

    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div className="movieCard-div">
            <p className={props.media.Type.toLowerCase() === 'movie' ? 'bg-red media-type-badge':'bg-green media-type-badge'}>{props.media.Type.toLowerCase() === 'movie' ? 'M':'S'}</p>
            <Card className="movieCard" onClick={() => setOpen(true)}>
                <CardActionArea className="movie-button">
                    <CardMedia component="img" className="mediaImg" image={props.media.Poster} title="Contemplative Reptile"/>
                    <CardContent className="media-content">
                        <Typography variant="body2">
                            {props.media.Title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Modal
                disableAutoFocus={true}
                open={open}
                onClose={() => setOpen(false)}>
                <div style={getModalStyle()} className="paper">
                    <Container fluid>
                        <Row>
                            <Col md="auto" style={{padding: 0}}>
                                <img src={props.media.Poster} className="modal-poster" alt="logo" />
                            </Col>
                            <Col>
                                <Row>
                                    <AppBar position="static" style={{height: '50px', alignItems: 'center', justifyContent: 'center'}}>
                                        <Toolbar style={{height: '50px'}}>
                                            <Typography variant="h6">
                                                {props.media.Title}
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                </Row>
                                <Container style={{paddingTop: '15px'}} fluid>
                                    <Row>
                                        {props.media.Year}
                                    </Row>
                                    <Row>
                                        {props.media.Runtime} {props.media.Rated}
                                    </Row>
                                    <Row style={{marginTop: '20px', marginBottom: '20px'}}>
                                        {props.media.Plot}
                                    </Row>
                                    <Row>
                                        <Col md="2">
                                            <Row>
                                                Réalisation
                                            </Row>
                                            <Row>
                                                Genre
                                            </Row>
                                            <Row>
                                                Studio
                                            </Row>
                                        </Col>
                                        <Col md="5">
                                            <Row>
                                                {props.media.Director}
                                            </Row>
                                            <Row>
                                                {props.media.Genre}
                                            </Row>
                                            <Row>
                                                {props.media.Production}
                                            </Row>
                                        </Col>
                                        <Col md="5" style={{alignItems: 'center'}}>
                                            <Rating name="read-only" value={props.media.imdbRating} max={10} readOnly />
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Modal>
        </div>
    )
}
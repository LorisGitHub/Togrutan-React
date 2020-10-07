import React, {Component} from 'react';
import Media from "../../constants"
import './movieCard.css';
import {Card, CardActionArea, CardContent, CardMedia, Modal, Typography} from "@material-ui/core";
import {Container, Row, Col} from "react-bootstrap";

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
                <h2 className="custom-modal-title">{media.Title}</h2>
                <Container fluid>
                    <Row style={{padding: '10px'}}>
                        <Col md="auto">
                            <img src={media.Poster} className="modal-poster" alt="logo" />
                        </Col>
                        <Col>
                            <Row>
                                <span style={{fontWeight: 'bold'}}>Genre:&nbsp;</span> {media.Genre}
                            </Row>
                            <Row>
                                <span style={{fontWeight: 'bold'}}>Director:&nbsp;</span> {media.Director}
                            </Row>
                            <Row>
                                <span style={{fontWeight: 'bold'}}>Actors:&nbsp;</span>{media.Actors}
                            </Row>
                            <Row style={{marginTop: '20px'}}>
                                {media.Plot}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
        return (
            <div className="movieCard-div">
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

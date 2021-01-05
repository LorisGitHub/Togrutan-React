import React, {useEffect} from 'react';
import './MediaModal.css';
import {Col, Container, Row} from "react-bootstrap";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import {MenuItem, Modal, Select} from "@material-ui/core";
import {addMedia, removeMedia, setCurrentMedia} from "../../store/media/mediaSlice";
import {useDispatch} from "react-redux";
import {updateUserInfo} from "../../store/user/userSlice";
import {User} from "../../constants";

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

export default function MediaModal (props){
    const dispatch = useDispatch();
    const [currentMediaState, setCurrentMediaState] = React.useState('none');

    useEffect(() => {
        if(props.currentUser){
            if(props.currentUser.viewed && props.currentUser.viewed.includes(props.currentMedia.imdbID)){
                setCurrentMediaState('watched');
            } else if(props.currentUser.planToWatch && props.currentUser.planToWatch.includes(props.currentMedia.imdbID)){
                setCurrentMediaState('planToWatch');
            } else if(props.currentUser.dropped && props.currentUser.dropped.includes(props.currentMedia.imdbID)){
                setCurrentMediaState('dropped');
            }
        }
    }, []);

    const onCloseCurrentMediaModal = () => {
        dispatch(setCurrentMedia(null));
    }

    const editUserCopy = (event, userCopy) => {
        if(event == "watched"){
            if(userCopy.viewed){
                userCopy.viewed = [...userCopy.viewed];
                userCopy.viewed.push(props.currentMedia.imdbID)
            } else {
                userCopy.viewed = [props.currentMedia.imdbID]
            }
        } else if(event == "planToWatch"){
            if(userCopy.planToWatch){
                userCopy.planToWatch = [...userCopy.planToWatch];
                userCopy.planToWatch.push(props.currentMedia.imdbID)
            } else {
                userCopy.planToWatch = [props.currentMedia.imdbID]
            }
        } else if(event == "dropped"){
            if(userCopy.dropped){
                userCopy.dropped = [...userCopy.dropped];
                userCopy.dropped.push(props.currentMedia.imdbID)
            } else {
                userCopy.dropped = [props.currentMedia.imdbID]
            }
        }
        return userCopy;
    }

    const handleMediaStateChange = (event) => {
        let userCopy: User = {...props.currentUser};
        let action = 'none';
        if(currentMediaState == "none"){
            userCopy = editUserCopy(event.target.value, userCopy);
            dispatch(addMedia(props.currentMedia));
        } else {
/*            if(currentMediaState != "none" && event.target.value == "none"){
                dispatch(removeMedia(props.currentMedia))
            }*/
            if(currentMediaState == "watched" && userCopy.viewed.includes(props.currentMedia.imdbID)){
                userCopy.viewed = [...userCopy.viewed];
                userCopy.viewed.splice(userCopy.viewed.indexOf(props.currentMedia.imdbID),1);
            } else if(currentMediaState == "planToWatch" && userCopy.planToWatch.includes(props.currentMedia.imdbID)){
                userCopy.planToWatch = [...userCopy.planToWatch];
                userCopy.planToWatch.splice(userCopy.planToWatch.indexOf(props.currentMedia.imdbID),1);
            } else if(currentMediaState == "dropped" && userCopy.dropped.includes(props.currentMedia.imdbID)){
                userCopy.dropped = [...userCopy.dropped];
                userCopy.dropped.splice(userCopy.dropped.indexOf(props.currentMedia.imdbID),1);
            }
            userCopy = editUserCopy(event.target.value, userCopy);
        }
        setCurrentMediaState(event.target.value);
        dispatch(updateUserInfo(userCopy))
    };

    const parseList = (list) => {
        if(list && list.length > 0){
            return list.join(', ')
        } else {
            return list;
        }
    }

    return (
        <Modal
            disableAutoFocus={true}
            open={props.currentMedia}
            onClose={() => onCloseCurrentMediaModal()}>
            <div style={getModalStyle()} className="paper">
                <Container fluid>
                    <Row>
                        <Col md="auto" style={{padding: 0}}>
                            <img src={props.currentMedia.image} className="modal-poster" alt="logo" />
                        </Col>
                        <Col>
                            <Row>
                                <AppBar position="static" style={{height: '50px', alignItems: 'center', justifyContent: 'center'}}>
                                    <Toolbar style={{height: '50px'}}>
                                        <Typography variant="h6">
                                            {props.currentMedia.title}
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Row>
                            <Container style={{paddingTop: '15px'}} fluid>
                                <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>
                                    Do you know this movie ?
                                    <Select
                                        style={{marginLeft: 20, width: 150}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={currentMediaState}
                                        onChange={handleMediaStateChange}
                                    >
                                        <MenuItem value='none'>No</MenuItem>
                                        <MenuItem value='watched'>Watched</MenuItem>
                                        <MenuItem value='planToWatch'>Plan To Watch</MenuItem>
                                        <MenuItem value='dropped'>Dropped</MenuItem>
                                    </Select>
                                </Row>
                                <Row>
                                    <Col md="3">
                                        <Row style={{fontWeight: 'bold'}}>Release Date</Row>
                                    </Col>
                                    <Col>
                                        <Row>{props.currentMedia.released}</Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3">
                                        <Row style={{fontWeight: 'bold'}}>Genre</Row>
                                    </Col>
                                    <Col>
                                        <Row>{parseList(props.currentMedia.genre)}</Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3">
                                        <Row style={{fontWeight: 'bold'}}>Creators</Row>
                                    </Col>
                                    <Col>
                                        <Row>{parseList(props.currentMedia.creators)}</Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3">
                                        <Row style={{fontWeight: 'bold'}}>Actors</Row>
                                    </Col>
                                    <Col>
                                        <Row>{parseList(props.currentMedia.actors)}</Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3">
                                        <Row style={{fontWeight: 'bold'}}>Directors</Row>
                                    </Col>
                                    <Col>
                                        <Row>{parseList(props.currentMedia.directors)}</Row>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '20px', marginBottom: '20px'}}>
                                    {props.currentMedia.plot}
                                </Row>
                                <Row>
                                    <Rating name="read-only" value={props.currentMedia.imdbRating} max={10} readOnly />
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Modal>
    );
}

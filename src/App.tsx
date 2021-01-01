import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Col, Container, Row} from "react-bootstrap";
import {Button, FormControl, Input, InputLabel, Modal} from "@material-ui/core"
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Content from "./components/Content/Content";
import Home from "./components/Home/Home";
import Catalogue from "./components/Catalogue/Catalogue";
import {useDispatch, useSelector} from "react-redux";
import {selectMediasPreview, selectMediasPreviewFilter} from "./store/mediaPreview/mediaPreviewSlice";
import './App.css';
import {login, loginSuccess} from "./store/user/userSlice";
import Profile from "./components/Profile/Profile";
import {loadMediaById, selectCurrentMedia, setCurrentMedia} from "./store/media/mediaSlice";
import Rating from "@material-ui/lab/Rating";
import SideBar from "./components/SideBar/SideBar";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import {selectLoginModal, setLoginModal} from "./store/app/appSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
}));

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

export default function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const previews = useSelector(selectMediasPreview);
    const filter = useSelector(selectMediasPreviewFilter);
    const currentMedia = useSelector(selectCurrentMedia);
    const signInModalOpen = useSelector(selectLoginModal);

    useEffect(() => {
        if(localStorage.getItem('JWT') && localStorage.getItem('username')){
            dispatch(loginSuccess({token: localStorage.getItem('JWT'), username: localStorage.getItem('username')}));
        }
    }, []);

    let username = '';
    let password = '';

    const onUpdateUsername = (event) => {
        username = event.target.value;
    }

    const onUpdatePassword = (event) => {
        password = event.target.value;
    }

    const onLogin = () => {
        dispatch(login({username, password}))
    }

    const onSelectMoviePreview = (imdbID) => {
        dispatch(loadMediaById(imdbID));
    }

    const onCloseLoginModal = () => {
        dispatch(setLoginModal(false));
    }

    const onCloseCurrentMediaModal = () => {
        dispatch(setCurrentMedia(null));
    }

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <ApplicationBar/>
                <SideBar/>
                {signInModalOpen ?
                    <Modal
                        disableAutoFocus={true}
                        open={signInModalOpen}
                        onClose={() => onCloseLoginModal()}>
                        <div style={getModalStyle()} className="loginModal">
                            <Container fluid className="flex-column">
                                <form className="flex-column">
                                    <FormControl>
                                        <InputLabel>Username</InputLabel>
                                        <Input onChange={onUpdateUsername} type='text'></Input>
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel>Password</InputLabel>
                                        <Input onChange={onUpdatePassword} type='password'></Input>
                                    </FormControl>
                                    <Button onClick={() => onLogin()}>Sign in</Button>
                                </form>
                            </Container>
                        </div>
                    </Modal>: null
                }
                {currentMedia ?
                    <Modal
                        disableAutoFocus={true}
                        open={currentMedia}
                        onClose={() => onCloseCurrentMediaModal()}>
                        <div style={getModalStyle()} className="paper">
                            <Container fluid>
                                <Row>
                                    <Col md="auto" style={{padding: 0}}>
                                        <img src={currentMedia.image} className="modal-poster" alt="logo" />
                                    </Col>
                                    <Col>
                                        <Row>
                                            <AppBar position="static" style={{height: '50px', alignItems: 'center', justifyContent: 'center'}}>
                                                <Toolbar style={{height: '50px'}}>
                                                    <Typography variant="h6">
                                                        {currentMedia.title}
                                                    </Typography>
                                                </Toolbar>
                                            </AppBar>
                                        </Row>
                                        <Container style={{paddingTop: '15px'}} fluid>
                                            <Row>
                                                {currentMedia.year}
                                            </Row>
                                            <Row>
                                                {currentMedia.runtime} {currentMedia.rated}
                                            </Row>
                                            <Row style={{marginTop: '20px', marginBottom: '20px'}}>
                                                {currentMedia.plot}
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
                                                        {currentMedia.director}
                                                    </Row>
                                                    <Row>
                                                        {currentMedia.genre}
                                                    </Row>
                                                    <Row>
                                                        {currentMedia.production}
                                                    </Row>
                                                </Col>
                                                <Col md="5" style={{alignItems: 'center'}}>
                                                    <Rating name="read-only" value={currentMedia.imdbRating} max={10} readOnly />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Modal>:null
                }
                {previews && previews.length > 0 && filter && filter.length >= 3?
                    <div className="card preview-container">
                        <ul className="list-group list-group-flush">
                            <div>
                                {previews.map((preview,i) =>
                                    <li key={i} onClick={() => onSelectMoviePreview(preview.imdbID)} className="list-group-item">
                                        <Row style={{ width: '100%'}}>
                                            <div style={{ width: '25%'}}>
                                                <img src={preview.picture} style={{ height: '75px', width: 'auto'}}/>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px', width: '60%'}}>
                                                {preview.name}
                                            </div>
                                        </Row>
                                    </li>
                                )}
                            </div>
                        </ul>
                    </div>: null
                }
                <main className={classes.grow}>
                    <Container className="full-width-container">
                        <Toolbar />
                        <Switch>
                            <Route path="/home">
                                <Home/>
                            </Route>
                            <Route path="/catalogue">
                                <Catalogue/>
                            </Route>
                            <Route path="/content">
                                <Content/>
                            </Route>
                            <Route path="/profile">
                                <Profile/>
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </div>
        </Router>
    );
}

import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import {Container, Row} from "react-bootstrap";
import {Button, FormControl, Input, InputLabel, Modal} from "@material-ui/core"
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import Agenda from "./components/Agenda/Agenda";
import Home from "./components/Home/Home";
import Catalogue from "./components/Catalogue/Catalogue";
import {useDispatch, useSelector} from "react-redux";
import {selectMediasPreview, selectMediasPreviewFilter} from "./store/mediaPreview/mediaPreviewSlice";
import './App.css';
import {getUserInfo, login, loginSuccess, selectCurrentUser} from "./store/user/userSlice";
import Profile from "./components/Profile/Profile";
import {loadMediaById, selectCurrentMedia} from "./store/media/mediaSlice";
import SideBar from "./components/SideBar/SideBar";
import ApplicationBar from "./components/ApplicationBar/ApplicationBar";
import {selectLoginModal, setLoginModal} from "./store/app/appSlice";
import MediaModal from "./components/MediaModal/MediaModal";
import Forum from "./components/Forum/Forum";
import LoginModal from "./components/LoginModal/LoginModal";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
}));

export default function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const previews = useSelector(selectMediasPreview);
    const filter = useSelector(selectMediasPreviewFilter);
    const currentMedia = useSelector(selectCurrentMedia);
    const signInModalOpen = useSelector(selectLoginModal);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if(localStorage.getItem('JWT') && localStorage.getItem('username')){
            dispatch(loginSuccess({token: localStorage.getItem('JWT'), username: localStorage.getItem('username')}));
            dispatch(getUserInfo(localStorage.getItem('username')));
        }
    }, []);

    const onSelectMoviePreview = (imdbID) => {
        dispatch(loadMediaById(imdbID));
    }

    return (
        <Router>
            <Redirect from="/" to="home" />
            <div className={classes.root}>
                <CssBaseline />
                <ApplicationBar/>
                <SideBar/>
                {signInModalOpen ?
                    <LoginModal/>: null
                }
                {currentMedia ?
                    <MediaModal currentUser={currentUser} currentMedia={currentMedia}/>:null
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
                                <Catalogue currentUser={currentUser}/>
                            </Route>
                            <Route path="/agenda">
                                <Agenda/>
                            </Route>
                            <Route path="/forum">
                                <Forum/>
                            </Route>
                            <Route path="/profile">
                                <Profile currentUser={currentUser}/>
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </div>
        </Router>
    );
}

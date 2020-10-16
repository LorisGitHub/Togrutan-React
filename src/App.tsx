import React from 'react';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import EventIcon from '@material-ui/icons/Event';
import ForumIcon from '@material-ui/icons/Forum';
import {Card, CardImg, Container} from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, Switch,} from "react-router-dom";
import Content from "./components/content/content";
import clsx from "clsx";
import {Home} from "./components/home/home";
import {useDispatch, useSelector} from "react-redux";
import {loadAllPreview, setSearchFilter, selectMediasPreview, selectMediasPreviewFilter} from "./store/mediaPreview/mediaPreviewSlice";
import './App.css';
import {CardContent} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',

        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const previews = useSelector(selectMediasPreview);
    const filter = useSelector(selectMediasPreviewFilter);
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const onSearch = (event) => {
        dispatch(setSearchFilter(event.target.value));
        if(event.target.value && event.target.value.length >= 3){
            dispatch(loadAllPreview(event.target.value));
        }
    };

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            style={{outline: 'none'}}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Togrutan
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={onSearch}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <Toolbar />
                    <div>
                        <List>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/home">
                                <ListItem button>
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText>Home</ListItemText>
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/catalogue">
                                <ListItem button>
                                    <ListItemIcon><LocalLibraryIcon /></ListItemIcon>
                                    <ListItemText>Catalogue</ListItemText>
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/catalogue">
                                <ListItem button>
                                    <ListItemIcon><EventIcon /></ListItemIcon>
                                    <ListItemText>Agenda</ListItemText>
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/catalogue">
                                <ListItem button>
                                    <ListItemIcon><ForumIcon /></ListItemIcon>
                                    <ListItemText>Forum</ListItemText>
                                </ListItem>
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
{/*                <div className="preview-container">
                    <ul>
                        {previews == null || previews.length <= 0 ? (
                            <p><b>Ops, no one here yet</b></p>
                        ) : (
                            previews.map(preview => (
                                <li>
                                    <Card>
                                        <CardImg variant="left" className="preview-image" src={preview.picture}></CardImg>
                                    </Card>
                                    <CardContent>
                                        {preview.name}
                                    </CardContent>
                                </li>
                            ))
                        )}
                    </ul>
                </div>*/}
                {previews && previews.length > 0 && filter && filter.length >= 3?
                    <div className="card preview-container">
                        <ul className="list-group list-group-flush">
                            <div>
                                {previews.map(preview =>
                                    <li className="list-group-item">
                                        {preview.name}
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
                                <Content/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </div>
        </Router>
    );
}

import React from 'react';
import './SideBar.css';
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import ListItemText from "@material-ui/core/ListItemText";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import EventIcon from "@material-ui/icons/Event";
import ForumIcon from "@material-ui/icons/Forum";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {selectDrawerState} from "../../store/app/appSlice";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
}));

export default function SideBar (){
    const classes = useStyles();
    const drawerState = useSelector(selectDrawerState);

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: drawerState,
                [classes.drawerClose]: !drawerState,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: drawerState,
                    [classes.drawerClose]: !drawerState,
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
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/content">
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
    );
}
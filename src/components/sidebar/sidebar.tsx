import React from 'react';
import './sidebar.css';
import {List, ListItem, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";

class Sidebar extends React.Component {
    render() {
        return (
            <List className="sidebar" disablePadding dense>
                <ListItem button>
                    <ListItemText><Link to="/test">Home</Link></ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText><Link to="/about">Content</Link></ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText style={{ fontSize: "20px"}}>Agenda</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Forum</ListItemText>
                </ListItem>
            </List>
        )
    }
}

export default Sidebar;

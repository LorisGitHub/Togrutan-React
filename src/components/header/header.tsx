import React, { Component } from "react";
import './header.css';
import {AiOutlineMenu} from "react-icons/all";

class Header extends Component {
    state = {
        searchbarVal: "",
    }

    onChangeSearch() {
        console.log(this.state.searchbarVal);
    }

    render() {
        return (
            <div className="header">
                <AiOutlineMenu className="menu-icon" size={32}/>
            </div>
        );
    }
}

export default Header;

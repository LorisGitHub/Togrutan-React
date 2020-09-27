import React, { Component } from "react";
import MovieCard from "../movieCard/movieCard";
import './home.css';

import axios from "axios";

import Media, { API_URL } from "../../constants";

class Home extends Component {
    media: Media[] = [];

    state = {
        media: this.media
    };

    componentDidMount() {
        this.resetState();
    }

    getmedia = () => {
        axios.get(API_URL).then(res => this.setState({ media: res.data }));
    };

    resetState = () => {
        this.getmedia();
    };

    render() {
        return (
            <div className="home-container">
                    {this.state == null || this.state.media == null || this.state.media.length <= 0 ? (
                        <p><b>Ops, no one here yet</b></p>
                    ) : (
                        this.state.media.map(media => (
                            <MovieCard {...media}/>
                        ))
                    )}
            </div>
        );
    }
}

export default Home;
import React, {Component} from 'react';
import './content.css';
import logo from "../../logo.svg";
import {Counter} from "../counter/Counter";

class Content extends Component {
    render(){
        return (
            <div className="content">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <span>
                  <span>Learn </span>
                  <a
                      className="App-link"
                      href="https://reactjs.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    React
                  </a>
                  <span>, </span>
                  <a
                      className="App-link"
                      href="https://redux.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    Redux
                  </a>
                  <span>, </span>
                  <a
                      className="App-link"
                      href="https://redux-toolkit.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    Redux Toolkit
                  </a>
                  ,<span> and </span>
                  <a
                      className="App-link"
                      href="https://react-redux.js.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    React Redux
                  </a>
                </span>
            </div>
        );
    }
}

export default Content;

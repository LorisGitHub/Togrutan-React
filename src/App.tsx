import React from 'react';
import Content from './components/content/content';
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./components/home/home";
import {Container, Row, Col} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
      <Router>
          <div className="App">
              <Container className="full-width-container">
                  <Row>
                      <Header/>
                  </Row>
                  <Row className="content-container">
                      <Col md="1" className="sidebar-container">
                          <Sidebar/>
                      </Col>
                      <Col md="11" className="active-content-container">
                          <Switch>
                              <Route path="/test">
                                  <Content/>
                              </Route>
                              <Route path="/about">
                                  <Home/>
                              </Route>
                          </Switch>
                      </Col>
                  </Row>
              </Container>
          </div>
      </Router>
  );
}

export default App;

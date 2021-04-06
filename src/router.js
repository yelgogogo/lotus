import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from './view/Home'
import Story from './view/Story'

const LotusRouter = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/story">
        <Story />
      </Route>
    </Router>
  );
}

export default LotusRouter

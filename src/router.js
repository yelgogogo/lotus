import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from './view/Home'

const LotusRouter = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
    </Router>
  );
}

export default LotusRouter

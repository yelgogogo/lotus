import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from './view/Home'
import Story from './view/Story'
import AddStory from './view/AddStory'
import EditStory from './view/EditStory'

const LotusRouter = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/story">
        <Story />
      </Route>
      <Route exact path="/addstory">
        <AddStory />
      </Route>
      <Route exact path="/editstory">
        <EditStory />
      </Route>
    </Router>
  );
}

export default LotusRouter

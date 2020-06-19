import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherEngine from "./components/WeatherEngine";
import Nav from "./components/Navigation/Nav";
import About from "./components/Navigation/About";
import Shop from "./components/Navigation/Shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InputForm from "./components/Form/InputForm";
import MainPage from "./components/MainPage";
import DashboardLogin from "./components/Dashboard/DashboardLogin";
import AdminBoard from "./components/AdminBoard/AdminBoard";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/register" component={InputForm} />
          <Route path="/dashboard" component={DashboardLogin} />
          <Route path="/admin" component={AdminBoard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

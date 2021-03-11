import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import './App.css';

/* Import all pages/components for routes */
import HeroSection from './components/HeroSection/HeroSection';
import Join from './components/Join/join'
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import Video from './components/Video/Video';


function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <HeroSection />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
          <Route exact path="/session">
            <Video />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

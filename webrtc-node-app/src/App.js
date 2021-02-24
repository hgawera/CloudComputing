import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Home from "./components/pages/HomePage/Home"
import Button from "./components/button"
import Footer from "./components/pages/Footer/Footer.js"
import About from "./components/pages/About/about"

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" exact component={About}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Scoreboard } from './components/scoreboard/scoreboard';
import { Navigation } from './components/navigation/navigation';
import { MainPage } from './components/main-page/main-page';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Game } from './components/game/game';
import './assets/main.scss'
import './App.scss';
import { Footer } from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <div className="main">
            <Route path="/" exact render={() => <MainPage />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/register" exact render={() => <Register />} />
            <Route path="/scoreboard" exact render={() => <Scoreboard />} />
            <Route path="/game" exact render={() => <Game />} />
          </div>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

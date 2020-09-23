import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { appContext, ApplicationStore } from './store/appStore';
import { Scoreboard } from './components/scoreboard/scoreboard';
import { Navigation } from './components/navigation/navigation';
import { MainPage } from './components/main-page/main-page';
import { Register } from './components/register/register';
import { Footer } from './components/footer/footer';
import { Login } from './components/login/login';
import { Game } from './components/game/game';
import './assets/main.scss'
import './App.scss';

export const App = observer(() => {
  const store: ApplicationStore = useContext(appContext);

  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
})


import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Header from './components/Header';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}

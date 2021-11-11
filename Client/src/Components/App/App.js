import ResetPasswordView from 'Components/Views/ResetPasswordView/ResetPasswordView';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error404View from 'Components/Views/Error404View/Error404View';
import LoginView from 'Components/Views/LoginView/LoginView';
import MainView from 'Components/Views/MainView/MainView';
import UserView from 'Components/Views/UserView/UserView';
import React from 'react';
import './App.css';
import ProfileView from 'Components/Views/ProfileView/ProfileView';

function App() {
  return (
    <Router>
      <div className="body noselect">
        <Switch>
          <Route path="/MainPage"><MainView /></Route>
          <Route path="/UserPage"><UserView /></Route>
          <Route path="/LoginPage"><LoginView /></Route>
          <Route path="/ResetPasswordPage/:email"><ResetPasswordView /></Route>
          <Route path="/Profile/:email"><ProfileView /></Route>
          <Route path="*"><Error404View /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

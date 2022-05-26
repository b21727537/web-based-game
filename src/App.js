import React, { Component } from "react";
import history from './history';
import { Route, Router, Switch } from "react-router";
import './App.scss';

import PasswordForgot from './components/Login/PasswordForgot';
import PasswordChange from './components/Login/PasswordChange';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import Main from './components/Main/Main';
import Main2 from './components/Main/Main2.js';
import PrivateRoute from "./components/PrivateRoute";
import LeftDrawer from './components/Menu/LeftDrawer';
import Profile from './components/Menu/Profile';
import Game from './components/Menu/Game';
import HowToPlay from './components/Menu/HowToPlay';

import { HTTP_REQUESTS } from "./backend_int/services/HttpRquestService";
import SessionStorage from './components/Helper-Functions/SessionStorage';
import LeftDrawer2 from "./components/Menu/LeftDrawer2";



class App extends Component {

  //states are here
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      sessionData: null
    };
  }

  componentDidMount() {
    HTTP_REQUESTS.USER_SERVICE.AUTH_CALL(
      data => {
          let that = this;
          setTimeout(function(){ 
            that.setState({sessionData: data, isAuthenticated: true, isLoading: false});
           }, 3000);
          //SessionStorage.sessionData = data;
          SessionStorage.welcomeMessageRequest = true;

      },
      err => {
        this.setState({isLoading: false});
      }
    );
  
  }

  callMe = async () => {
    await HTTP_REQUESTS.USER_SERVICE.AUTH_CALL(
      data => {

          this.setState({sessionData: data});
          SessionStorage.welcomeMessageRequest = true;
      },
      err => {
        this.setState({isLoading: false});
      }
    )
  }




  render() {
    return (
      <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/password-forgot">
            {<PasswordForgot />}
          </Route>
          <Route path="/password-change">
            {<PasswordChange />}
          </Route>
          <Route path="/login">
            {<Login />}
          </Route>
          <Route path="/sign-up">
            {<SignUp />}
          </Route>
          <Route path="/basic-main">
            {<Main2 />}
          </Route>
          <Route path="/basic-how-to-play">
            {this.withMenu2(<HowToPlay />)}
          </Route>

          <PrivateRoute path={"/main"} contextData = {this.state.sessionData} component={this.withMenu(<Main />)} isAuthenticated={this.state.isAuthenticated} isLoading={this.state.isLoading}/>
          <PrivateRoute path={"/profile"} contextData = {this.state.sessionData} component={this.withMenu(<Profile switchMain={this.switchMain}/>)} isAuthenticated={this.state.isAuthenticated} isLoading={this.state.isLoading}/>
          <PrivateRoute path={"/game"} contextData = {this.state.sessionData} component={this.withMenu(<Game />)} isAuthenticated={this.state.isAuthenticated} isLoading={this.state.isLoading}/>
          <PrivateRoute path={"/how-to-play"} contextData = {this.state.sessionData} component={this.withMenu(<HowToPlay />)} isAuthenticated={this.state.isAuthenticated} isLoading={this.state.isLoading}/>
          <PrivateRoute exact path={"/"} contextData = {this.state.sessionData} component={this.withMenu(<Main onCreateWorkspace={this.callMe} />)} isAuthenticated={this.state.isAuthenticated} isLoading={this.state.isLoading}/>
        </Switch>
      </div>
      </Router>
    );
  }

  withMenu = (component) => {

    return <LeftDrawer innerComponent={component}></LeftDrawer>

}
  withMenu2 = (component) => {

    return <LeftDrawer2 innerComponent={component}></LeftDrawer2>

}
}

export default App;
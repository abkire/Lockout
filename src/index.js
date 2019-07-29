import React from "react";
import ReactDOM from "react-dom";
import Cookies from 'js-cookie'

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import User from "layouts/User.jsx";
import Trainer from "layouts/Trainer.jsx";
import Login from "layouts/Login.jsx";





import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

export const getAccessToken = () => Cookies.get('access_token');
export const isAuthenticated = () => !!getAccessToken();


const redirectToLogin = () => {
  hist.push('/login/login')
  // or history.push('/login') if your Login page is inside the same app
}
export const authenticate = async () => {
  if (getAccessToken()) {
    try {
      const tokens = getAccessToken() // call an API, returns tokens

      const expires = (tokens.expires_in || 60 * 60) * 1000
      const inOneHour = new Date(new Date().getTime() + expires)

      // you will have the exact same setters in your Login page/app too
      Cookies.set('access_token', tokens.access_token, { expires: inOneHour })

      return true
    } catch (error) {
      redirectToLogin()
      return false
    }
  }
  else{
  redirectToLogin()
  return false}
}
export const AuthenticatedRoute = ({
  component: Component,
  exact,
  path,
}) => (
  <Route
    exact={exact}
    path={path}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <AuthenticateBeforeRender render={() => <Component {...props} />} />
      )
    }
  />
)

class AuthenticateBeforeRender extends React.Component {
  state = {
    isAuthenticated: false,
  }

  componentDidMount() {
    authenticate().then(isAuthenticated => {
      this.setState({ isAuthenticated })
    })
  }

  render() {
    return this.state.isAuthenticated ? this.props.render() : null
  }
}


ReactDOM.render(

  <Router history={hist}>
    <Switch>
    <Route path="/login" component={Login} />
      <AuthenticateBeforeRender>
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Route path="/user" component={User} />
        <Route path="/trainer" component={Trainer} />
      </AuthenticateBeforeRender>
      <Redirect from="*" to="/login/login" />
    </Switch>
    
  </Router>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Route path="/user" component={User} />
      <Route path="/trainer" component={Trainer} />
      <Route path="/login" component={Login} />
      <Redirect from="*" to="/login/login" />
    </Switch>
    
  </Router>,
  document.getElementById("root")
);

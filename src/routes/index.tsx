import React from "react";
import { Redirect, Switch } from "react-router-dom";
import AuthContainer from "src/containers/AuthContainer";
import { Home } from "src/pages/Home";
import Route from "./Route";
import { routes } from "./routes";

export default function Routes() {
  return (
    <Switch>
      {/* <Route path="/" exact component={SignIn} isPrivate={false} />
      <Route path="/register" component={SignUp} isPrivate={false} />

      <Route path="/dashboard" component={HomeModule} isPrivate={true} /> */}
      {routes.map((route, i) => (
        <Route key={i} path={route.path} component={route.component} isPrivate={route.private} />
      ))}
      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Redirect to="/login" />
    </Switch>
  );
}

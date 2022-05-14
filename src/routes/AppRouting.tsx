import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AppLayout } from "src/components/appLayout/AppLayout";
// import { RouteGuard } from "src/modules/auth/components/RouteGuard";
import { routes } from "./routes/index";

export function AppRouting() {
  console.log("AppRouting");

  return (
    <BrowserRouter>
      {/* <AppLayout> */}
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} path={route.path}>
            <route.component />
          </Route>
        ))}
        {/* <Route path="/" exact>
          <h1>root</h1>
        </Route> */}
        <Redirect to={{ pathname: "/login" }} />
      </Switch>
      {/* </AppLayout> */}
    </BrowserRouter>
  );
}

import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { AppLayout } from "src/components/appLayout/AppLayout";
import AuthLayout from "src/components/appLayout/AuthLayout";

// interface

export default function RouteWrapper({ component: Component, isPrivate, ...rest }: any) {
  const token = localStorage.getItem("token");
  const history = useHistory();
  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  // if (isPrivate && !token) {
  //   return <Redirect to="/login" />;
  // }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  // if (!signed) {
  //   // history.push("/login");
  //   <Redirect to="/login" />;
  // }

  const Layout = isPrivate ? AppLayout : AuthLayout;
  useEffect(() => {
    if (!token) {
      history.push("/login");
      // <Redirect to="/login" />;
    }
  }, []);
  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

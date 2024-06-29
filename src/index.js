import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import Forget from "views/ForgetPassword/Forget";
import Otp from "views/ForgetPassword/Otp";
import CreatePassword from "views/ForgetPassword/CreatePassword";
import ErrorBoundary from "ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isTokenValid = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    return false;
  }

  const { expirationTime } = userData;
  if (new Date().getTime() > expirationTime) {
    // Token has expired
    localStorage.removeItem("userData");
    return false;
  }

  return true;
};

const isAuthenticated = () => {
  return isTokenValid();
};

root.render(
  <BrowserRouter>
    <ToastContainer />
    <Switch>
      <ErrorBoundary>
        <Route
          path="/createpassword/:mobile"
          render={(props) => <CreatePassword {...props} />}
        />
        <Route path="/otp/:mobile" render={(props) => <Otp {...props} />} />
        <Route
          path="/forgetpassword"
          render={(props) => <Forget {...props} />}
        />
        <Route
          path="/admin"
          render={(props) =>
            isAuthenticated() ? <AdminLayout {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/"
          render={(props) =>
            isAuthenticated() ? (
              <Redirect to="/admin/dashboard" />
            ) : (
              <Login {...props} />
            )
          }
        />
      </ErrorBoundary>
    </Switch>
  </BrowserRouter>
);

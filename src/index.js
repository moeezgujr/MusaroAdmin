/*!
=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
      <Route path="/forgetpassword" render={(props) => <Forget {...props} />} />
      <Route path="/createpassword" render={(props) => <CreatePassword {...props} />} />
      <Route path="/otp" render={(props) => <Otp {...props} />} />

      <Route
        path="/admin"
        render={(props) =>
          isAuthenticated() ? <AdminLayout {...props} /> : <Redirect to="/" />
        }
      />
      <Route
        path="/"
        render={(props) =>
          isAuthenticated() ? (
            <Redirect to="/admin/dashboard" />
          ) : (
            <Login {...props} />
          )
        }
      />
    </Switch>
  </BrowserRouter>
);

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
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";
import { ReactComponent as Dashboardicon } from "../../assets/img/dashboard-cion.svg";
import { ReactComponent as UserSidebaricon } from "../../assets/img/user-sidebar-icon.svg";
import { ReactComponent as ContentIcon } from "../../assets/img/Contenticon.svg";
import { ReactComponent as AnalyticsIcon } from "../../assets/img/Anayltics.svg";
import { ReactComponent as UserIcon } from "../../assets/img/user.svg";
import { ReactComponent as SubscriptionIcon } from "../../assets/img/subscription.svg";
import { ReactComponent as ReportIcon } from "../../assets/img/reports.svg";
import { ReactComponent as SupportIcon } from "../../assets/img/supporticon.svg";

import { ReactComponent as SettingIcon } from "../../assets/img/settingicon.svg";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div className="sidebar-background" />
      <div className="sidebar-wrapper">
        {/* <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
      >*/}
        {/* <div className="logo-img">  */}
        <img
          src={require("assets/img/logosidebar.png")}
          alt="..."
          className="_logo"
        />
        {/* </div> */}

        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect && !prop.isNotAvailable)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {prop.icon === "dashboard" && (
                      <Dashboardicon className="mr-2" />
                    )}
                     {prop.icon === "user" && (
                      <UserSidebaricon className="mr-2" />
                    )}
                     {prop.icon === "content" && (
                      <ContentIcon className="mr-2" />
                    )}
                     {prop.icon === "anaylticsreporting" && (
                      <AnalyticsIcon className="mr-2" />
                    )}
                       {prop.icon === "customer" && (
                      <UserIcon className="mr-2" />
                    )}
                      {prop.icon === "subscriptions" && (
                      <SubscriptionIcon className="mr-2" />
                    )}
                     {prop.icon === "revenuereport" && (
                      <ReportIcon className="mr-2" />
                    )}
                     {prop.icon === "settings" && (
                      <SettingIcon className="mr-2" />
                    )}
                      {prop.icon === "support" && (
                      <SupportIcon className="mr-2" />
                    )}
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;

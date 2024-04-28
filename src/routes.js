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
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserManagement/UserProfile";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import UserTable from "views/UserManagement/UserTable";
import ContentView from "views/ContentManagement/ContentView";
import ProfessionFormComponent from "views/ContentManagement/AddProfession";
import TrendFormComponent from "views/ContentManagement/Addtrends";
import WorkshopFormComponent from "views/ContentManagement/AddWorkshop";
import Customer from "views/CustomerManagement/Customer";
import Subscription from "views/Subscription/Subscription";
import SubscriptionDetail from "views/Subscription/SubscriptionDetails";
import Revenue from "views/RevenueManagement/Revenue";
import AnalyticsReport from "views/AnalyticsReporting/AnalyticsReport";
import Setting from "views/Settings/Setting";
import Support from "views/Support/Support";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard Overview",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/userlist",
    name: "User Management",
    icon: "nc-icon nc-circle-09",
    component: UserTable,
    layout: "/admin",
  },
  {
    path: "/adduser",
    name: "Add User",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
    isNotAvailable: true,
  },

  {
    path: "/subscriptionsdetails",
    name: "Add User",
    icon: "nc-icon nc-circle-09",
    component: SubscriptionDetail,
    layout: "/admin",
    isNotAvailable: true,
  },
  {
    path: "/addprofession",
    name: "Add Profession",
    icon: "nc-icon nc-circle-09",
    component: ProfessionFormComponent,
    layout: "/admin",
    isNotAvailable: true,
  },
  {
    path: "/addtrend",
    name: "Add Trend",
    icon: "nc-icon nc-circle-09",
    component: TrendFormComponent,
    layout: "/admin",
    isNotAvailable: true,
  },
  {
    path: "/addWorkshop",
    name: "Add Workshop",
    icon: "nc-icon nc-circle-09",
    component: WorkshopFormComponent,
    layout: "/admin",
    isNotAvailable: true,
  },
  {
    path: "/table",
    name: "Content Management",
    icon: "nc-icon nc-notes",
    component: ContentView,
    layout: "/admin",
  },
  {
    path: "/anaylticsreporting",
    name: "Analytics & Reporting",
    icon: "nc-icon nc-paper-2",
    component: AnalyticsReport,
    layout: "/admin",
  },
  {
    path: "/customermanagement",
    name: "Customer Management",
    icon: "nc-icon nc-paper-2",
    component: Customer,
    layout: "/admin",
  },

  {
    path: "/subscriptions",
    name: "New Subscription",
    icon: "nc-icon nc-atom",
    component: Subscription,
    layout: "/admin",
  },
  {
    path: "/revenuereport",
    name: "Subscriptions & Revenue",
    icon: "nc-icon nc-atom",
    component: Revenue,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Settings & Integration",
    icon: "nc-icon nc-pin-3",
    component: Setting,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Support and help",
    icon: "nc-icon nc-bell-55",
    component: Support,
    layout: "/admin",
  },
];

export default dashboardRoutes;

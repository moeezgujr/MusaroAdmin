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
import CustomerFormComponent from "views/CustomerManagement/CustomerDetails";
import Provider from "views/ServiceProvider/Provider";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard Overview",
    icon: "dashboard",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/userlist",
    name: "User Management",
    icon: "user",
    component: UserTable,
    layout: "/admin",
    key: "UserManagement",
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
    path: "/edituser/:id",
    name: "Edit User",
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
    path: "/editProfession/:id",
    name: "Edit Profession",
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
    path: "/edittrend/:id",
    name: "Add Trend",
    icon: "nc-icon nc-circle-09",
    component: TrendFormComponent,
    layout: "/admin",
    isNotAvailable: true,
  },
  {
    path: "/customerdetails/:id",
    name: "Customer Detail",
    icon: "nc-icon nc-circle-09",
    component: CustomerFormComponent,
    layout: "/admin",
    isNotAvailable: true,
  },
  {
    path: "/addWorkshop/:id",
    name: "Add Workshop",
    icon: "nc-icon nc-circle-09",
    component: WorkshopFormComponent,
    layout: "/admin",
    isNotAvailable: true,
  },
  {
    path: "/content",
    name: "Content Management",
    icon: "content",
    component: ContentView,
    layout: "/admin",
    key: "ContentManagement",
  },
  {
    path: "/anaylticsreporting",
    name: "Analytics & Reporting",
    icon: "anaylticsreporting",
    component: AnalyticsReport,
    layout: "/admin",
    key: "Analytics",
  },
  {
    path: "/customermanagement",
    name: "Customer Management",
    icon: "customer",
    component: Customer,
    layout: "/admin",
    key: "CustomerManagement",
  },
  {
    path: "/serviceprovider",
    name: "Service Provider",
    icon: "customer",
    component: Provider,
    layout: "/admin",
    key: "ProviderManagement",
  },
  // {
  //   path: "/subscriptions",
  //   name: "New Subscription",
  //   icon: "subscriptions",
  //   component: Subscription,
  //   layout: "/admin",
  //   key: "NewSubscriptions",
  // },
  {
    path: "/revenuereport",
    name: "Subscriptions & Revenue",
    icon: "revenuereport",
    component: Revenue,
    layout: "/admin",
    key: "Revenue",
  },
  {
    path: "/maps",
    name: "Settings & Integration",
    icon: "settings",
    component: Setting,
    layout: "/admin",
  },

];

export default dashboardRoutes;

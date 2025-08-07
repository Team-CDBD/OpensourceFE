/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "features/dashboard";
import Tables from "features/tables";
import Billing from "features/billing";
import RTL from "features/rtl";
import Notifications from "features/notifications";
import Profile from "features/profile";
import SignIn from "features/authentication/sign-in";
import SignUp from "features/authentication/sign-up";
import KafkaConfiguration from "features/configurations/kafka";
import AlertSystemConfiguration from "features/configurations/alert-system";
import ExportApiConfiguration from "features/configurations/export-api";
import AccountConfiguration from "features/configurations/account";
import McpConfiguration from "features/configurations/mcp";

// @mui icons
import Icon from "@mui/material/Icon";
import MainPage from "features/main";

const routes = [
  {
    name: "MainPage",
    key: "main-page",
    route: "/",
    component: <MainPage />,
  },
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    component: <RTL />,
  },
  {
    name: "Profile",
    key: "profile",
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "장애 알림 목록",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "divider",
    key: "divider-1",
  },
  {
    type: "title",
    title: "관리자 설정",
    key: "settings",
  },
  {
    type: "collapse",
    name: "Kafka 설정",
    key: "kafka",
    icon: <Icon fontSize="small">electrical_services</Icon>,
    route: "/config/kafka",
    component: <KafkaConfiguration />,
  },
  {
    type: "collapse",
    name: "알람 시스템 설정",
    key: "alert-system",
    icon: <Icon fontSize="small">alarm</Icon>,
    route: "/config/alert",
    component: <AlertSystemConfiguration />,
  },
  {
    type: "collapse",
    name: "외부 연동 API 설정",
    key: "export-api",
    icon: <Icon fontSize="small">api</Icon>,
    route: "/config/export-api",
    component: <ExportApiConfiguration />,
  },
  {
    type: "collapse",
    name: "계정 관리",
    key: "account",
    icon: <Icon fontSize="small">account_circle</Icon>,
    route: "/config/account",
    component: <AccountConfiguration />,
  },
  {
    type: "collapse",
    name: "MCP 설정",
    key: "mcp",
    icon: <Icon fontSize="small">mediation</Icon>,
    route: "/config/mcp",
    component: <McpConfiguration />,
  },
  {
    type: "divider",
    key: "divider-2",
  },
  {
    type: "collapse",
    name: "테이블 보기 임시 페이지",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "임시 페이지(런칭전 삭제 요망)",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
];

export default routes;

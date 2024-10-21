import { lazy } from "react";
import Login from "../views/pages/Login/Login.js";
import Register from "../views/pages/Register/Register.js";
import MyTasks from "../components/MyTasks/MyTasks.js";
import TaskAdd from './../components/TaskAdd/TaskAdd';
import TaskDetail from './../components/TaskDetail/TaskDetail';
import AllTasks from "../components/AllTasks/AllTasks.js";
import Roles from "../components/Roles/Roles.js";
import Tickets from "../components/Tickets/Tickets.js";

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const Starter = lazy(() => import("../views/Starter.js"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Starter /> },
      { path: "/task/:id", exact: true, element: <TaskDetail /> },
      { path: "/mytasks", exact: true, element: <MyTasks /> },
      { path: "/taskadd", exact: true, element: <TaskAdd /> },
      { path: "/alltasks", exact: true, element: <AllTasks /> },
      { path: "/roles", exact: true, element: <Roles /> },
      { path: "/tickets", exact: true, element: <Tickets /> },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  }
];

export default ThemeRoutes;

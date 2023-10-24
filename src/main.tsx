import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const Login = lazy(() => import('./routes/login'));
const Dashboard = lazy(() => import('./routes/Dashboard'));

const Viewid = lazy(() => import('./components/viewid'));

const Scheduled = lazy(() => import('./routes/scheduled/index'));
const Delay = lazy(() => import('./routes/delay/index'));
const Prio = lazy(() => import('./routes/priority/index'));
const Done = lazy(() => import('./routes/done/index'));

const Employee = lazy(() => import('./routes/employee/index'));
const Employeeid = lazy(() => import('./routes/employee/[id]'));

const Project = lazy(() => import('./routes/project/index'));
const Projectid = lazy(() => import('./routes/project/[id]'));

const CAccount = lazy(() => import('./routes/account'));
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },


  {
    path: "/delay",
    Component: Delay,
  },
  {
    path: "/delay/:id",
    Component: Viewid,
  },


  {
    path: "/scheduled",
    Component: Scheduled,
  },
  {
    path: "/scheduled/:id",
    Component: Viewid,
  },

  {
    path: "/priority",
    Component: Prio,
  },
  {
    path: "/priority/:id",
    Component: Viewid,
  },

  {
    path: "/done",
    Component: Done,
  },
  {
    path: "/done/:id",
    Component: Viewid,
  },

  {
    path: "/employee",
    Component: Employee,
  },
  {
    path: "/employee/:id",
    Component: Employeeid,
  },
  {
    path: "/project",
    Component: Project,
  },
  {
    path: "/project/:id",
    Component: Projectid,
  },

  {
    path: "/account",
    Component: CAccount,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)

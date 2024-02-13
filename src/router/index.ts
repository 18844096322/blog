import { ReactNode } from "react";

import LoginPage from "../login";
import NotFound from "../404";
import Home from "../views/home";
import About from "../views/about";
// const Home = lazy(() => import("../views/home"));
// const About = lazy(() => import("../views/about"));
// const LoginPage = lazy(() => import("../login"));
// const NotFound = lazy(() => import("../404"));

export interface RouteConfig {
  path: string;
  element?: ReactNode;
  auth?: boolean;
  children?: RouteConfig[];
  redirect?:string
}

export const routers = [
  { path: "/login", element: LoginPage(), auth: false },
  { path: "/", redirect: '/home' },
  { path: "/home", element: Home(), auth: true },
  { path: "/about", element: About(), auth: false },
  { path: "*", element: NotFound(), auth: true }
];


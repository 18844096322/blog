import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import Login from './login';
// import Home from './views/home';
// import { useSelector } from "react-redux";
import { RouteConfig, routers } from "./router";

let currentRoute: any = {};
// 遍历查找路由文件中是否有当前路由，由pathname来查找
const findRoutesPath = (routeList: RouteConfig[], path: string) => {
    routeList.forEach((item) => {
        if (item.path === path) {
            currentRoute = item;
        } else if (item.children && item.children.length > 0) {
            // 递归调用
            findRoutesPath(item.children, path);
        }
    });
}

const App: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const pathname = window.location.pathname;
    useEffect(() => {
        console.log(token);
        findRoutesPath(routers, pathname);
        console.log(currentRoute, 'currentRoute');
        // 判断是否需要鉴权
        if (!token && currentRoute.auth) {
            navigate('/login');
        }
    }, [token, navigate, pathname]);
    // console.log(token);
    // 处理我们的routers
    const RouteAuthFun = (
        (routeList: RouteConfig[]) => {
            return routeList.map(
                (item: {
                    path: string;
                    auth?: boolean;
                    element?: ReactNode;
                    children?: any;
                    redirect?: string;
                }) => {
                    // console.log(item.auth, token, item.path);
                    // // 判断是否需要鉴权
                    console.log(item);
                    if (item.redirect) {
                        console.log('=====')
                        return <Route path={item.path} element={<Navigate to={item.redirect} />} key={item.path}></Route>
                    }
                    // const token = localStorage.getItem('token');
                    return (
                        <Route
                            path={item.path}
                            element={item.element}
                            key={item.path}
                        >
                            {/* 递归调用，因为可能存在多级的路由 */}
                            {item?.children && RouteAuthFun(item.children)}
                        </Route>
                    );
                }
            );
        }
    );
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }} locale={zhCN}>
            <Routes>
                {RouteAuthFun(routers)}
            </Routes>
        </ConfigProvider>
    )
};
export default App;
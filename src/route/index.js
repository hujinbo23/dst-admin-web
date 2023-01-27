import LayoutApp from "../layout"
import Begin from "../pages/begin";
import Login from "../pages/Login";

import { menus } from "../config/menu"
import { translateRoutes } from "../utils/routeUtils";

const temp = translateRoutes(menus)
// console.log("menus: ",temp)

export const routes = [
    {
        path: '/',
        name: '首页',
        element: <LayoutApp />,
        children: temp
    },
    {
        path: '/begin',
        name: '开始',
        element: <Begin />,
        // children: temp
    },
    {
        path: '/login',
        name: '登录',
        element: <Login />,
    },
]
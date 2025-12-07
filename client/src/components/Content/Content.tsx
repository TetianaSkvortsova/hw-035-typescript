import {menuItems} from '../../common/menu.ts';

import {Route, Routes } from "react-router";
import PrivateRoute from "../PrivateRoute/PrivateRoute.tsx";

function Content() {
    const mainRoute = menuItems.find(item => item.path === '/');
    const privateRoutes = menuItems.filter(item => item.path !== '/');

    return (
        <Routes>
            {mainRoute && (
                <Route path={mainRoute.path} element={<mainRoute.Component />} />
            )}
            <Route element={<PrivateRoute />}>
                {privateRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Route>
        </Routes>
    );
}

export default Content;
import {menuItems} from '../../common/menu.ts';

import {Route, Routes } from "react-router";

function Content() {
    return (
        <Routes>
            {/*<Route element={<PrivateRoute />}>*/}
            <Route>
                {menuItems.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Route>
        </Routes>
    );
}

export default Content;
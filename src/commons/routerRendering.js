/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React from "react";
import {Route, Switch} from "react-router-dom";

let routerRendering = (routes, isSwitch = true) => {
    let routesRendered = null;
    if (routes.length > 0) {
        routesRendered = routes.map((route, index) => {
            return (
                <Route key={index} path={route.path} exact={route.exact} component={route.main}/>
            );
        });
        return (
            isSwitch ? <Switch>{routesRendered}</Switch> : routesRendered
        );
    }
};
export default routerRendering;

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Application } from "./app/application";
import { Router } from "./app/router";
import { DialogService, RouterService, RouteService } from "./util/services";

const dialog: DialogService = {
    alert: window.alert.bind(window),
    confirm: window.confirm.bind(window),
    prompt: window.prompt.bind(window),
};

const router: RouterService = {
    onRouteChange: callback => {
        const cb = () => {
            callback(window.location.hash);
        };
        window.addEventListener("hashchange", cb);
        return () => window.removeEventListener("hashchange", cb);
    },
    route: () => window.location.hash,
};

const route: RouteService = {
    routeTo: (location: string) => (window.location.hash = location),
};

const storage = window.localStorage;

const services = { dialog, route, router, storage };

ReactDOM.render(
    <Router services={services}>
        {location => <Application location={location} namespace="epidemia" services={services} />}
    </Router>,
    document.getElementById("root"),
);

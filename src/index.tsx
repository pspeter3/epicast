import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./view/app";

const services = {
    dialog: {
        alert: alert.bind(window),
        confirm: confirm.bind(window),
        prompt: prompt.bind(window),
    },
};

ReactDOM.render(
    <HashRouter>
        <App services={services} />
    </HashRouter>,
    document.getElementById("root"),
);

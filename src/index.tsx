import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Heading } from "./heading";

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <Heading />
    </React.Fragment>,
    document.getElementById("root"),
);

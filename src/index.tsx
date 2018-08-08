import * as React from "react";
import * as ReactDOM from "react-dom";
import { Action, Actions, Appbar, Headline } from "./theme/appbar";
import { Edit, Undo } from "./theme/icons";

ReactDOM.render(
    <Appbar>
        <Headline href="#">Epidemia</Headline>
        <Actions>
            <Action role="button">
                <Undo />
            </Action>
            <Action href="#edit">
                <Edit />
            </Action>
        </Actions>
    </Appbar>,
    document.getElementById("root"),
);

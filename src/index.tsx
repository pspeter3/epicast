import * as React from "react";
import * as ReactDOM from "react-dom";
import { Appbar } from "./theme/appbar";
import { AlertIcon, CodeIcon, EditIcon, SaveIcon, UndoIcon } from "./theme/icons";

ReactDOM.render(
    <Appbar
        title="Epidemia"
        actions={[
            { icon: UndoIcon, href: "#/undo" },
            { icon: AlertIcon, href: "#/infect" },
            { icon: CodeIcon, href: "#/debug" },
            { icon: EditIcon, href: "#/settings" },
            { icon: SaveIcon, href: "#/save" },
        ]}
    />,
    document.getElementById("root"),
);

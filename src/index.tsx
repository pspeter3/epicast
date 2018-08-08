import * as React from "react";
import * as ReactDOM from "react-dom";
import { Appbar } from "./theme/appbar";
import { DataTable } from "./theme/data_table";
import { AlertIcon, CodeIcon, EditIcon, SaveIcon, UndoIcon } from "./theme/icons";

ReactDOM.render(
    <>
        <Appbar
            title="Epidemia"
            actions={[
                { icon: UndoIcon, href: "#/undo" },
                { icon: AlertIcon, href: "#/infect" },
                { icon: CodeIcon, href: "#/debug" },
                { icon: EditIcon, href: "#/settings" },
                { icon: SaveIcon, href: "#/save" },
            ]}
        />
        <DataTable<"name" | "infections" | "epidemics">
            headers={{ name: false, infections: true, epidemics: true }}
            defaultSort="infections"
            data={[
                { name: "San Francisco", infections: 0.502, epidemics: 0.23 },
                { name: "Los Angeles", infections: 0.32, epidemics: 0.37 },
            ]}
        />
    </>,
    document.getElementById("root"),
);

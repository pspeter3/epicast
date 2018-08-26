import * as React from "react";
import { State } from "../core/types";
import { Appbar } from "../theme/appbar";
import { BackIcon } from "../theme/icons";
import { Repr } from "../theme/repr";
import { Routes } from "./routes";

export const Debug: React.SFC<{ state: State }> = ({ state }) => (
    <>
        <Appbar
            action={{ icon: BackIcon, href: Routes.Settings, label: "Back" }}
            title="Debug"
            actions={[]}
        />
        <Repr>{JSON.stringify(state, undefined, 2).replace(/[",]/g, "")}</Repr>
    </>
);

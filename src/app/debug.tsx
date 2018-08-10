import * as React from "react";
import { State } from "../core/types";
import { Appbar } from "../theme/appbar";
import { classNames } from "../theme/css";
import { BackIcon } from "../theme/icons";
import { Padding, TextColor } from "../theme/tailwind";
import { Routes } from "./routes";

export const Debug: React.SFC<{ state: State }> = ({ state }) => (
    <>
        <Appbar action={{ icon: BackIcon, href: Routes.Settings }} title="Debug" actions={[]} />
        <pre className={classNames(Padding.X4, TextColor.Grey)}>
            {JSON.stringify(state, undefined, 2).replace(/[",]/g, "")}
        </pre>
    </>
);

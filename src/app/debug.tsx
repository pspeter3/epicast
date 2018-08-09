import * as React from "react";
import { State } from "../core/types";
import { Appbar } from "../theme/appbar";
import { classNames } from '../theme/css';
import { Padding, TextColor } from '../theme/tailwind';

export const Debug: React.SFC<{ state: State }> = ({ state }) => (
    <>
        <Appbar title="Epidemia" actions={[]} />
        <pre className={classNames(Padding.X4, TextColor.Grey)}>{JSON.stringify(state, undefined, 2).replace(/[",]/g, "")}</pre>
    </>
);

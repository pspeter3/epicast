import * as React from "react";
import { classNames } from "./css";

export const Main: React.SFC<React.HTMLProps<HTMLMainElement>> = props => (
    <main {...props} className={classNames("main", props.className)} />
);

import * as React from "react";
import { classNames } from "./css";

export const Banner: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
    <div {...props} className={classNames("banner", props.className)} />
);

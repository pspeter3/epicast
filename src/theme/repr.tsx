import * as React from "react";
import { classNames } from "./css";

export const Repr: React.SFC<React.HTMLProps<HTMLPreElement>> = props => (
    <pre {...props} className={classNames("repr", props.className)} />
);
Repr.displayName = "Repr";

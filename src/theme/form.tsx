import * as React from "react";
import { classNames } from "./css";

export const Fieldset: React.SFC<React.HTMLProps<HTMLFieldSetElement>> = props => (
    <fieldset {...props} className={classNames("fieldset", props.className)} />
);
Fieldset.displayName = "Fieldset";

export const Legend: React.SFC<React.HTMLProps<HTMLLegendElement>> = props => (
    <legend {...props} className={classNames("legend", props.className)} />
);
Legend.displayName = "Legend";

export const Button: React.SFC<React.HTMLProps<HTMLButtonElement>> = props => (
    <div className="button">
        <button {...props} className={classNames("button__control", props.className)} />
    </div>
);
Button.displayName = "Button";

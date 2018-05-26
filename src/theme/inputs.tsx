import * as React from "react";
import { IconButton } from "./buttons";
import { CheckCircleIcon, CircleIcon } from "./icons";

export const NumericInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
    return <input className="numeric-input" type="number" {...props} />;
};

export const Checkbox: React.SFC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
    const checked = props["aria-checked"];
    return (
        <IconButton role="checkbox" aria-checked={checked} {...props}>
            {checked ? <CheckCircleIcon /> : <CircleIcon />}
        </IconButton>
    );
};

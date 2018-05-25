import * as React from "react";
import { CheckCircleIcon, CircleIcon } from "./icons";

export const NumericInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
    return <input className="numeric-input" type="number" {...props} />;
};

export const Checkbox: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
    const id = props.id;
    return (
        <React.Fragment>
            <input className="checkbox-input" type="checkbox" {...props} />
            <label className="checkbox-label" htmlFor={id}>
                {props.checked ? <CheckCircleIcon /> : <CircleIcon />}
            </label>
        </React.Fragment>
    );
};

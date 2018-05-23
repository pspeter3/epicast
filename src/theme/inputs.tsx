import * as React from "react";

export const NumericInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
    return <input className="numeric-input" type="number" {...props} />;
};

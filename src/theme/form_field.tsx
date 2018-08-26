import * as React from "react";
import { NumericInput } from "./numeric_input";

export interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export const FormField: React.SFC<Props> = ({ label, value, onChange }) => (
    <div className="form-field">
        <label className="form-field__label" htmlFor={label}>
            {label}
        </label>
        <NumericInput value={value} onChange={onChange} label={label} />
    </div>
);

FormField.displayName = "FormField";

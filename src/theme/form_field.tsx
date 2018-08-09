import * as React from "react";
import { classNames } from "./css";
import { NumericInput } from "./numeric_input";
import { Display, JustifyContent, Padding } from "./tailwind";

export interface Props {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export const FormField: React.SFC<Props> = ({ label, value, onChange }) => (
    <div className={classNames(Display.Flex, JustifyContent.Between)}>
        <label className={classNames(Padding.A3)}>{label}</label>
        <NumericInput value={value} onChange={onChange} />
    </div>
);

FormField.displayName = "FormField";

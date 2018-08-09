import * as React from "react";
import { classNames } from "../theme/css";
import { NumericInput } from "../theme/numeric_input";
import { Display, JustifyContent, Padding } from "../theme/tailwind";

export interface Props {
    city: string;
    value: number;
    onChange: (city: string, value: number) => void;
}

export class InfectionRow extends React.PureComponent<Props, {}> {
    public static displayName = "InfectionRow";

    public render() {
        const { city, value } = this.props;
        return (
            <div className={classNames(Display.Flex, JustifyContent.Between)}>
                <label className={classNames(Padding.A3)}>{city}</label>
                <NumericInput value={value} onChange={this._onChange} />
            </div>
        );
    }

    private _onChange = (value: number): void => {
        this.props.onChange(this.props.city, value);
    };
}

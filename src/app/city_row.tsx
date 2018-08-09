import * as React from "react";
import { FormField } from "../theme/form_field";

export interface Props {
    city: string;
    value: number;
    onChange: (city: string, value: number) => void;
}

export class CityRow extends React.PureComponent<Props, {}> {
    public static displayName = "CityRow";

    public render() {
        const { city, value } = this.props;
        return <FormField label={city} value={value} onChange={this._onChange} />;
    }

    private _onChange = (value: number): void => {
        this.props.onChange(this.props.city, value);
    };
}

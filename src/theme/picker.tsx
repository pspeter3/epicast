import * as React from "react";
import { classNames } from "./css";

export interface Props {
    icon: React.ReactElement<any>;
    label: string;
    options: string[];
    disabled?: boolean;
    className?: string;
    onChange: (value: string) => void;
}

export class Picker extends React.PureComponent<Props, {}> {
    public static displayName = "Picker";

    public static Field: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
        <div {...props} className={classNames("picker", props.className)} />
    );

    public static Prefix: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
        <div {...props} className={classNames("picker__prefix", props.className)} />
    );

    public static Dropdown: React.SFC<React.HTMLProps<HTMLSelectElement>> = props => (
        <select {...props} className={classNames("picker__dropdown", props.className)} />
    );

    public render() {
        const { icon, label, options, disabled, className } = this.props;
        return (
            <Picker.Field className={className}>
                <Picker.Prefix className={disabled ? "picker__prefix--disabled" : ""}>
                    {icon}
                </Picker.Prefix>
                <Picker.Dropdown value={label} disabled={disabled} onChange={this._onChange}>
                    <option disabled={true} value={label}>
                        {label}
                    </option>
                    <>
                        {options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </>
                </Picker.Dropdown>
            </Picker.Field>
        );
    }

    private _onChange: React.ChangeEventHandler<HTMLSelectElement> = evt =>
        this.props.onChange(evt.target.value);
}

Picker.Field.displayName = "Picker.Field";
Picker.Prefix.displayName = "Picker.Prefix";
Picker.Dropdown.displayName = "Picker.Dropdown";

import * as React from "react";
import { render } from "../../node_modules/@types/react-dom";
import { classNames, focusClass } from "./css";
import {
    AlignItems,
    Appearance,
    BackgroundColor,
    BorderRadius,
    BorderSize,
    BorderStyle,
    Display,
    FontWeight,
    Margin,
    Outline,
    Padding,
    Sizing,
    TextColor,
    TextDecoration,
    TextSize,
    Tracking,
    JustifyContent,
} from "./tailwind";

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
        <div
            {...props}
            className={classNames(Display.Flex, Padding.X3, Padding.Y1, props.className)}
        />
    );

    public static Prefix: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
        <div
            {...props}
            className={classNames(
                AlignItems.Center,
                BorderRadius.SmallLeft,
                BorderSize.B1,
                BorderSize.L1,
                BorderSize.T1,
                Display.Flex,
                JustifyContent.Center,
                Sizing.H10,
                Sizing.W10,
                TextColor.Grey,
                props.className,
            )}
        />
    );

    public static Dropdown: React.SFC<React.HTMLProps<HTMLSelectElement>> = props => (
        <select
            {...props}
            className={classNames(
                Appearance.None,
                BackgroundColor.White,
                BorderRadius.None,
                BorderRadius.SmallRight,
                BorderSize.A1,
                BorderStyle.Solid,
                FontWeight.Medium,
                Padding.X2,
                Sizing.H10,
                Sizing.WFull,
                TextColor.Grey,
                TextDecoration.Uppercase,
                TextSize.Base,
                Tracking.Wide,
                focusClass(BackgroundColor.Lightest),
                focusClass(Outline.None),
            )}
        />
    );

    public render() {
        const { icon, label, options, disabled, className } = this.props;
        return (
            <Picker.Field className={className}>
                <Picker.Prefix>{icon}</Picker.Prefix>
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

import * as React from "react";
import { classNames, focusClass } from "./css";
import { MinusIcon, PlusIcon } from "./icons";
import {
    AlignItems,
    BackgroundColor,
    BorderRadius,
    BorderSize,
    BorderStyle,
    Display,
    FontFamily,
    JustifyContent,
    Margin,
    Outline,
    Sizing,
    TextAlign,
    TextColor,
} from "./tailwind";

export interface Props {
    value: number;
    onChange: (nextValue: number) => void;
}

export interface State {
    isEmpty: boolean;
}

export class NumericInput extends React.PureComponent<Props, State> {
    public static displayName = "NumericInput";

    public static Container: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
        <div
            {...props}
            className={classNames(Display.Flex, Margin.Y1, Margin.X3, props.className)}
        />
    );

    public static Stepper: React.SFC<React.HTMLProps<HTMLButtonElement>> = props => (
        <button
            {...props}
            className={classNames(
                TextColor.Base,
                Display.InlineFlex,
                AlignItems.Center,
                JustifyContent.Center,
                BorderSize.T1,
                BorderSize.B1,
                Sizing.W12,
                focusClass(Outline.None),
                focusClass(BackgroundColor.Lightest),
                props.className,
            )}
        />
    );

    public static Control: React.SFC<React.HTMLProps<HTMLInputElement>> = props => (
        <input
            {...props}
            className={classNames(
                FontFamily.Mono,
                TextAlign.Center,
                Sizing.W12,
                Sizing.H10,
                BorderStyle.Solid,
                BorderSize.A1,
                focusClass(Outline.None),
            )}
        />
    );

    public state = {
        isEmpty: false,
    };

    public render() {
        return (
            <NumericInput.Container>
                <NumericInput.Stepper
                    className={classNames(BorderSize.L1, BorderRadius.SmallLeft)}
                    onClick={this._onDecrement}
                >
                    {MinusIcon}
                </NumericInput.Stepper>
                <NumericInput.Control
                    value={this.state.isEmpty ? "" : this.props.value}
                    onChange={this._onChange}
                />
                <NumericInput.Stepper
                    className={classNames(BorderSize.R1, BorderRadius.SmallRight)}
                    onClick={this._onIncrement}
                >
                    {PlusIcon}
                </NumericInput.Stepper>
            </NumericInput.Container>
        );
    }

    private _onChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
        const value = evt.target.value;
        if (value.length > 0) {
            this._clearEmpty();
            this.props.onChange(parseInt(value, 10));
        } else {
            this.setState({
                isEmpty: true,
            });
        }
    };

    private _onDecrement = () => {
        this._clearEmpty();
        this.props.onChange(this.props.value - 1);
    };

    private _onIncrement = () => {
        this._clearEmpty();
        this.props.onChange(this.props.value + 1);
    };

    private _clearEmpty() {
        if (this.state.isEmpty) {
            this.setState({ isEmpty: false });
        }
    }
}

NumericInput.Container.displayName = "NumericInput.Container";
NumericInput.Stepper.displayName = "NumericInput.Stepper";
NumericInput.Control.displayName = "NumericInput.Control";

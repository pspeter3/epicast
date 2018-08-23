import * as React from "react";
import { classNames } from "./css";
import { MinusIcon, PlusIcon } from "./icons";

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
        <div {...props} className={classNames("numeric-input", props.className)} />
    );

    public static Stepper: React.SFC<React.HTMLProps<HTMLButtonElement>> = props => (
        <button {...props} className={classNames("numeric-input__stepper", props.className)} />
    );

    public static Control: React.SFC<React.HTMLProps<HTMLInputElement>> = props => (
        <input
            {...props}
            className={classNames("numeric-input__control", props.className)}
            type="number"
        />
    );

    public state = {
        isEmpty: false,
    };

    public render() {
        return (
            <NumericInput.Container>
                <NumericInput.Stepper
                    className="numeric-input__stepper--left"
                    onClick={this._onDecrement}
                >
                    {MinusIcon}
                </NumericInput.Stepper>
                <NumericInput.Control
                    value={this.state.isEmpty ? "" : this.props.value}
                    onChange={this._onChange}
                />
                <NumericInput.Stepper
                    className="numeric-input__stepper--right"
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

    private _onDecrement: React.MouseEventHandler<HTMLButtonElement> = evt => {
        evt.preventDefault();
        this._clearEmpty();
        this.props.onChange(this.props.value - 1);
    };

    private _onIncrement: React.MouseEventHandler<HTMLButtonElement> = evt => {
        evt.preventDefault();
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

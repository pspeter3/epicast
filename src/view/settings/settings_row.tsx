import * as React from "react";
import { IconButton } from "../../theme/buttons";
import { MinusCircleIcon, PlusCircleIcon } from "../../theme/icons";
import { NumericInput } from "../../theme/inputs";
import { Row } from "../../theme/layout";
import { Text } from "../../theme/typography";

export interface Props {
    name: string;
    displayName?: string;
    value: number;
    onDecrement: (name: string) => void;
    onChange: (name: string, value: number) => void;
    onIncrement: (name: string) => void;
}

export class SettingsRow extends React.PureComponent<Props, {}> {
    public render() {
        const { name, displayName, value } = this.props;
        return (
            <Row>
                <Text>{displayName || name}</Text>
                <IconButton onClick={this._onDecrement}>
                    <MinusCircleIcon />
                </IconButton>
                <NumericInput onChange={this._onChange} value={value} />
                <IconButton onClick={this._onIncrement}>
                    <PlusCircleIcon />
                </IconButton>
            </Row>
        );
    }

    private _onDecrement = () => {
        this.props.onDecrement(this.props.name);
    };

    private _onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        if (value) {
            this.props.onChange(this.props.name, parseInt(evt.target.value, 10));
        }
    };

    private _onIncrement = () => {
        this.props.onIncrement(this.props.name);
    };
}

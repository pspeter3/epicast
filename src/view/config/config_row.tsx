import * as React from "react";
import { IconButton } from "../../theme/buttons";
import { MinusCircleIcon, PlusCircleIcon } from "../../theme/icons";
import { NumericInput } from "../../theme/inputs";
import { Row } from "../../theme/layout";
import { Text } from "../../theme/typography";

export interface Props {
    readonly name: string;
    readonly value: number;
    readonly onDecrement: (name: string) => void;
    readonly onChange: (name: string, value: string) => void;
    readonly onIncrement: (name: string) => void;
}

export class ConfigRow extends React.PureComponent<Props, {}> {
    public render() {
        const { name, value } = this.props;
        return (
            <Row>
                <Text>{name}</Text>
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
        this.props.onChange(this.props.name, evt.target.value);
    };

    private _onIncrement = () => {
        this.props.onIncrement(this.props.name);
    };
}

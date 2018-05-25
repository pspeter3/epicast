import * as React from "react";
import { IconButton } from "../../theme/buttons";
import { TargetIcon } from "../../theme/icons";
import { Checkbox } from "../../theme/inputs";
import { Row } from "../../theme/layout";
import { Text } from "../../theme/typography";

export interface Props {
    city: string;
    checked?: boolean;
    onToggle?: (city: string) => void;
    onEpidemic?: (city: string) => void;
}

export class InfectionRow extends React.PureComponent<Props, {}> {
    public render() {
        const { city, checked, onToggle, onEpidemic } = this.props;
        return (
            <Row>
                <Checkbox
                    aria-checked={checked}
                    disabled={onToggle === undefined}
                    onClick={this._onToggle}
                />
                <Text>{city}</Text>
                {onEpidemic && (
                    <IconButton onClick={this._onEpidemic}>
                        <TargetIcon />
                    </IconButton>
                )}
            </Row>
        );
    }

    private _onToggle = () => {
        this.props.onToggle!(this.props.city);
    };

    private _onEpidemic = () => {
        this.props.onEpidemic!(this.props.city);
    };
}

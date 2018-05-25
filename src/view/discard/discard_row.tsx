import * as React from "react";
import { IconButton } from "../../theme/buttons";
import { TrashIcon } from "../../theme/icons";
import { Row } from "../../theme/layout";
import { Text } from "../../theme/typography";

export interface Props {
    city: string;
    onRemove: (city: string) => void;
}

export class DiscardRow extends React.PureComponent<Props, {}> {
    public render() {
        const { city } = this.props;
        return (
            <Row>
                <Text>{city}</Text>
                <IconButton onClick={this._onRemove}>
                    <TrashIcon />
                </IconButton>
            </Row>
        );
    }

    private _onRemove = () => {
        this.props.onRemove(this.props.city);
    };
}

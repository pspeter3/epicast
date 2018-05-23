import * as React from "react";
import { IconButton } from "../theme/buttons";
import { TrashIcon } from "../theme/icons";
import { Main, Row } from "../theme/layout";
import { Text } from "../theme/typography";

export const Discard: React.SFC<{}> = () => {
    return (
        <Main>
            <Row>
                <Text>Atlanta</Text>
                <IconButton>
                    <TrashIcon />
                </IconButton>
            </Row>
            <Row>
                <Text>San Francisco</Text>
                <IconButton>
                    <TrashIcon />
                </IconButton>
            </Row>
            <Row>
                <Text>San Francisco</Text>
                <IconButton>
                    <TrashIcon />
                </IconButton>
            </Row>
        </Main>
    );
};

import * as React from "react";
import { Meter } from "../theme/data";
import { Main, Row, Tile } from "../theme/layout";

export const Player: React.SFC<{}> = () => {
    return (
        <Main>
            <Tile>
                <Row>
                    <Meter value={0} />
                </Row>
                <Row>
                    <Meter value={0.3} />
                </Row>
                <Row>
                    <Meter active value={1} />
                </Row>
                <Row>
                    <Meter active value={1} />
                </Row>
                <Row>
                    <Meter active value={1} />
                </Row>
            </Tile>
        </Main>
    );
};

import * as React from "react";
import { Label, Meter, Percentage } from "../theme/data";
import { Main, Row, Tile } from "../theme/layout";

export const Dashboard: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <Tile>
                <Row>
                    <Label>Epidemic Probability</Label>
                    <Percentage value={0.63} />
                </Row>
                <Row>
                    <Meter active value={0.63} />
                </Row>
            </Tile>
            <Main>
                <Row>
                    <Label>Table Goes Here</Label>
                </Row>
            </Main>
        </React.Fragment>
    );
};

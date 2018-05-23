import * as React from "react";
import { Meter, Percentage } from "../theme/data";
import { Main, Row, Tile } from "../theme/layout";
import { Header, Text } from "../theme/typography";

export const Dashboard: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <Tile>
                <Row>
                    <Header>Epidemic Probability</Header>
                    <Percentage value={0.63} />
                </Row>
                <Row>
                    <Meter active value={0.63} />
                </Row>
            </Tile>
            <Main>
                <Row>
                    <Text>Table Goes Here</Text>
                </Row>
            </Main>
        </React.Fragment>
    );
};

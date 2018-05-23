import * as React from "react";
import { BottomButton, IconButton } from "../theme/buttons";
import { CircleIcon, XCircleIcon } from "../theme/icons";
import { Main, Row, Section } from "../theme/layout";
import { SubHeader, Text } from "../theme/typography";

export const Infection: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <Main>
                <Section>
                    <Row>
                        <SubHeader>Discard Pile</SubHeader>
                    </Row>
                    <Row>
                        <Text>Atlanta</Text>
                        <IconButton>
                            <XCircleIcon />
                        </IconButton>
                    </Row>
                    <Row>
                        <Text>San Francisco</Text>
                        <IconButton>
                            <XCircleIcon />
                        </IconButton>
                    </Row>
                    <Row>
                        <Text>San Francisco</Text>
                        <IconButton>
                            <XCircleIcon />
                        </IconButton>
                    </Row>
                </Section>
                <Section>
                    <Row>
                        <SubHeader>Infection Deck</SubHeader>
                    </Row>
                    <Row>
                        <Text>Atlanta</Text>
                        <IconButton>
                            <CircleIcon />
                        </IconButton>
                    </Row>
                </Section>
                <Section>
                    <Row>
                        <Text>Washington D.C.</Text>
                        <IconButton>
                            <CircleIcon />
                        </IconButton>
                    </Row>
                    <Row>
                        <Text>Washington D.C</Text>
                        <IconButton>
                            <CircleIcon />
                        </IconButton>
                    </Row>
                </Section>
            </Main>
            <BottomButton>Skip Infection</BottomButton>
        </React.Fragment>
    );
};

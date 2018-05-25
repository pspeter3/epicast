import * as React from "react";
import { BottomButton, IconButton } from "../theme/buttons";
import { CircleIcon, TargetIcon } from "../theme/icons";
import { Checkbox } from "../theme/inputs";
import { Main, Row, Section } from "../theme/layout";
import { Text } from "../theme/typography";

export const Infection: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <Main>
                <Section>
                    <Row>
                        <Checkbox id="Atlanta" checked disabled />
                        <Text>Atlanta</Text>
                    </Row>
                </Section>
                <Section>
                    <Row>
                        <IconButton>
                            <CircleIcon />
                        </IconButton>
                        <Text>Washington D.C.</Text>
                        <IconButton>
                            <TargetIcon />
                        </IconButton>
                    </Row>
                    <Row>
                        <IconButton>
                            <CircleIcon />
                        </IconButton>
                        <Text>Washington D.C</Text>
                        <IconButton>
                            <TargetIcon />
                        </IconButton>
                    </Row>
                </Section>
            </Main>
            <BottomButton>Skip Infection</BottomButton>
        </React.Fragment>
    );
};

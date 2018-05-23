import * as React from "react";
import { BottomButton, IconButton, SubHeaderButton } from "../theme/buttons";
import { MinusCircleIcon, PlusCircleIcon } from "../theme/icons";
import { NumericInput } from "../theme/inputs";
import { Main, Row, Section } from "../theme/layout";
import { SubHeader, Text } from "../theme/typography";

export const Settings: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <Section>
                <Row>
                    <Text>Played Deck Size</Text>
                    <IconButton>
                        <MinusCircleIcon />
                    </IconButton>
                    <NumericInput value={60} />
                    <IconButton>
                        <PlusCircleIcon />
                    </IconButton>
                </Row>
                <Row>
                    <Text>Epidemic Count</Text>
                    <IconButton>
                        <MinusCircleIcon />
                    </IconButton>
                    <NumericInput value={6} />
                    <IconButton>
                        <PlusCircleIcon />
                    </IconButton>
                </Row>
            </Section>
            <Row>
                <SubHeader>Infection Deck</SubHeader>
                <SubHeaderButton>Add City</SubHeaderButton>
            </Row>
            <Main>
                <Section>
                    <Row>
                        <Text>San Francisco</Text>
                        <IconButton>
                            <MinusCircleIcon />
                        </IconButton>
                        <NumericInput value={2} />
                        <IconButton>
                            <PlusCircleIcon />
                        </IconButton>
                    </Row>
                </Section>
            </Main>
            <BottomButton>Save</BottomButton>
        </React.Fragment>
    );
};

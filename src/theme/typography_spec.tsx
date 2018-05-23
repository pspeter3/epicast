import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { Header, SubHeader, Text, Title } from "./typography";

describe("Typography", () => {
    snapshotSuite("Title", () => <Title>Epidemia</Title>);
    snapshotSuite("Header", () => <Header>Epidemic Percentage</Header>);
    snapshotSuite("SubHeader", () => <SubHeader>Discard Pile</SubHeader>);
    snapshotSuite("Text", () => <Text>San Francisco</Text>);
});

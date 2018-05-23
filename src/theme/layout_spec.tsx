import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { AppBar, Main, Row, Section } from "./layout";

describe("Layout", () => {
    snapshotSuite("AppBar", () => <AppBar />);
    snapshotSuite("Main", () => <Main />);
    snapshotSuite("Section", () => <Section />);
    snapshotSuite("Row", () => <Row />);
});

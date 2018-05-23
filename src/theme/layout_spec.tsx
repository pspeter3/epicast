import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { AppBar, Main, Row, Tile } from "./layout";

describe("Layout", () => {
    snapshotSuite("AppBar", () => <AppBar />);
    snapshotSuite("Main", () => <Main />);
    snapshotSuite("Tile", () => <Tile />);
    snapshotSuite("Row", () => <Row />);
});

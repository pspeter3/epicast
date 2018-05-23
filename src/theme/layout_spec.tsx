import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { Main, Row, Tile } from "./layout";

describe("Layout", () => {
    snapshotSuite("Tile", () => <Tile />);
    snapshotSuite("Row", () => <Row />);
    snapshotSuite("Main", () => <Main />);
});

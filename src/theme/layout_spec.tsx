import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { Tile, Row, Main  } from "./layout";

describe("Layout", () => {
    snapshotSuite("Tile", () => <Tile/>);
    snapshotSuite("Row", () => <Row/>);
    snapshotSuite("Main", () => <Main/>);
});

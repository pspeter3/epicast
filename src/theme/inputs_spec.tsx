import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { NumericInput } from "./inputs";

describe("Inputs", () => {
    snapshotSuite("NumericInput", () => <NumericInput value={1} />);
});

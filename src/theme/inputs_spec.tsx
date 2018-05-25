import * as React from "react";
import { snapshot, snapshotSuite } from "../util/snapshot";
import { Checkbox, NumericInput } from "./inputs";

describe("Inputs", () => {
    snapshotSuite("NumericInput", () => <NumericInput value={1} />);

    describe("Checkbox", () => {
        it("should match snapshot for unchecked", snapshot(() => <Checkbox id="test" />));
        it(
            "should match snapshot for checked",
            snapshot(() => <Checkbox id="test" aria-checked={true} />),
        );
        it("should match snapshot for disabled", snapshot(() => <Checkbox id="test" disabled />));
    });
});

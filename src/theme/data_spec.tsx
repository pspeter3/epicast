import * as React from "react";
import { snapshot } from "../util/snapshot";
import { Meter, Percentage } from "./data";

describe("Data", () => {
    describe("Meter", () => {
        it("should match snapshot", snapshot(() => <Meter value={0.5} />));
        it("should match active snapshot", snapshot(() => <Meter active value={0.5} />));
    });

    describe("Percentage", () => {
        it("should match snapshot", snapshot(() => <Percentage value={0.5} />));
        it("should match rounded snapshot", snapshot(() => <Percentage value={0.502} />));
    });
});

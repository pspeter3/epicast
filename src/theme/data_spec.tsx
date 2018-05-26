import * as React from "react";
import { snapshot } from "../util/snapshot";
import { Meter, Numeric, Percentage } from "./data";

describe("Data", () => {
    describe("Meter", () => {
        it("should match snapshot", snapshot(() => <Meter value={0.5} />));
        it("should match active snapshot", snapshot(() => <Meter active value={0.5} />));
    });

    describe("Numeric", () => {
        it("should match snapshot", snapshot(() => <Numeric value={0.5} />));
        it("should match rounded snapshot", snapshot(() => <Numeric value={0.502} />));
    });

    describe("Percentage", () => {
        it("should match snapshot", snapshot(() => <Percentage value={0.5} />));
        it("should match rounded snapshot", snapshot(() => <Percentage value={0.502} />));
    });
});

import * as React from "react";
import { MemoryRouter } from "react-router";
import { snapshot } from "../util/snapshot";
import { AppBar, AppBarIcon, AppBarTab } from "./appbar";

describe("AppBar", () => {
    it("should have AppBar match snapshot", snapshot(() => <AppBar />));

    it(
        "should have AppBarIcon match snapshot",
        snapshot(() => (
            <MemoryRouter>
                <AppBarIcon to="/" />
            </MemoryRouter>
        )),
    );

    it(
        "should have AppBarTab match snapshot",
        snapshot(() => (
            <MemoryRouter>
                <AppBarTab to="/" />
            </MemoryRouter>
        )),
    );
});

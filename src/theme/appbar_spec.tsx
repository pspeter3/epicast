import * as React from "react";
import { MemoryRouter } from "react-router";
import { snapshot } from "../util/snapshot";
import { AppBar, AppBarIcon, AppBarTab, AppBarTitle } from "./appbar";

describe("AppBar", () => {
    const components = {
        AppBar,
        AppBarTitle,
    };
    Object.keys(components).forEach(key => {
        const Component = components[key as keyof typeof components];
        it(`should have ${key} match snapshot`, snapshot(() => <Component />));
    });

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

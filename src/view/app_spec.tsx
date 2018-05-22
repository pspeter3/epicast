import * as React from "react";
import { MemoryRouter } from "react-router";
import { snapshot } from "../util/snapshot";
import { App } from "./app";

describe("App", () => {
    it(
        "should match snapshot",
        snapshot(() => (
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )),
    );
});

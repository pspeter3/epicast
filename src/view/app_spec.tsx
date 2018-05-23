import * as React from "react";
import { MemoryRouter } from "react-router";
import { snapshotSuite } from "../util/snapshot";
import { App } from "./app";

snapshotSuite("App", () => (
    <MemoryRouter>
        <App />
    </MemoryRouter>
));

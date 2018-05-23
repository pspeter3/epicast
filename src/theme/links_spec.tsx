import * as React from "react";
import { MemoryRouter } from "react-router";
import { snapshotSuite } from "../util/snapshot";
import { SettingsIcon } from "./icons";
import { IconLink, TabLink } from "./links";

describe("Links", () => {
    snapshotSuite("IconLink", () => (
        <MemoryRouter>
            <IconLink to="/">
                <SettingsIcon />
            </IconLink>
        </MemoryRouter>
    ));
    snapshotSuite("TabLink", () => (
        <MemoryRouter>
            <TabLink to="/">
                <SettingsIcon />
            </TabLink>
        </MemoryRouter>
    ));
});

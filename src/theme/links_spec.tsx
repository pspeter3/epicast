import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { SettingsIcon } from "./icons";
import { IconLink, TabLink } from "./links";

describe("Links", () => {
    snapshotSuite("IconLink", () => (
        <IconLink to="/">
            <SettingsIcon />
        </IconLink>
    ));
    snapshotSuite("TabLink", () => (
        <TabLink to="/">
            <SettingsIcon />
        </TabLink>
    ));
});

import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { IconLink, TabLink } from "./links";

describe("Links", () => {
    snapshotSuite("IconLink", () => <IconLink to="/" />);
    snapshotSuite("TabLink", () => <TabLink to="/" />);
});

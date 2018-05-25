import * as React from "react";
import { snapshotSuite } from "../../util/snapshot";
import { Dashboard } from "./dashboard";

snapshotSuite("Dashboard", () => (
    <Dashboard game={{ player: [8], turns: 0, epidemics: 0, discard: {}, infection: [] }} />
));

import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { Dashboard } from "./dashboard";

snapshotSuite("Dashboard", () => <Dashboard />);

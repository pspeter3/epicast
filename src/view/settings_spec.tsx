import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { Settings } from "./settings";

snapshotSuite("Settings", () => <Settings />);

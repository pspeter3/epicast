import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { App } from "./app";

snapshotSuite("App", () => <App />);

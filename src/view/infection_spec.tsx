import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { Infection } from "./infection";

snapshotSuite("Infection", () => <Infection />);

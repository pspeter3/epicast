import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { Discard } from "./discard";

snapshotSuite("Discard", () => <Discard />);

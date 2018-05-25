import * as React from "react";
import { snapshotSuite } from "../../util/snapshot";
import { Discard } from "./discard";

snapshotSuite("Discard", () => (
    <Discard discard={{ "San Francisco": 2, "Los Angeles": 1 }} onRemove={jest.fn()} />
));

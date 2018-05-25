import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { BottomButton, IconButton, SubHeaderButton } from "./buttons";

describe("Button", () => {
    snapshotSuite("IconButton", () => <IconButton />);
    snapshotSuite("BottomButton", () => <BottomButton>Save</BottomButton>);
    snapshotSuite("SubHeaderButton", () => <SubHeaderButton>Add</SubHeaderButton>);
});

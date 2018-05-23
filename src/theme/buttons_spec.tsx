import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { BottomButton, IconButton, SubHeaderButton } from "./buttons";
import { RotateCwwIcon } from "./icons";

describe("Button", () => {
    snapshotSuite("IconButton", () => (
        <IconButton>
            <RotateCwwIcon />
        </IconButton>
    ));
    snapshotSuite("BottomButton", () => <BottomButton>Save</BottomButton>);
    snapshotSuite("SubHeaderButton", () => <SubHeaderButton>Add</SubHeaderButton>);
});

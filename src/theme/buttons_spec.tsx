import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import { IconButton, PrimaryButton, SubHeaderButton } from "./buttons";

describe("Button", () => {
    snapshotSuite("IconButton", () => <IconButton />);
    snapshotSuite("PrimaryButton", () => <PrimaryButton>Save</PrimaryButton>);
    snapshotSuite("SubHeaderButton", () => <SubHeaderButton>Add</SubHeaderButton>);
});

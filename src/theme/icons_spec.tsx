import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import {
    CheckCircleIcon,
    CircleIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    RotateCwwIcon,
    SettingsIcon,
    TargetIcon,
    TrashIcon,
} from "./icons";

describe("icons", () => {
    snapshotSuite("CheckCircleIcon", () => <CheckCircleIcon />);
    snapshotSuite("CircleIcon", () => <CircleIcon />);
    snapshotSuite("MinusCircleIcon", () => <MinusCircleIcon />);
    snapshotSuite("PlusCircleIcon", () => <PlusCircleIcon />);
    snapshotSuite("RotateCwwIcon", () => <RotateCwwIcon />);
    snapshotSuite("SettingsIcon", () => <SettingsIcon />);
    snapshotSuite("TargetIcon", () => <TargetIcon />);
    snapshotSuite("TrashIcon", () => <TrashIcon />);
});

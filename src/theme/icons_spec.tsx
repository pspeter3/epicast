import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import {
    CheckCircleIcon,
    CircleIcon,
    CornerUpLeftIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    SettingsIcon,
    TargetIcon,
    TrashIcon,
} from "./icons";

describe("icons", () => {
    snapshotSuite("CheckCircleIcon", () => <CheckCircleIcon />);
    snapshotSuite("CircleIcon", () => <CircleIcon />);
    snapshotSuite("CornerUpLeftIcon", () => <CornerUpLeftIcon />);
    snapshotSuite("MinusCircleIcon", () => <MinusCircleIcon />);
    snapshotSuite("PlusCircleIcon", () => <PlusCircleIcon />);
    snapshotSuite("SettingsIcon", () => <SettingsIcon />);
    snapshotSuite("TargetIcon", () => <TargetIcon />);
    snapshotSuite("TrashIcon", () => <TrashIcon />);
});

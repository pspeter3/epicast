import * as React from "react";
import { snapshotSuite } from "../util/snapshot";
import {
    CheckCircleIcon,
    CircleIcon,
    CornerUpLeftIcon,
    EditIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    TargetIcon,
    TrashIcon,
} from "./icons";

describe("icons", () => {
    snapshotSuite("CheckCircleIcon", () => <CheckCircleIcon />);
    snapshotSuite("CircleIcon", () => <CircleIcon />);
    snapshotSuite("CornerUpLeftIcon", () => <CornerUpLeftIcon />);
    snapshotSuite("EditIcon", () => <EditIcon />);
    snapshotSuite("MinusCircleIcon", () => <MinusCircleIcon />);
    snapshotSuite("PlusCircleIcon", () => <PlusCircleIcon />);
    snapshotSuite("TargetIcon", () => <TargetIcon />);
    snapshotSuite("TrashIcon", () => <TrashIcon />);
});

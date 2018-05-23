import * as React from "react";
import { snapshot } from "../util/snapshot";
import { AppBar } from "./appbar";

describe("AppBar", () => {
    it("should have AppBar match snapshot", snapshot(() => <AppBar />));
});

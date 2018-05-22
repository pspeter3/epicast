import * as React from "react";
import { snapshot } from "../util/snapshot";
import { Dashboard } from "./dashboard";

describe("Dashboard", () => {
    it("should match snapshot", snapshot(() => <Dashboard />));
});

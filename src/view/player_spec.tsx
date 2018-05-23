import * as React from "react";
import { snapshot } from "../util/snapshot";
import { Player } from "./player";

describe("Player", () => {
    it("should match snapshot", snapshot(() => <Player />));
});

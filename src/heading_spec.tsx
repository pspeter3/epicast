import * as React from "react";
import TestRenderer from "react-test-renderer";
import { Heading } from "./heading";

describe("Heading", () => {
    it("should match the snapshot", () => {
        const component = TestRenderer.create(<Heading />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

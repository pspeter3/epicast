import * as React from "react";
import TestRenderer from "react-test-renderer";

export const snapshot = (factory: () => React.ReactElement<any>): (() => void) => {
    return () => {
        const component = TestRenderer.create(factory());
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    };
};

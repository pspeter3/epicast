import * as React from "react";
import TestRenderer from "react-test-renderer";

export type Factory = () => React.ReactElement<any>;

export const snapshot = (factory: Factory): (() => void) => {
    return () => {
        const component = TestRenderer.create(factory());
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    };
};

export const snapshotSuite = (name: string, factory: Factory): void => {
    describe(name, () => {
        it("should match snapshot", snapshot(factory));
    });
};

import { shallow } from "enzyme";
import * as React from "react";

export type Factory = () => React.ReactElement<any>;

export const snapshot = (factory: Factory): (() => void) => {
    return () => {
        expect(shallow(factory())).toMatchSnapshot();
    };
};

export const snapshotSuite = (name: string, factory: Factory): void => {
    describe(name, () => {
        it("should match snapshot", snapshot(factory));
    });
};

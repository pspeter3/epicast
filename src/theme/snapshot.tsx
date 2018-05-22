import * as React from "react";
import TestRenderer from "react-test-renderer";

export const snapshot = (name: string, SFC: React.SFC<{}>): void => {
    describe(name, () => {
        it(`should match snapshot`, () => {
            const component = TestRenderer.create(<SFC>Snapshot</SFC>);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
};

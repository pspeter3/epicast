import { shallow } from "enzyme";
import * as React from "react";
import { IconButton } from "../../theme/buttons";
import { Checkbox } from "../../theme/inputs";
import { snapshot } from "../../util/snapshot";
import { InfectionRow } from "./infection_row";

describe("InfectionRow", () => {
    describe("snapshots", () => {
        it(
            "should match default snapshot",
            snapshot(() => <InfectionRow city="Test" onToggle={jest.fn()} />),
        );
        it(
            "should match checked snapshot",
            snapshot(() => <InfectionRow city="Test" onToggle={jest.fn()} />),
        );
        it(
            "should match epidemic snapshot",
            snapshot(() => (
                <InfectionRow
                    city="Test"
                    checked={false}
                    onToggle={jest.fn()}
                    onEpidemic={jest.fn()}
                />
            )),
        );
    });

    describe("handlers", () => {
        it("should trigger change", () => {
            const city = "San Francisco";
            const onToggle = jest.fn();
            const tree = shallow(<InfectionRow city={city} onToggle={onToggle} />);
            tree.find(Checkbox).simulate("click");
            expect(onToggle).toHaveBeenCalledWith(city);
        });

        it("should trigger epidemic", () => {
            const city = "San Francisco";
            const onEpidemic = jest.fn();
            const tree = shallow(
                <InfectionRow city={city} onToggle={jest.fn()} onEpidemic={onEpidemic} />,
            );
            tree.find(IconButton).simulate("click");
            expect(onEpidemic).toHaveBeenCalledWith(city);
        });
    });
});

import { shallow } from "enzyme";
import * as React from "react";
import { snapshot } from "../../util/snapshot";
import { InfectionRow } from "./infection_row";
import { InfectionSection } from "./infection_section";

const PRIMARY = "San Francisco";
const SECONDARY = "Los Angeles";

describe("InfectionSection", () => {
    describe("snapshots", () => {
        it(
            "should match snapshot disabled middle section",
            snapshot(() => (
                <InfectionSection index={0} stack={{ [PRIMARY]: 2, [SECONDARY]: 1 }} checked={{}} />
            )),
        );
        it(
            "should match snapshot with checked cities",
            snapshot(() => (
                <InfectionSection
                    index={0}
                    stack={{ [PRIMARY]: 2, [SECONDARY]: 1 }}
                    checked={{ [PRIMARY]: 1 }}
                    onToggle={jest.fn()}
                />
            )),
        );
        it(
            "should match snapshot with disabled section with epidemic",
            snapshot(() => (
                <InfectionSection
                    index={0}
                    stack={{ [PRIMARY]: 2, [SECONDARY]: 1 }}
                    checked={{}}
                    onEpidemic={jest.fn()}
                />
            )),
        );
        it(
            "should match snapshot with epidemic",
            snapshot(() => (
                <InfectionSection
                    index={0}
                    stack={{ [PRIMARY]: 2, [SECONDARY]: 1 }}
                    checked={{}}
                    onToggle={jest.fn()}
                    onEpidemic={jest.fn()}
                />
            )),
        );
    });

    describe("handlers", () => {
        it("should handle toggle", () => {
            const onToggle = jest.fn();
            const tree = shallow(
                <InfectionSection
                    index={0}
                    stack={{ [PRIMARY]: 2, [SECONDARY]: 1 }}
                    checked={{}}
                    onToggle={onToggle}
                />,
            );
            tree
                .find(InfectionRow)
                .first()
                .props().onToggle!(PRIMARY);
            expect(onToggle).toHaveBeenCalledWith(0, PRIMARY);
        });
    });
});

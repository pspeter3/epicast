import { shallow } from "enzyme";
import * as React from "react";
import { BottomButton } from "../../theme/buttons";
import { snapshot } from "../../util/snapshot";
import { Infection } from "./infection";
import { InfectionSection } from "./infection_section";

const PRIMARY = "San Francisco";
const SECONDARY = "Los Angeles";

describe("Infection", () => {
    describe("snapshots", () => {
        it(
            "should match snapshot",
            snapshot(() => (
                <Infection
                    deck={[{ [PRIMARY]: 1 }, { [PRIMARY]: 2, [SECONDARY]: 2 }]}
                    onInfect={jest.fn()}
                    onEpidemic={jest.fn()}
                />
            )),
        );

        it("should match selected snapshot", () => {
            const tree = shallow(
                <Infection
                    deck={[{ [PRIMARY]: 1 }, { [PRIMARY]: 2, [SECONDARY]: 2 }]}
                    onInfect={jest.fn()}
                    onEpidemic={jest.fn()}
                />,
            );
            tree
                .find(InfectionSection)
                .first()
                .prop("onToggle")(1, PRIMARY);
            expect(tree).toMatchSnapshot();
        });
    });

    describe("handlers", () => {
        it("should handle skipping infection", () => {
            const onInfect = jest.fn();
            const tree = shallow(
                <Infection
                    deck={[{ [PRIMARY]: 1 }, { [PRIMARY]: 2, [SECONDARY]: 2 }]}
                    onInfect={onInfect}
                    onEpidemic={jest.fn()}
                />,
            );
            tree.find(BottomButton).simulate("click");
            expect(onInfect).toHaveBeenCalledWith([]);
        });

        it("should handle selection", () => {
            const onInfect = jest.fn();
            const tree = shallow(
                <Infection
                    deck={[{ [PRIMARY]: 1 }, { [PRIMARY]: 2, [SECONDARY]: 2 }]}
                    onInfect={onInfect}
                    onEpidemic={jest.fn()}
                />,
            );
            tree
                .find(InfectionSection)
                .first()
                .prop("onToggle")(1, PRIMARY);
            tree
                .find(InfectionSection)
                .last()
                .prop("onToggle")(0, PRIMARY);
            tree.find(BottomButton).simulate("click");
            expect(onInfect).toHaveBeenCalledWith([{ [PRIMARY]: 1 }, { [PRIMARY]: 1 }]);
            expect(tree.state("selected")).toEqual([]);
        });
    });
});

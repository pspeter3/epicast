import { shallow } from "enzyme";
import * as React from "react";
import { IconButton } from "../../theme/buttons";
import { NumericInput } from "../../theme/inputs";
import { snapshot } from "../../util/snapshot";
import { SettingsRow } from "./settings_row";

describe("SettingsRow", () => {
    it(
        "should match snapshot with name",
        snapshot(() => (
            <SettingsRow
                name="name"
                value={1}
                onDecrement={jest.fn()}
                onChange={jest.fn()}
                onIncrement={jest.fn()}
            />
        )),
    );

    it(
        "should match snapshot with displayName",
        snapshot(() => (
            <SettingsRow
                name="name"
                displayName="Display Name"
                value={1}
                onDecrement={jest.fn()}
                onChange={jest.fn()}
                onIncrement={jest.fn()}
            />
        )),
    );

    it("should handle decrement", () => {
        const name = "name";
        const onDecrement = jest.fn();
        const tree = shallow(
            <SettingsRow
                name={name}
                value={1}
                onDecrement={onDecrement}
                onChange={jest.fn()}
                onIncrement={jest.fn()}
            />,
        );
        tree
            .find(IconButton)
            .first()
            .simulate("click");
        expect(onDecrement).toHaveBeenCalledWith(name);
    });

    it("should handle change", () => {
        const name = "name";
        const value = 3;
        const onChange = jest.fn();
        const tree = shallow(
            <SettingsRow
                name={name}
                value={1}
                onDecrement={jest.fn()}
                onChange={onChange}
                onIncrement={jest.fn()}
            />,
        );
        tree.find(NumericInput).simulate("change", { target: { value: value.toString() } });
        expect(onChange).toHaveBeenCalledWith(name, value);
    });

    it("should handle empthy change", () => {
        const name = "name";
        const onChange = jest.fn();
        const tree = shallow(
            <SettingsRow
                name={name}
                value={1}
                onDecrement={jest.fn()}
                onChange={onChange}
                onIncrement={jest.fn()}
            />,
        );
        tree.find(NumericInput).simulate("change", { target: { value: "" } });
        expect(onChange).not.toHaveBeenCalled();
    });

    it("should handle increment", () => {
        const name = "name";
        const onIncrement = jest.fn();
        const tree = shallow(
            <SettingsRow
                name={name}
                value={1}
                onDecrement={jest.fn()}
                onChange={jest.fn()}
                onIncrement={onIncrement}
            />,
        );
        tree
            .find(IconButton)
            .last()
            .simulate("click");
        expect(onIncrement).toHaveBeenCalledWith(name);
    });
});

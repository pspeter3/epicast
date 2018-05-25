import { shallow } from "enzyme";
import * as React from "react";
import { IconButton } from "../../theme/buttons";
import { snapshot } from "../../util/snapshot";
import { DiscardRow } from "./discard_row";

describe("DiscardRow", () => {
    const createProps = () => {
        return {
            city: "San Francisco",
            onRemove: jest.fn(),
        };
    };

    it("should match snapshot", snapshot(() => <DiscardRow {...createProps()} />));

    it("should handle click", () => {
        const props = createProps();
        const tree = shallow(<DiscardRow {...props} />);
        tree.find(IconButton).simulate("click");
        expect(props.onRemove).toHaveBeenCalledWith(props.city);
    });
});

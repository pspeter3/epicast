import { shallow } from "enzyme";
import * as React from "react";
import { BottomButton, SubHeaderButton } from "../../theme/buttons";
import { snapshot } from "../../util/snapshot";
import { Settings } from "./settings";

describe("Settings", () => {
    const createProps = () => {
        return {
            config: {
                cards: 0,
                cities: {},
                epidemics: 0,
            },
            onConfigure: jest.fn(),
            services: {
                dialog: {
                    alert: jest.fn(),
                    confirm: jest.fn(),
                    prompt: jest.fn(),
                },
            },
        };
    };

    it("should match snapshot", snapshot(() => <Settings {...createProps()} />));

    describe("counters", () => {
        const suite = (name: string, displayName: string) => {
            describe(name, () => {
                it("should handle displayName", () => {
                    const props = createProps();
                    const tree = shallow(<Settings {...props} />);
                    const row = tree.find({ name });
                    expect(row.prop("displayName")).toBe(displayName);
                });

                it("should handle decrement", () => {
                    const props = createProps();
                    const tree = shallow(<Settings {...props} />);
                    const row = tree.find({ name });
                    row.prop("onDecrement")(name);
                    expect(tree.state().config[name]).toBe(-1);
                });

                it("should handle change", () => {
                    const props = createProps();
                    const tree = shallow(<Settings {...props} />);
                    const row = tree.find({ name });
                    const value = 8;
                    row.prop("onChange")(name, value);
                    expect(tree.state().config[name]).toBe(value);
                });

                it("should handle increment", () => {
                    const props = createProps();
                    const tree = shallow(<Settings {...props} />);
                    const row = tree.find({ name });
                    row.prop("onIncrement")(name);
                    expect(tree.state().config[name]).toBe(1);
                });
            });
        };

        suite("cards", "Player Deck Size");
        suite("epidemics", "Epidemic Count");
    });

    describe("infection deck", () => {
        it("should handle adding a city", () => {
            const props = createProps();
            const tree = shallow(<Settings {...props} />);
            const button = tree.find(SubHeaderButton);
            const city = "San Francisco";
            props.services.dialog.prompt.mockReturnValue(city);
            button.simulate("click");
            expect(tree.state("config").cities).toEqual({
                [city]: 1,
            });
        });

        it("should handle adding null", () => {
            const props = createProps();
            const tree = shallow(<Settings {...props} />);
            const button = tree.find(SubHeaderButton);
            props.services.dialog.prompt.mockReturnValue(null);
            button.simulate("click");
            expect(tree.state("config").cities).toEqual({});
        });

        it("should decrement a city", () => {
            const props = createProps();
            const tree = shallow(<Settings {...props} />);
            const city = "San Francisco";
            tree.setState({
                config: {
                    ...tree.state("config"),
                    cities: {
                        [city]: 2,
                    },
                },
            });
            tree.find({ name: city }).prop("onDecrement")(city);
            expect(tree.state("config").cities).toEqual({
                [city]: 1,
            });
        });

        it("should remove a city if the city falls to zero", () => {
            const props = createProps();
            const tree = shallow(<Settings {...props} />);
            const city = "San Francisco";
            tree.setState({
                config: {
                    ...tree.state("config"),
                    cities: {
                        [city]: 1,
                    },
                },
            });
            tree.find({ name: city }).prop("onDecrement")(city);
            expect(tree.state("config").cities).toEqual({});
        });

        it("should handle setting a city", () => {
            const props = createProps();
            const tree = shallow(<Settings {...props} />);
            const city = "San Francisco";
            tree.setState({
                config: {
                    ...tree.state("config"),
                    cities: {
                        [city]: 1,
                    },
                },
            });
            tree.find({ name: city }).prop("onChange")(city, 8);
            expect(tree.state("config").cities).toEqual({
                [city]: 8,
            });
        });

        it("should increment a city", () => {
            const props = createProps();
            const tree = shallow(<Settings {...props} />);
            const city = "San Francisco";
            tree.setState({
                config: {
                    ...tree.state("config"),
                    cities: {
                        [city]: 1,
                    },
                },
            });
            tree.find({ name: city }).prop("onIncrement")(city);
            expect(tree.state("config").cities).toEqual({
                [city]: 2,
            });
        });
    });

    describe("save", () => {
        describe("invalid state", () => {
            it("should reject if cards are zero", () => {
                const props = createProps();
                const tree = shallow(<Settings {...props} />);
                tree.find(BottomButton).simulate("click");
                expect(props.services.dialog.alert).toHaveBeenCalledWith("Invalid State");
                expect(props.onConfigure).not.toHaveBeenCalled();
            });

            it("should reject if epidemics are zero", () => {
                const props = createProps();
                const tree = shallow(<Settings {...props} />);
                tree.setState({
                    config: {
                        ...tree.state("config"),
                        cards: 1,
                    },
                });
                tree.find(BottomButton).simulate("click");
                expect(props.services.dialog.alert).toHaveBeenCalledWith("Invalid State");
                expect(props.onConfigure).not.toHaveBeenCalled();
            });

            it("should reject if cards are less than epidemics", () => {
                const props = createProps();
                const tree = shallow(<Settings {...props} />);
                tree.setState({
                    config: {
                        ...tree.state("config"),
                        cards: 1,
                        epidemics: 2,
                    },
                });
                tree.find(BottomButton).simulate("click");
                expect(props.services.dialog.alert).toHaveBeenCalledWith("Invalid State");
                expect(props.onConfigure).not.toHaveBeenCalled();
            });

            it("should reject if cities are empty", () => {
                const props = createProps();
                const tree = shallow(<Settings {...props} />);
                tree.setState({
                    config: {
                        ...tree.state("config"),
                        cards: 3,
                        epidemics: 2,
                    },
                });
                tree.find(BottomButton).simulate("click");
                expect(props.services.dialog.alert).toHaveBeenCalledWith("Invalid State");
                expect(props.onConfigure).not.toHaveBeenCalled();
            });
        });

        it("should not save on cancel", () => {
            const props = createProps();
            const tree = shallow(<Settings {...props} />);
            tree.setState({
                config: {
                    cards: 3,
                    cities: {
                        "San Francisco": 1,
                    },
                    epidemics: 2,
                },
            });
            props.services.dialog.confirm.mockReturnValue(false);
            tree.find(BottomButton).simulate("click");
            expect(props.services.dialog.confirm).toHaveBeenCalledWith("Reset Game State?");
            expect(props.onConfigure).not.toHaveBeenCalled();
        });

        it("should save", () => {
            const props = createProps();
            const tree = shallow(<Settings {...props} />);
            tree.setState({
                config: {
                    cards: 3,
                    cities: {
                        "San Francisco": 1,
                    },
                    epidemics: 2,
                },
            });
            props.services.dialog.confirm.mockReturnValue(true);
            tree.find(BottomButton).simulate("click");
            expect(props.services.dialog.confirm).toHaveBeenCalledWith("Reset Game State?");
            expect(props.onConfigure).toHaveBeenCalledWith(tree.state("config"));
        });
    });
});

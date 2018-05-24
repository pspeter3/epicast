import { difference, union, unit, value } from "./stacks";

const PRIMARY = "San Francisco";
const SECONDARY = "Los Angeles";

describe("stacks", () => {
    describe("unit", () => {
        it("should create a stack of 1", () => {
            expect(unit(PRIMARY)).toEqual({
                [PRIMARY]: 1,
            });
        });
    });

    describe("value", () => {
        it("should return the value", () => {
            expect(value({ [PRIMARY]: 1 }, PRIMARY)).toBe(1);
        });

        it("should return 0 for missing keys", () => {
            expect(value({ [PRIMARY]: 1 }, SECONDARY)).toBe(0);
        });
    });

    describe("union", () => {
        it("should merge keys", () => {
            expect(union({ [PRIMARY]: 1 }, { [PRIMARY]: 2 })).toEqual({ [PRIMARY]: 3 });
        });

        it("should add keys", () => {
            expect(union({ [PRIMARY]: 1 }, { [SECONDARY]: 1 })).toEqual({
                [PRIMARY]: 1,
                [SECONDARY]: 1,
            });
        });
    });

    describe("difference", () => {
        it("should merge keys", () => {
            expect(difference({ [PRIMARY]: 2 }, { [PRIMARY]: 1 })).toEqual({ [PRIMARY]: 1 });
        });

        it("should remove keys", () => {
            expect(difference({ [PRIMARY]: 1 }, { [PRIMARY]: 1 })).toEqual({});
        });

        it("should handle missing keys", () => {
            expect(difference({ [PRIMARY]: 1 }, { [SECONDARY]: 1 })).toEqual({ [PRIMARY]: 1 });
        });
    });
});

import { combinations, factorial, hypergeometric } from "./math";

describe("math", () => {
    describe("factorial", () => {
        it("should throw if less than zero", () => {
            expect(() => {
                factorial(-1);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should handle 0", () => {
            expect(factorial(0)).toBe(1);
        });

        it("should handle normal numbers", () => {
            expect(factorial(3)).toBe(6);
        });
    });

    describe("combinations", () => {
        it("should throw if k is less than n", () => {
            expect(() => {
                combinations(3, 5);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should handle normal numbers", () => {
            expect(combinations(3, 2)).toBe(3);
        });
    });

    describe("hypergeometric", () => {
        it("should throw if K is greater than N", () => {
            expect(() => {
                hypergeometric(0, 1, 1, 1);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should throw if k is greater than n", () => {
            expect(() => {
                hypergeometric(2, 2, 1, 2);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should throw if k is greater than K", () => {
            expect(() => {
                hypergeometric(1, 0, 1, 1);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should throw if n is greater than N", () => {
            expect(() => {
                hypergeometric(1, 1, 2, 1);
            }).toThrowErrorMatchingSnapshot();
        });

        it("should return the probability", () => {
            expect(hypergeometric(52, 4, 1, 1)).toBe(1 / 13);
        });
    });
});

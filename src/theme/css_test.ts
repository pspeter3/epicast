import { classNames, focusClass } from "./css";

describe("css", () => {
    describe("classNames", () => {
        it("should merge class names", () => {
            expect(classNames("foo", "bar")).toBe("foo bar");
        });
    });
    describe("focusClass", () => {
        it("should add a focus prefix", () => {
            expect(focusClass("foo")).toBe("focus:foo");
        });
    });
});

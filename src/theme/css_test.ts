import { classNames } from "./css";

describe("css", () => {
    describe("classNames", () => {
        it("should merge class names", () => {
            expect(classNames("foo", "bar")).toBe("foo bar");
        });
    });
});

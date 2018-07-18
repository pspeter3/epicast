import { total, unique } from "./decks";

const PRIMARY = "San Francisco";
const SECONDARY = "Los Angeles";

describe("decks", () => {
    describe("unique", () => {
        it("should return the unique cards", () => {
            expect(
                unique([
                    { [PRIMARY]: 1 },
                    {
                        [PRIMARY]: 2,
                        [SECONDARY]: 1,
                    },
                ]),
            ).toEqual([PRIMARY, SECONDARY]);
        });
    });

    describe("total", () => {
        it("should return the exact count", () => {
            expect(
                total([
                    { [PRIMARY]: 1 },
                    {
                        [PRIMARY]: 2,
                        [SECONDARY]: 1,
                    },
                ]),
            ).toBe(4);
        });
    });
});

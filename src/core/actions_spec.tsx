import { epidemic, infect, remove } from "./actions";
import { Action, ActionName } from "./types";

const CITY = "San Francico";

describe("actions", () => {
    const singleCitySuite = (name: ActionName, factory: (city: string) => Action): void => {
        describe(name, () => {
            it("should have the correct name", () => {
                expect(factory(CITY).name).toBe(name);
            });

            it("should have the correct cities", () => {
                expect(factory(CITY).cities).toMatchObject({
                    [CITY]: 1,
                });
            });
        });
    };

    singleCitySuite("epidemic", epidemic);
    singleCitySuite("remove", remove);

    describe("infect", () => {
        const CITIES = { [CITY]: 2 };

        it("should have the correct name", () => {
            expect(infect(CITIES).name).toBe("infect");
        });

        it("should have the correct cities", () => {
            expect(infect(CITIES).cities).toBe(CITIES);
        });
    });
});

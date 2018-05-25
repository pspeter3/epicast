import { union } from "../util/stacks";
import { Config, Game } from "./types";
import { configure, epidemic, infect, remove } from "./updaters";

const PRIMARY = "San Francisco";
const SECONDARY = "Los Angeles";

const CONFIG: Config = {
    cards: 60,
    epidemics: 8,
    cities: {
        [PRIMARY]: 2,
        [SECONDARY]: 2,
    },
};

const init = () => {
    return configure(CONFIG);
};

describe("reducers", () => {
    describe("configure", () => {
        it("should configure the game", () => {
            expect(init()).toEqual({
                player: [9, 9, 9, 9, 8, 8, 8, 8],
                turns: 0,
                epidemics: 0,
                discard: {},
                infection: [CONFIG.cities],
            } as Game);
        });
    });

    describe("epidemic", () => {
        it("should increase the epidemic count", () => {
            expect(epidemic(init(), PRIMARY).epidemics).toBe(1);
        });

        it("should add the discard pile and the city to the deck", () => {
            const discard = { [PRIMARY]: 1 };
            const initial = init();
            const next = epidemic(
                {
                    ...initial,
                    discard,
                },
                PRIMARY,
            );
            expect(next.infection).toEqual([CONFIG.cities, union(discard, discard)]);
            expect(next.discard).toEqual({});
        });
    });

    describe("infect", () => {
        it("should add cities to the discard pile", () => {
            const cities = { [PRIMARY]: 1, [SECONDARY]: 1 };
            const next = infect(init(), [cities]);
            expect(next.discard).toEqual(cities);
        });

        it("should merge cities with the discard pile", () => {
            const discard = { [PRIMARY]: 1 };
            const cities = { [PRIMARY]: 1, [SECONDARY]: 1 };
            const initial = init();
            const next = infect(
                {
                    ...initial,
                    discard,
                },
                [cities],
            );
            expect(next.discard).toEqual(union(discard, cities));
        });

        it("should handle mulitple infections", () => {
            const initial = init();
            const next = infect(
                {
                    ...initial,
                    infection: initial.infection.concat([{ [PRIMARY]: 2 }, { [SECONDARY]: 1 }]),
                },
                [{ [PRIMARY]: 1 }, { [SECONDARY]: 1 }],
            );
            expect(next.infection).toEqual([CONFIG.cities, { [PRIMARY]: 1 }]);
        });
    });

    describe("remove", () => {
        it("should remove the card from the discard pile", () => {
            const discard = { [PRIMARY]: 1 };
            const initial = init();
            const next = remove(
                {
                    ...initial,
                    discard,
                },
                PRIMARY,
            );
            expect(next.discard).toEqual({});
        });
    });
});

import { difference, union } from "../util/stacks";
import { Config, Game } from "./types";
import { configure, epidemic, infect, remove, reset, undo, update } from "./updaters";

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
                    infection: [CONFIG.cities, discard],
                },
                PRIMARY,
            );
            expect(next.infection).toEqual([
                difference(CONFIG.cities, discard),
                discard,
                union(discard, discard),
            ]);
            expect(next.discard).toEqual({});
        });
    });

    describe("infect", () => {
        it("should add cities to the discard pile", () => {
            const cities = { [PRIMARY]: 1, [SECONDARY]: 1 };
            const next = infect(init(), cities);
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
                cities,
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
                { [PRIMARY]: 1, [SECONDARY]: 1 },
            );
            expect(next.infection).toEqual([CONFIG.cities, { [PRIMARY]: 1 }]);
        });

        it("should handle overflow", () => {
            const initial = init();
            const next = infect(
                {
                    ...initial,
                    discard: { [PRIMARY]: 2, [SECONDARY]: 1 },
                },
                { [PRIMARY]: 3, [SECONDARY]: 3 },
            );
            expect(next.discard).toEqual({ [PRIMARY]: 3, [SECONDARY]: 3 });
            expect(next.infection).toEqual([{ [PRIMARY]: 1 }]);
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

    describe("reset", () => {
        it("should create a new state", () => {
            expect(reset(CONFIG)).toEqual({
                config: CONFIG,
                games: [configure(CONFIG)],
            });
        });
    });

    describe("update", () => {
        it("should add a game", () => {
            expect(update(reset(CONFIG), epidemic(configure(CONFIG), PRIMARY))).toEqual({
                config: CONFIG,
                games: [configure(CONFIG), epidemic(configure(CONFIG), PRIMARY)],
            });
        });

        it("should not exceed 4 games", () => {
            let state = reset(CONFIG);
            for (let i = 0; i < 5; i++) {
                state = update(state, epidemic(configure(CONFIG), PRIMARY));
            }
            expect(state.games).toHaveLength(4);
        });
    });

    describe("undo", () => {
        it("should remove the last game", () => {
            const state = reset(CONFIG);
            expect(undo(update(state, epidemic(configure(CONFIG), PRIMARY)))).toEqual(state);
        });
    });
});

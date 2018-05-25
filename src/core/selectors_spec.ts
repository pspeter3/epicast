import { hypergeometric } from "../util/math";
import { epidemicForecast, gameForecast, infectionRate } from "./selectors";
import { Forecast, Game } from "./types";

describe("selectors", () => {
    describe("infectionRate", () => {
        it("should return the rate", () => {
            expect(
                infectionRate({
                    player: [7, 8],
                    turns: 0,
                    epidemics: 4,
                    discard: {},
                    infection: [],
                }),
            ).toBe(3);
        });
    });

    describe("epidemicForecast", () => {
        const game: Game = {
            player: [7, 8],
            turns: 0,
            epidemics: 0,
            discard: {},
            infection: [],
        };

        it("should predict the correct amount without epidemic", () => {
            expect(epidemicForecast(game)).toEqual([hypergeometric(7, 1, 2, 1)]);
        });

        it("should predict the correct amount with epidemic", () => {
            expect(
                epidemicForecast({
                    ...game,
                    epidemics: 1,
                }),
            ).toEqual([0]);
        });

        it("should predict the second stack", () => {
            expect(
                epidemicForecast({
                    ...game,
                    turns: 4,
                    epidemics: 1,
                }),
            ).toEqual([hypergeometric(7, 1, 2, 1)]);
        });

        it("should handle multiple epidemics", () => {
            expect(
                epidemicForecast({
                    ...game,
                    turns: 3,
                }),
            ).toEqual([1, hypergeometric(8, 1, 1, 1)]);
        });
    });

    describe("gameForecast", () => {
        it("should forecase the game", () => {
            expect(
                gameForecast({
                    player: [7, 8],
                    turns: 3,
                    epidemics: 0,
                    discard: {},
                    infection: [],
                }),
            ).toEqual({
                epidemics: 1 + hypergeometric(8, 1, 1, 1),
                cities: [],
            } as Forecast);
        });
    });
});

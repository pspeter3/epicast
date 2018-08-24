import { hypergeometric } from "../util/math";
import { epidemicForecast, gameForecast, infectionRate } from "./selectors";
import { Forecast, Game } from "./types";

const PRIMARY = "San Francisco";
const SECONDARY = "Los Angeles";

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
            expect(epidemicForecast(game)).toEqual({ safe: 0, risk: [hypergeometric(7, 1, 2, 1)] });
        });

        it("should predict the correct amount with epidemic", () => {
            expect(
                epidemicForecast({
                    ...game,
                    epidemics: 1,
                }),
            ).toEqual({ safe: 3, risk: [0] });
        });

        it("should predict the second stack", () => {
            expect(
                epidemicForecast({
                    ...game,
                    turns: 4,
                    epidemics: 1,
                }),
            ).toEqual({ safe: 0, risk: [hypergeometric(7, 1, 2, 1)] });
        });

        it("should handle multiple epidemics", () => {
            expect(
                epidemicForecast({
                    ...game,
                    turns: 3,
                }),
            ).toEqual({ safe: 0, risk: [1, hypergeometric(8, 1, 1, 1)] });
        });
    });

    describe("gameForecast", () => {
        it("should forecast multiple epidemics", () => {
            expect(
                gameForecast({
                    player: [7, 8],
                    turns: 3,
                    epidemics: 0,
                    discard: {},
                    infection: [
                        {
                            [PRIMARY]: 3,
                            [SECONDARY]: 2,
                        },
                    ],
                }),
            ).toEqual({
                remaining: 9,
                safe: 0,
                epidemics: 1 + hypergeometric(8, 1, 1, 1),
                cities: [
                    {
                        name: PRIMARY,
                        infections: hypergeometric(5, 3, 2, 2) * 2 + hypergeometric(5, 3, 2, 1),
                        epidemics:
                            3 / 5 +
                            (hypergeometric(8, 1, 1, 1) * 3) / 4 +
                            (hypergeometric(8, 1, 1, 1) * 2) / 4,
                    },
                    {
                        name: SECONDARY,
                        infections: hypergeometric(5, 2, 2, 2) * 2 + hypergeometric(5, 2, 2, 1),
                        epidemics:
                            2 / 5 +
                            (hypergeometric(8, 1, 1, 1) * 2) / 4 +
                            (hypergeometric(8, 1, 1, 1) * 1) / 4,
                    },
                ],
            } as Forecast);
        });

        it("should handle single cities in the infection deck", () => {
            expect(
                gameForecast({
                    player: [8],
                    turns: 0,
                    epidemics: 0,
                    discard: {},
                    infection: [
                        {
                            [PRIMARY]: 3,
                        },
                    ],
                }),
            ).toEqual({
                remaining: 8,
                safe: 0,
                epidemics: hypergeometric(8, 1, 2, 1),
                cities: [
                    {
                        name: PRIMARY,
                        infections: 2,
                        epidemics: hypergeometric(8, 1, 2, 1),
                    },
                ],
            } as Forecast);
        });

        it("should handle multiple cities in the infection deck", () => {
            expect(
                gameForecast({
                    player: [8],
                    turns: 0,
                    epidemics: 0,
                    discard: {},
                    infection: [
                        {
                            [PRIMARY]: 3,
                            [SECONDARY]: 2,
                        },
                    ],
                }),
            ).toEqual({
                remaining: 8,
                safe: 0,
                epidemics: hypergeometric(8, 1, 2, 1),
                cities: [
                    {
                        name: PRIMARY,
                        infections: hypergeometric(5, 3, 2, 2) * 2 + hypergeometric(5, 3, 2, 1),
                        epidemics: (hypergeometric(8, 1, 2, 1) * 3) / 5,
                    },
                    {
                        name: SECONDARY,
                        infections: hypergeometric(5, 2, 2, 2) * 2 + hypergeometric(5, 2, 2, 1),
                        epidemics: (hypergeometric(8, 1, 2, 1) * 2) / 5,
                    },
                ],
            } as Forecast);
        });

        it("should handle multiple stacks in the infection deck", () => {
            expect(
                gameForecast({
                    player: [8],
                    turns: 0,
                    epidemics: 0,
                    discard: {},
                    infection: [
                        {
                            [PRIMARY]: 1,
                        },
                        {
                            [SECONDARY]: 1,
                        },
                    ],
                }),
            ).toEqual({
                remaining: 8,
                safe: 0,
                epidemics: hypergeometric(8, 1, 2, 1),
                cities: [
                    {
                        name: PRIMARY,
                        infections: 1,
                        epidemics: hypergeometric(8, 1, 2, 1),
                    },
                    {
                        name: SECONDARY,
                        infections: 1,
                        epidemics: 0,
                    },
                ],
            } as Forecast);
        });

        it("should have the expected values match the infection rate", () => {
            expect(
                gameForecast({
                    player: [8],
                    turns: 0,
                    epidemics: 0,
                    discard: {},
                    infection: [
                        {
                            [PRIMARY]: 1,
                            [SECONDARY]: 2,
                        },
                    ],
                }).cities.reduce((sum, city) => sum + city.infections, 0),
            ).toEqual(2);
        });
    });
});

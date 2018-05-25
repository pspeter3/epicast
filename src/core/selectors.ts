import { hypergeometric } from "../util/math";
import { Forecast, Game } from "./types";

export const epidemicForecast = (game: Game): number[] => {
    const { player } = game;
    const drawn = game.turns * 2;
    const { index, sum } = player.reduce(
        (ctx, count, i) => {
            return ctx.sum > drawn ? ctx : { index: i, sum: ctx.sum + count };
        },
        { index: 0, sum: 0 },
    );
    const remaining = sum - drawn;
    const result = [
        index === game.epidemics ? hypergeometric(remaining, 1, Math.min(remaining, 2), 1) : 0,
    ];
    if (remaining === 1 && index !== player.length - 1) {
        result.push(hypergeometric(player[index + 1], 1, 1, 1));
    }
    return result;
};

export const gameForecast = (game: Game): Forecast => {
    return {
        epidemics: epidemicForecast(game).reduce((a, e) => a + e),
        cities: [],
    };
};

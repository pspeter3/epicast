import { hypergeometric } from "../util/math";
import { size, union, value } from "../util/stacks";
import { CityForecast, Forecast, Game, Stack } from "./types";

const INFECTION_SCHEDULE = [2, 2, 2, 3, 3, 4, 4, 5];

export const infectionRate = (game: Game): number => {
    return INFECTION_SCHEDULE[game.epidemics];
};

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
    const risk = epidemicForecast(game);
    const rate = infectionRate(game);
    const bottom = game.infection[0] || {};
    const options = size(bottom);
    const names = Object.keys(
        game.infection.reduce(
            (set, stack) => {
                return Object.keys(stack).reduce((collection, key) => {
                    collection[key] = true;
                    return collection;
                }, set);
            },
            {} as Record<string, boolean>,
        ),
    );
    const { expected } = game.infection.reduceRight(
        (ctx, stack) => {
            const count = size(stack);
            const base =
                ctx.rate > count
                    ? stack
                    : Object.keys(stack).reduce(
                          (ev, key) => {
                              let val = 0;
                              const total = value(stack, key);
                              for (let i = 1; i <= Math.min(total, ctx.rate); i++) {
                                  val += hypergeometric(count, total, ctx.rate, i);
                              }
                              return union(ev, { [key]: val });
                          },
                          {} as Stack,
                      );
            return { expected: union(ctx.expected, base), rate: ctx.rate - count };
        },
        { expected: {}, rate },
    );
    const cities = names.map(name => {
        const val = value(bottom, name);
        let epidemics = risk[0] * (val / options);
        if (risk.length > 1 && options > 1) {
            epidemics += risk[1] * (val / (options - 1));
            epidemics += risk[1] * ((val - 1) / options);
        }
        return {
            name,
            infections: value(expected, name),
            epidemics,
        } as CityForecast;
    });
    return {
        epidemics: risk.reduce((a, e) => a + e),
        cities,
    };
};

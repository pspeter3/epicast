import { total, unique } from "../util/decks";
import { hypergeometric } from "../util/math";
import { size, union, value } from "../util/stacks";
import { CityForecast, Deck, Forecast, Game, Stack } from "./types";

const INFECTION_SCHEDULE = [2, 2, 2, 3, 3, 4, 4, 5];

export const infectionRate = (game: Game): number => {
    return INFECTION_SCHEDULE[game.epidemics];
};

export const epidemicForecast = (game: Game): { safe: number; risk: number[] } => {
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
    return {
        safe: index === game.epidemics ? 0 : Math.floor(remaining / 2),
        risk: result,
    };
};

const expectedInfections = (deck: Deck, rate: number): Stack => {
    return deck.reduceRight(
        (ctx, stack) => {
            const count = size(stack);
            const base =
                ctx.rate > count
                    ? stack
                    : Object.keys(stack).reduce(
                          (ev, name) => {
                              let val = 0;
                              const options = value(stack, name);
                              if (options === count) {
                                  return union(ev, { [name]: ctx.rate });
                              }
                              for (let i = 1; i <= Math.min(options, ctx.rate); i++) {
                                  val += i * hypergeometric(count, options, ctx.rate, i);
                              }
                              return union(ev, { [name]: val });
                          },
                          {} as Stack,
                      );
            return { expected: union(ctx.expected, base), rate: ctx.rate - count };
        },
        { expected: {}, rate },
    ).expected;
};

const expectedEpidemics = (deck: Deck, risk: number[]): Stack => {
    return deck.reduce(
        (ctx, stack) => {
            if (ctx.rate >= risk.length) {
                return ctx;
            }
            const options = size(stack);
            const rate = ctx.rate + options;
            const expected = Object.keys(stack).reduce((ev, name) => {
                const count = value(stack, name);
                const limit = Math.min(risk.length - 1, count);
                for (let prev = 0; prev <= limit; prev++) {
                    const probability = risk[prev];
                    for (let drawn = 0; drawn <= prev; drawn++) {
                        ev[name] =
                            value(ev, name) + probability * ((count - drawn) / (options - prev));
                    }
                }
                return ev;
            }, ctx.expected);
            return { expected, rate };
        },
        { expected: {} as Record<string, number>, rate: 0 },
    ).expected;
};

export const gameForecast = (game: Game): Forecast => {
    const { safe, risk } = epidemicForecast(game);
    const rate = infectionRate(game);
    const cards = total(game.infection);
    const all = game.infection.concat([game.discard]);
    const deck = cards > rate ? game.infection : all;
    const infections = expectedInfections(deck, rate);
    const epidemics = expectedEpidemics(deck, risk);
    const cities = unique(all).map(name => {
        return {
            name,
            infections: value(infections, name),
            epidemics: value(epidemics, name),
        } as CityForecast;
    });
    return {
        remaining: game.player.reduce((a, e) => a + e) - game.turns * 2,
        safe,
        epidemics: risk.reduce((a, e) => a + e),
        cities,
    };
};

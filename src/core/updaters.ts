import { total } from "../util/decks";
import { difference, size, union, unit } from "../util/stacks";
import { Config, Deck, Game, Stack } from "./types";

export type Updater<D> = (game: Game, data: D) => Game;

export const configure = (config: Config): Game => {
    const player: number[] = [];
    const base = Math.floor(config.cards / config.epidemics);
    const remainder = config.cards % config.epidemics;
    for (let i = 0; i < config.epidemics; i++) {
        player.push(base + (i < remainder ? 2 : 1));
    }
    return {
        player,
        turns: 0,
        epidemics: 0,
        discard: {},
        infection: [config.cities],
    };
};

export const epidemic: Updater<string> = (game, city) => {
    const stack = unit(city);
    return {
        ...game,
        epidemics: game.epidemics + 1,
        discard: {},
        infection: game.infection
            .map((current, index) => {
                return index === 0 ? difference(current, stack) : current;
            })
            .concat(union(game.discard, stack)),
    };
};

export const infect: Updater<Stack> = (game, cities) => {
    const overflow = total(game.infection) < size(cities);
    const discard = overflow ? cities : union(game.discard, cities);
    const deck = overflow ? [game.discard].concat(game.infection) : game.infection;
    const { infection } = deck.reduceRight(
        (ctx, stack) => {
            const next = difference(stack, ctx.cities);
            return {
                cities: difference(ctx.cities, stack),
                infection:
                    size(next) > 0
                        ? [difference(stack, ctx.cities)].concat(ctx.infection)
                        : ctx.infection,
            };
        },
        { cities, infection: [] as Deck },
    );
    return {
        ...game,
        turns: game.turns + 1,
        discard,
        infection,
    };
};

export const remove: Updater<string> = (game, city) => {
    const stack = unit(city);
    return {
        ...game,
        discard: difference(game.discard, stack),
    };
};

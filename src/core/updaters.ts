import { difference, union, unit } from "../util/stacks";
import { Config, Deck, Game } from "./types";

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
        infection: game.infection.concat(union(game.discard, stack)),
    };
};

export const infect: Updater<Deck> = (game, deck) => {
    const delta = game.infection.length - deck.length;
    return {
        ...game,
        turns: game.turns + 1,
        discard: deck.reduce((stack, cities) => union(stack, cities), game.discard),
        infection: game.infection.reduce(
            (stacks, stack, index) => {
                const pos = index - delta;
                const result = pos >= 0 ? difference(stack, deck[pos]) : stack;
                return Object.keys(result).length > 0 ? stacks.concat(result) : stacks;
            },
            [] as Deck,
        ),
    };
};

export const remove: Updater<string> = (game, city) => {
    const stack = unit(city);
    return {
        ...game,
        discard: difference(game.discard, stack),
    };
};

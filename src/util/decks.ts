import { Deck } from "../core/types";
import { size } from "./stacks";

export const unique = (deck: Deck): string[] =>
    Object.keys(
        deck.reduce(
            (set, stack) => {
                return Object.keys(stack).reduce((collection, key) => {
                    collection[key] = null;
                    return collection;
                }, set);
            },
            {} as Record<string, null>,
        ),
    );

export const total = (deck: Deck): number => deck.reduce((sum, stack) => sum + size(stack), 0);

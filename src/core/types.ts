export type Stack = Readonly<Record<string, number>>;

export type Deck = ReadonlyArray<Stack>;

export interface Config {
    readonly cards: number;
    readonly epidemics: number;
    readonly cities: Stack;
}

export interface Game {
    readonly turns: number;
    readonly epidemics: number;
    readonly discard: Stack;
    readonly infection: Deck;
}

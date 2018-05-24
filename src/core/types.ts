export type Stack = Readonly<Record<string, number>>;

export type Deck = ReadonlyArray<Stack>;

export interface Config {
    readonly cards: number;
    readonly epidemics: number;
    readonly cities: Stack;
}

export interface State {
    readonly turns: number;
    readonly epidemics: number;
    readonly config: Config;
    readonly discard: Stack;
    readonly infection: Deck;
}

export type Stack = Readonly<Record<string, number>>;

export type Deck = ReadonlyArray<Stack>;

export interface Config {
    readonly cards: number;
    readonly epidemics: number;
    readonly cities: Stack;
}

export interface Game {
    readonly player: ReadonlyArray<number>;
    readonly turns: number;
    readonly epidemics: number;
    readonly discard: Stack;
    readonly infection: Deck;
}

export interface CityForceast {
    readonly name: string;
    readonly infections: number;
    readonly epidemics: number;
}

export interface Forecast {
    readonly epidemics: number;
    readonly cities: ReadonlyArray<CityForceast>;
}

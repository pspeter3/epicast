import { Action, Stack } from "./types";

const toStack = (city: string): Stack => {
    return { [city]: 1 };
};

export const epidemic = (city: string): Action => {
    return {
        name: "epidemic",
        cities: toStack(city),
    };
};

export const infect = (cities: Stack): Action => {
    return {
        name: "infect",
        cities,
    };
};

export const remove = (city: string): Action => {
    return {
        name: "remove",
        cities: toStack(city),
    };
};

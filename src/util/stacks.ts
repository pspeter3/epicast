import { Stack } from "../core/types";

export const unit = (city: string): Stack => {
    return { [city]: 1 };
};

export const value = (stack: Stack, key: string): number => {
    return stack[key] === undefined ? 0 : stack[key];
};

export const union = (left: Stack, right: Stack): Stack => {
    return Object.keys(right).reduce((stack, key) => {
        return {
            ...stack,
            [key]: value(left, key) + value(right, key),
        };
    }, left);
};

export const difference = (left: Stack, right: Stack): Stack => {
    return Object.keys(right).reduce((stack, key) => {
        const result = value(left, key) - value(right, key);
        return result > 0 ? { ...stack, [key]: result } : stack;
    }, left);
};

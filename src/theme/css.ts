export function classNames(...classes: Array<string | undefined>): string {
    return classes.join(" ");
}

export function focusClass(className: string): string {
    return `focus:${className}`;
}

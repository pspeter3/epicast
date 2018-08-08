export function classNames(...classes: string[]): string {
    return classes.join(" ");
}

export function focusClass(className: string): string {
    return `focus:${className}`;
}

export interface DialogService {
    alert(message: string): void;
    confirm(message: string): boolean;
    prompt(message: string, defaultValue?: string): string | null;
}

export type StorageService = Storage;

export interface RouterService {
    onRouteChange(callback: (location: string) => void): () => void;
    route(): string;
}

export interface RouteService {
    routeTo(location: string): void;
}

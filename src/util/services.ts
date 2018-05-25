export interface DialogService {
    alert(message: string): void;
    confirm(message: string): boolean;
    prompt(message: string, defaultValue?: string): string;
}

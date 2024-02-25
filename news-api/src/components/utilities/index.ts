export function getElementAndType<T extends HTMLElement>(arg: HTMLElement | Document = document, sel: string): T {
    const result: T | null = arg.querySelector<T>(sel);

    if (result === null) {
        throw Error('Element not found');
    }
    return result;
}

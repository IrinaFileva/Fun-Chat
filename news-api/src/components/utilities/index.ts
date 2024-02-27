export function getElementAndType<T extends HTMLElement>(arg: HTMLElement | Document = document, selector: string): T {
    const result: T | null = arg.querySelector<T>(selector);

    if (result === null) {
        throw Error('Element not found');
    }
    return result;
}

export function* storageQuery(range: number, gift: string, resolver: (n: number, gift: string) => boolean): Generator<number> {
    for (let i = 1; i <= range; i++) {
        if (resolver(i, gift)) {
            yield i;
        }
    }
}2

export function storageResolver(n: number, gift: string): boolean {
    return n % gift.length === 0;
}
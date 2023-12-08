export interface Letter {
    content: string;
    country: 'pl' | 'de' | 'us';
    priority: 'high' | 'medium' | 'low';
}

type Key = keyof Exclude<Letter, "content">

export class SortByWeight<T extends Key> {
    weights: Record<Letter[Key], number>
    key: T
    constructor(weights: Record<Letter["priority"], number> | Record<Letter["country"], number>, key: T) {
        this.weights = weights
        this.key = key
    }

    getWeights(){
        return this.weights
    }
    soryByStrategy(letters: Letter[]) {
        const weights = this.getWeights()

        return letters.sort((a,b) => weights[a[this.key]] - weights[b[this.key]])
    }
}

export class LengthStrategy {
    soryByStrategy(letters: Letter[]) {
        return letters.sort((a, b) => a.content.length - b.content.length);
    }
}

export class PriorityStrategy extends SortByWeight<"priority"> {
    constructor() {
        super({
            "high": 1,
            "medium": 2,
            "low": 3,

        }, "priority");
    }
}

export class CountryStrategy extends SortByWeight<"country"> {
    constructor() {
        super({
            "pl": 1,
            "de": 2,
            "us": 3,
        }, "country");
    }
}

export interface Instance {
    soryByStrategy(letters: Letter[]): Letter[]
}

export class LetterSorter {
    instance : Instance
    constructor(instance: Instance) {
        this.instance = instance
    }
    sortLetters(letters: Letter[]): Letter[] {
        return this.instance.soryByStrategy(letters)
    }
}
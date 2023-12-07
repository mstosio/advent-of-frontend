type Letter = { [key: string]: number };
export function createTrackedLetter(letter: Letter, changeTracker: Function): Letter {
    const trackedLetter = new Proxy(letter, {
        set(target: Letter, property: string, value: number) {
            if (target[property] !== value) {
                changeTracker(property, value);
                return Reflect.set(target, property, value);
            }

            return true
        },
    });

    return trackedLetter as Letter;
}

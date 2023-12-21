type GalacticHistoryTracer<T> = {
    add: (arg: T) => void,
    current: () => T | null,
    undo: () => void,
    redo: () => void
};

export function createTracer<T>(): GalacticHistoryTracer<T> {
    const map = new Map<number, T>()
    let currentIndex = 1

    return {
        add(val){
            map.set(currentIndex, val)
            currentIndex++
        },

        current(){
            return map.get(currentIndex - 1) || null
        },

        undo(){
            currentIndex = currentIndex - 1
        },

        redo(){
            if(currentIndex > map.size){
                throw new Error('No more galaxies to explore')
            }

            currentIndex = currentIndex + 1
        }
    };
}
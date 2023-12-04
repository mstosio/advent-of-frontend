

export const memoize = (fn: any) => {
    let cache: Map<string, unknown> = new Map()

    if(typeof fn !== "function"){
        throw new Error('Function to be memoized must be a function.')
    }

    return (...args: any[]) => {
        const id = args.join('-')

        if(cache.has(id)) return cache.get(id)
        const result = fn(...args)
        cache.set(id, result)
        return result
    }
}


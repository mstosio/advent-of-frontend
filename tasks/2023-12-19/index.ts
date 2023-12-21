// //2nd appraoch
// export function usePagination<T>(items: T[], itemsPerPage: number, pageNumber: number){
//     return {
//         totalPages: Math.ceil(items.length/itemsPerPage),
//         totalItems: items.length,
//         currentPageItems: items.slice(
//             (pageNumber - 1) * itemsPerPage,
//             pageNumber * itemsPerPage
//         )
//     }
// }

export function usePagination<T>(items: T[], itemsPerPage: number, pageNumber: number) {
    const paginated = new Map<number, T[]>()
    let page = 1;
    let currentArrayItems: T[] = []

    for(let i = 0; i < items.length; i++){
        const lastIteration = i === items.length - 1
        currentArrayItems.push(items[i])

        if(currentArrayItems.length === itemsPerPage || lastIteration){
            paginated.set(page, currentArrayItems)
            currentArrayItems = []
            page += 1
        }
    }

    return {
        totalPages: paginated.size,
        totalItems: items.length,
        currentPageItems:  paginated.get(pageNumber) || []
    }
}

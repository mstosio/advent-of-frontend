export type Lokalizacja = {
    x: number, y: number, z: number, czas: number
}

export type MapaCzasoprzestrzenna = (x: number, y: number, z: number, czas: number) => number | typeof NaN


export function znajdzWorek(lokalizacje: Lokalizacja[], mapa: MapaCzasoprzestrzenna): Lokalizacja | null {
    if(lokalizacje?.length === 0){
        return null
    }

    let maxRecord: Lokalizacja | null = null
    let maxValue = -1

    lokalizacje.forEach((value) => {
        const {x, y, z, czas} = value;
        const val = mapa(x, y, z, czas)

        if(!isFinite(val) || isNaN(val)) return null

        if(val > maxValue){
            maxValue = val
            maxRecord = value
        }
    })

    return maxRecord
}
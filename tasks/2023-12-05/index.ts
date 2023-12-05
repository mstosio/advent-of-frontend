import Func = jest.Func;

export class ChristmasEmitter {
    events: Map<string, Function[]>

    constructor() {
        this.events = new Map()
    }

    on(name:string, callback: Function){
        if(this.events.has(name)){
            this.events.get(name)?.push(callback)
            return
        }

        this.events.set(name, [callback])
    }

    off(name: string, callback: Function){
        const filtered = this.events.get(name)?.filter((fn) => {
            return fn !== callback
        })

        this.events.set(name, filtered || [])
    }

    emit(name: string){
        this.events.get(name)?.forEach((fn) => {
            fn()
        })
    }

}
export class GiftStream {
    arr : string[]
    constructor(arr: string[]) {
        this.arr = arr;
    }

    map(callback: (val: string) => string){
        this.arr = this.arr.map(callback)
        return this
    }

    skip(num: number){
        this.arr = this.arr.slice(num)
        return this
    }

    take(num: number){
        this.arr = this.arr.slice(0, num)
        return this
    }

    getGifts(){
        return this.arr
    }
}
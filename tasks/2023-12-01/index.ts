export class GiftRegistry {
    presents: Map<number,  string[]>

    constructor() {
        this.presents = new Map();
    }

    addGift(number: number, present: string){
        const presentOfUser = this.presents.get(number)

        if(presentOfUser){
            presentOfUser.push(present)
            return
        }

        this.presents.set(number, [present])
    }

    removeGift(number: number, present: string){
        const presentsOfUser = this.presents.get(number)

        if(!presentsOfUser){
            throw new Error("There isn't a user with gifts.")
        }

        if(!presentsOfUser.includes(present)){
            throw new Error("Gift not found")
        }

        const filtered = presentsOfUser.filter(preset => preset !== present)

        this.presents.set(number, filtered)
        return
    }

    getGiftsForChild(number: number){
        return this.presents.get(number)
    }
}
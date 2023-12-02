export class ChristmasQueue<T> {
    queue: Map<number, T[]>
    constructor() {
        this.queue = new Map()
    }

    enqueue(element: T, priority: number){
        if(this.queue.has(priority)){
            this.queue.get(priority)?.unshift(element)
            return
        }

        this.queue.set(priority, [element])
    }

    dequeue(){
        if (this.isEmpty()) {
            throw new Error('There are no letters in the queue!');
        }

        const lastPriority = Math.max(...this.queue.keys());
        const elements = this.queue.get(lastPriority)
        const element = elements?.pop();

        if (elements && elements.length === 0) {
            this.queue.delete(lastPriority);
        }

        return element;
    }

    isEmpty(){
        return this.queue.size === 0;
    }
}

//object map appraoch
export class ChristmasQueueObjectMap<T>{
    queue: {
        [priority: string]: T[]
    }
    constructor() {
        this.queue = {}
    }

    enqueue(element: T, priority: number){
        if(this.queue[priority]){
            this.queue[priority].unshift(element)
            return
        }

        this.queue[priority] = [element]
    }

    dequeue(){
        const lastKey = Object.keys(this.queue)[Object.keys(this.queue).length-1]

        if(this.isEmpty()){
            throw new Error('There are no letters in the queue!')
        }

        const element = this.queue[lastKey].pop()

        if(this.queue[lastKey].length === 0){
            delete this.queue[lastKey]
        }

        return element
    }

    isEmpty(){
        return Object.keys(this.queue).length === 0;
    }
}

//timeStamp approach :)
export class ChristmasQueueTimestamp<T> {
    queue: [T, number, Date][]

    constructor() {
        this.queue = []
    }

    enqueue(priority: T, number: number){
        this.queue.push([priority, number,  new Date()])
    }

    dequeue(){
        if(this.isEmpty()){
            throw new Error('There are no letters in the queue!')
        }

        const sorted = [...this.queue].sort((a, b) => {
            const priorityComparison = a[1] - b[1];

            if (priorityComparison === 0) {
                return a[2].getTime() - b[2].getTime();
            }

            return priorityComparison * -1;
        });

        const item = sorted.shift()

        this.queue = sorted

        return item && item[0]
    }

    isEmpty(){
        return this.queue.length === 0
    }
}

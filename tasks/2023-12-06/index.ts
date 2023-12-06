

export class OrderController {
    private machines: Set<Machine>
    constructor() {
        this.machines = new Set()
    }
    registerMachine(machine: Machine){
        this.machines.add(machine)
    }
    unregisterMachine(machineToBeDeleted: Machine){
        this.machines.delete(machineToBeDeleted)
    }

    setState(value: string){
        if(value === 'unknown'){
            throw new Error('Invalid state provided')
        }

        this.machines.forEach(machine => {
            machine.setState(value)
        })
    }
}

export class Machine   {
    private history: string[]
    state: string | null

    constructor() {
        this.history = []
        this.state = null
    }
    setState(value: string){
        this.history.push(value)
        this.state = value
    }

    performAudit(){
        return this.history.map((item, index) => `Order #${index+1} - ${item}`)
    }
}
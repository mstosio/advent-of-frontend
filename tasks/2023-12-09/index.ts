export interface Tool {
    init: () => void,
    update: () => void,
    dispose:() => void,
}

interface ToolWithInit extends Tool{
    initialized: boolean
}

export class Equipment {
    tools: ToolWithInit[]
    constructor() {
        this.tools = []
    }
    registerTools(tool: Tool){
        this.tools.push({
            ...tool,
            initialized: false
        })
    }

    initializeTools(){
        this.tools.forEach(tool => {
            tool.init()
            tool.initialized = true
        })
    }

    updateTools(){
        this.tools.forEach(tool => {
            if(!tool.initialized) throw new Error('Cannot update any tools before initialization.')
            tool.update()
        })
    }

    disposeTools(){
        this.tools.forEach(tool => {
            tool.dispose()
        })
    }
}
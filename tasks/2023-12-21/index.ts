export class InjectionToken<T> {
    value: string
    constructor(value: string) {
        this.value = value
    }

}

export class FactoryInjector {
    private classes: Map<any, any>

    constructor() {
        this.classes = new Map()
    }
    registerClass<T>(newClass: new () => T ): void {
        this.classes.set(newClass, new newClass);
    }

    get<T>(classToGet: { new (): T } | InjectionToken<T>): T  {
        if(!this.classes.has(classToGet)){
            throw new Error('Not registered')
        }

        return this.classes.get(classToGet)
    }

    provideValue<T>(token: InjectionToken<T>, value: string): void {
        this.classes.set(token, value);
    }
}



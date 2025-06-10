
function ClassDecorator <T extends { new (...args:any[]):{}}>(
    constructor: T
) {
    return class extends constructor {
        newProperty = 'New Property Value';
        hello = 'Hello, World!';
    }
}


@ClassDecorator
export class SuperClass {

    public myProperty: string = 'My Property Value';
    constructor() {
        console.log('SuperClass constructor called');
    }
}

const superClassInstance = new SuperClass();

console.log('SuperClass instance:', superClassInstance);
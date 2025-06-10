export class Person {

    constructor(
        public firstName: string,
        public lastName: string = 'No last name',
        public age?: number
    ) {}
}


export class Hero extends Person {

    constructor(
        firstName: string,
        lastName: string = 'No last name',
        age?: number,
        public powers: string[] = []
    ) {
        super(firstName, lastName, age);
    }

    saveTheWorld() {
        return 'Saving the world';
    }
}


/* Priorizar composición sobre herencia */
export class Villain {

    constructor(
        public firstName: string,
        public lastName: string = 'No last name',
        public person: Person,
        public age?: number,
    ) {}
}


const hero = new Hero('Peter', 'Parker', 25, ['Spider Sense', 'Web Shooting']);
const villain = new Villain('Green', 'Goblin', new Person('Norman', 'Osborn', 50), 50);
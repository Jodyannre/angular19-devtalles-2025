let skills: string[] = ['HTML', 'CSS', 'JavaScript']

interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}


const strider: Character = {
    name: 'Strider',
    hp: 50,
    skills: ['Sword', 'Bow'],
    hometown: 'Rivendell'
}

console.table(strider)

export default {

}

function addNumbers(a: number, b:number) {
    return a + b
}

const addNumbersArrow = (a: number, b:number): string => {
    return `${a + b}`
}


function multiply( first: number, base: number, third?: number): number {
    return first * base
}

const result: number = addNumbers(2, 3)
const result2: string = addNumbersArrow(2, 3)
const result3: number = multiply(2, 3)


console.log({result})
console.log({result2})
console.log({result3})


/*********************** Objetos como parámetros ***********************************/

interface Character {
    name: string
    hp: number
    showHp: () => void
}



function healCharacter(character: Character, amount: number): void {
    character.hp += amount
}


const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Character ${this.name} has ${this.hp} HP`)
    }
}

healCharacter(strider, 20)

strider.showHp()

export {

}
/* Crer ejemplo de una función generica para imprimir un array de objetos de tipo T */
export function printArray<T>(items: T[]): void {
    items.forEach(item => {
        console.log(item);
    });
}

// Ejemplo de uso
const numbers = [1, 2, 3, 4, 5];
const strings = ['apple', 'banana', 'cherry'];
const objects = [{ name: 'Alice' }, { name: 'Bob' }];
printArray(numbers); // Imprime números
printArray(strings); // Imprime cadenas
printArray(objects); // Imprime objetos
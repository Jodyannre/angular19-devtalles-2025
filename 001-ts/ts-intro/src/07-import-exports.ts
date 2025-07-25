import { Product, taxCalculation } from './06-function-destructuring'


const shoppingCart: Product[] = [
    {
        description: 'Nokia A1',
        price: 100
    },
    {
        description: 'Ipad Air',
        price: 200.0
    }
]

const [ total, tax] = taxCalculation({ tax: 0.15, products: shoppingCart })
console.log('Total: ', total)
console.log('Tax: ', tax)
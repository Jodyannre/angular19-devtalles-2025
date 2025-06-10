
export interface Product {
    description: string
    price: number
}

const phone: Product = {
    description: 'Nokia A1',
    price: 100
}

const tablet: Product = {
    description: 'Ipad Air',
    price: 200.0
}


interface TaxCalculationOptions {
    tax: number
    products: Product[]
}

export function taxCalculation ( options: TaxCalculationOptions): [number, number] {
    const { tax, products } = options
    let total = 0
    products.forEach( ({ price }) => {
        total += price
    })
    return [total, total * tax]
}

const shoppingCart: Product[] = [phone, tablet]
const tax = 0.15


const [total, taxCalculated] = taxCalculation({ tax, products: shoppingCart })

console.log('Total: ', total)
console.log('Tax: ', taxCalculated)

export {}
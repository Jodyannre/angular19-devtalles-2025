export interface Passenger {
    name: string;
    children?: string[];
}


const passenger1: Passenger = {
    name: 'John Doe',
    children: ['Jane', 'Doe']
};

const passenger2: Passenger = {
    name: 'Alice Smith'
};


/* Opcional con ? */
const printChildren = (passenger: Passenger) => {
    // Using optional chaining to safely access children
    const howManyChildren = passenger.children?.length || 0;
    if (howManyChildren > 0) {
        console.log(`${passenger.name} has ${howManyChildren} children.`);
    }
    else {
        console.log(`${passenger.name} has no children.`);
    }
};

/* Simpre lo va a recibir con !*/
const printChildren2 = (passenger: Passenger) => {
    // Using optional chaining to safely access children
    const howManyChildren = passenger.children!.length || 0;
    if (howManyChildren > 0) {
        console.log(`${passenger.name} has ${howManyChildren} children.`);
    }
    else {
        console.log(`${passenger.name} has no children.`);
    }
};
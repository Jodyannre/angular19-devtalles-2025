

interface AudioPlayer {
    audioVolume: string
    songDuration: number
    song: string
    details: Details
}


interface Details {
    author: string
    year: number
}


const audioPlayer: AudioPlayer = {
    audioVolume: 'high',
    songDuration: 36,
    song: 'Messi',
    details: {
        author: 'Messi',
        year: 2023
    }
}

const song = 'New song'

const {
    song: anotherSong, 
    songDuration: duration, 
    details: { author}
} = audioPlayer

/*
console.log('The song is: ' + song)
console.log('Another song is: ' + anotherSong)
console.log('Duration is: ' + duration)
console.log('Author is: ' + author)
*/

/* Destructuring arrays */
const dbz: string[] = ['Goku', 'Vegeta', 'Trunks']
const [ , vegeta, trunks, majin = 'Not Found' ] = dbz

console.log('Character 2: ' + vegeta)
console.log('Character 3: ' + trunks)
console.log('Character 4: ' + majin)

export {}
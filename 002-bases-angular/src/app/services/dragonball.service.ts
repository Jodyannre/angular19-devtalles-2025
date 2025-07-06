import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = () => {
  const characters = localStorage.getItem('characters');

  return characters ? JSON.parse(characters) : [];
}


@Injectable({providedIn: 'root'})
export class DragonBallService {
  constructor() { }
  characters = signal<Character[]>(loadFromLocalStorage());

  saveToLoclaStorage = effect( () => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));

  })

  addCharacter(character: Character) {
    this.characters.update(currentCharacters => [...currentCharacters, character]);
  }
}

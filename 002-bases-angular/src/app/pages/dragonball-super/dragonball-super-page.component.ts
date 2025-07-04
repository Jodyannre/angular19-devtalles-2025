import { Component, signal, computed} from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { AddCharacterComponent } from '../../components/dragonball/add-character/add-character.component';


interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-super-page.component',
  imports: [CharacterListComponent, AddCharacterComponent],
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './dragonball-super-page.component.css'
})
export class DragonballSuperPageComponent {

  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    { id: 2, name: 'Vegeta', power: 8500 },
  ]);


  powerClasses = computed( () => {
    return {
      'text-danger': true,
    }
  })

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    };

    this.characters.update(currentCharacters => [...currentCharacters, newCharacter]);
    this.resetFields();

    console.log('name: ', this.name());
    console.log('power: ', this.power());
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

}

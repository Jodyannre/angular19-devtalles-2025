import { NgClass } from '@angular/common';
import { Component, signal, computed} from '@angular/core';


interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-page.component',
  imports: [],
  templateUrl: './dragonball-page.component.html',
  styleUrl: './dragonball-page.component.css'
})
export class DragonballPageComponent {

  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9000 },
    //{ id: 2, name: 'Vegeta', power: 8500 },
    //{ id: 3, name: 'Gohan', power: 7800 },
    //{ id: 4, name: 'Yamcha', power: 500 },
    //{ id: 5, name: 'Krillin', power: 750 },
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

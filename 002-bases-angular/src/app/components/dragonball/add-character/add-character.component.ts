import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';


@Component({
  selector: 'dragonball-add-character',
  imports: [],
  templateUrl: './add-character.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCharacterComponent {

  name = signal('');
  power = signal(0);


  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: 1000,
      name: this.name(),
      power: this.power()
    };


    console.log('name: ', this.name());
    console.log('power: ', this.power());

    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }


 }

import { Component, signal, computed, inject} from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { AddCharacterComponent } from '../../components/dragonball/add-character/add-character.component';
import { DragonBallService } from '../../services/dragonball.service';

@Component({
  selector: 'app-dragonball-super-page.component',
  imports: [CharacterListComponent, AddCharacterComponent],
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './dragonball-super-page.component.css'
})
export class DragonballSuperPageComponent {

  dragonBallService = inject(DragonBallService);

}

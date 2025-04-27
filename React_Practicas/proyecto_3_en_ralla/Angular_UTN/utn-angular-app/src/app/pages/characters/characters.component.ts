import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { CharacterComponent } from '../../components/character/character.component';

@Component({
  selector: 'app-characters',
  imports: [CharacterComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
  providers: [CharactersService],
})

export class CharactersComponent implements OnInit {
  characters: any = []

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.charactersService.getCharacters().then((data: any) => {
      this.characters = data;
    })
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})

export class CharacterComponent {
  @Input() character!: {
    id: string,
    name: string,
    image: string,
    species: string,
    gender: string
  }
}

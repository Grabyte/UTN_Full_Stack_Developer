export class CharactersService {
  async getCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    return data.results;
  }

  async getCharacter(id: number) { }

  async getCharacterByName(id: string) { }

}
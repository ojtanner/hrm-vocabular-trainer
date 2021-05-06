import { WordPair } from './WordPair';

export class WordList {
  private _wordPairs: WordPair[];

  constructor() {
    this._wordPairs = [];
  }

  public get wordPairs(): WordPair[] {
    return this._wordPairs;
  }
  public set wordPairs(value: WordPair[]) {
    this._wordPairs = value;
  }

  public addWordPair(wordPair: WordPair): void {
    this._wordPairs.push(wordPair);
  }

  public removeWordPair(index: number): void {
    console.log(index);
    this._wordPairs.splice(index, 1);
    console.log(this._wordPairs);
  }

  public clearWordPairs(): void {
    this._wordPairs = new Array<WordPair>();
  }
}

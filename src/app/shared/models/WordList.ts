import { WordPair } from './WordPair';
import { Word } from './Word';
import { Language } from './Language.enum';

export class WordList {
  private _wordPairs: WordPair[];
  private _languages: [Language, Language] | null;

  constructor() {
    this._wordPairs = [];
    this._languages = null;
  }

  public get wordPairs(): WordPair[] {
    return this._wordPairs;
  }
  public set wordPairs(value: WordPair[]) {
    this._wordPairs = value;
  }

  public get languages(): [Language, Language] | null {
    return this._languages;
  }
  public set languages(value: [Language, Language] | null) {
    this._languages = value;
  }

  public addWordPair(wordPair: WordPair): void {
    if (this._wordPairs.length === 0) {
      this._wordPairs.push(wordPair);
      this._languages = [wordPair.left.language, wordPair.right.language];
    } else {
      this.checkWordPairLanguages(wordPair);
      const adjustedWordPair = this.adjustWordPairLanguagePosition(wordPair);
      this._wordPairs.push(adjustedWordPair);
    }
  }

  public removeWordPair(index: number): void {
    console.log(index);
    this._wordPairs.splice(index, 1);
    console.log(this._wordPairs);
  }

  public clearWordPairs(): void {
    this._wordPairs = new Array<WordPair>();
  }

  private checkWordPairLanguages(wordPair: WordPair): void {
    if (this._languages === null) {
      throw new Error(`WordList Error: No Languages in WordList`);
    }

    const [leftLanguage, rightLanguage] = this._languages;
    const leftWordPairLanguage = wordPair.left.language;
    const rightWordPairLanguage = wordPair.right.language;

    if (
      leftLanguage !== leftWordPairLanguage &&
      leftLanguage !== rightWordPairLanguage
    ) {
      throw new Error(
        `WordList Error: Tried to add WordPair to WordList but Languages don't match: WordList Language ${leftLanguage} does not match WordPair Languages ${leftWordPairLanguage} and ${rightWordPairLanguage}`
      );
    }

    if (
      rightLanguage !== rightWordPairLanguage &&
      rightLanguage !== leftWordPairLanguage
    ) {
      throw new Error(
        `WordList Error: Tried to add WordPair to WordList but Languages don't match: WordList Language ${rightLanguage} does not match WordPair Languages ${leftWordPairLanguage} and ${rightWordPairLanguage}`
      );
    }
  }

  private adjustWordPairLanguagePosition(wordPair: WordPair): WordPair {
    if (this._languages === null) {
      throw new Error(`WordList Error: No Languages in WordList`);
    }

    const [leftLanguage, _] = this._languages;
    const adjustedWordPair = wordPair;
    if (wordPair.left.language !== leftLanguage) {
      const aux: Word = wordPair.left;
      adjustedWordPair.left = adjustedWordPair.right;
      adjustedWordPair.right = aux;
    }

    return adjustedWordPair;
  }
}

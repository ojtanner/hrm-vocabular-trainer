import { Injectable } from '@angular/core';
import { WordList } from '../shared/models/WordList';
import { WordPair } from '../shared/models/WordPair';
import { Word } from '../shared/models/Word';

@Injectable({
  providedIn: 'root',
})
export class WordlistManagementService {
  public wordList: WordList;

  constructor() {
    this.wordList = new WordList();
  }

  public addWordPair(wordPair: WordPair): void {
    this.wordList.addWordPair(wordPair);
    this.saveToLocalStorage();
  }

  public removeWordPair(index: number): void {
    this.wordList.removeWordPair(index);
    this.saveToLocalStorage();
  }

  public clearWordPairs(): void {
    this.wordList.clearWordPairs();
    this.saveToLocalStorage();
  }

  public getWordList(): WordList {
    this.retrieveFromLocalStorage();
    return this.wordList;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('wordList', this.serializeWordlist());
  }

  // Could be optimized. No need to reload on every retrieve call.
  private retrieveFromLocalStorage(): void {
    const serializeWordlist = localStorage.getItem('wordList');
    if (serializeWordlist) {
      const deseriaizedWordlist = this.deseriaizeWordlist(serializeWordlist);
      this.wordList = deseriaizedWordlist;
    }
  }

  private serializeWordlist(): string {
    return JSON.stringify(this.wordList);
  }

  // Needs better error handling.
  private deseriaizeWordlist(serialized: string): WordList {
    try {
      const deserializedJSON = JSON.parse(serialized);
      const wordpairsJSON = deserializedJSON._wordPairs;
      console.log(wordpairsJSON);

      if (Array.isArray(wordpairsJSON)) {
        const wordPairs: WordPair[] = wordpairsJSON.map((wordpairJSON) => {
          return new WordPair(
            new Word(
              wordpairJSON._left._language,
              wordpairJSON._left._spelling
            ),
            new Word(
              wordpairJSON._right._language,
              wordpairJSON._right._spelling
            )
          );
        });

        const wordList: WordList = new WordList();
        wordList.wordPairs = wordPairs;

        return wordList;
      }

      return new WordList();
    } catch (error) {
      throw new Error('Error during deserialization of WordList');
    }
  }
}

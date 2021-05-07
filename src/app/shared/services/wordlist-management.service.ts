import { Injectable } from '@angular/core';
import { WordList } from '../models/WordList';
import { WordPair } from '../models/WordPair';
import { Word } from '../models/Word';
import { Language } from '../models/Language.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordlistManagementService {
  public wordList: WordList;
  private currentLanguages = new BehaviorSubject<[Language, Language] | null>(
    null
  );
  public currentLanguages$ = this.currentLanguages.asObservable();

  constructor() {
    this.wordList = new WordList();
    this.retrieveFromLocalStorage();

    console.log('Inside constructor');
    console.log(this.wordList);
  }

  public addWordPair(wordPair: WordPair): void {
    this.wordList.addWordPair(wordPair);
    this.setWordListLanguages();
    this.saveToLocalStorage();
  }

  public removeWordPair(index: number): void {
    this.wordList.removeWordPair(index);
    this.serializeWordlist();
    this.saveToLocalStorage();

    if (this.wordList.wordPairs.length === 0) {
      this.currentLanguages.next(null);
    }
  }

  public clearWordPairs(): void {
    this.wordList.clearWordPairs();
    this.saveToLocalStorage();

    if (this.wordList.wordPairs.length === 0) {
      this.currentLanguages.next(null);
    }
  }

  public getWordList(): WordList {
    this.retrieveFromLocalStorage();
    return this.wordList;
  }

  public getWordPairs(): WordPair[] {
    return this.wordList.wordPairs;
  }

  private setWordListLanguages(): void {
    this.currentLanguages.next(this.wordList.languages);
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

    if (this.wordList.wordPairs.length !== 0) {
      const firstWordPair = this.wordList.wordPairs[0];
      this.wordList.languages = [
        firstWordPair.left.language,
        firstWordPair.right.language,
      ];

      this.currentLanguages.next(this.wordList.languages);
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
      localStorage.clear();
      throw new Error(
        'Error during deserialization of WordList. Cleared corrupted Localstorage.'
      );
    }
  }
}

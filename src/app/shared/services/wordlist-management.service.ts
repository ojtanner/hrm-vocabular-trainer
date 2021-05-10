import { Injectable } from '@angular/core';
import { WordList } from '../models/WordList';
import { WordPair } from '../models/WordPair';
import { Word } from '../models/Word';
import { Language, languageToString } from '../models/Language.enum';
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

  public updateWordPair(wordPair: WordPair, index: number): void {
    try {
      this.wordList.wordPairs[index] = wordPair;
      this.saveToLocalStorage();
    } catch (error) {
      console.error(error);
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

  public getWordPairsCopy(): WordPair[] {
    return [...this.wordList.wordPairs];
  }

  // Note: Should be Sort by Locale but this is not part of the JS-API
  public getSortedWordList(sortingLanguage: Language | null): WordList {
    if (sortingLanguage === null) {
      return this.wordList;
    }

    if (this.currentLanguages.value === null) {
      return this.wordList;
    }

    try {
      const comparator = this.compareByLocale(
        sortingLanguage,
        this.currentLanguages.value
      );

      this.wordList.wordPairs.sort(comparator);
      return this.wordList;
    } catch (error) {
      console.error(error);
      return this.wordList;
    }
  }

  private compareByLocale(
    locale: Language,
    currentLanguages: [Language, Language]
  ): (a: WordPair, b: WordPair) => number {
    if (!currentLanguages.includes(locale)) {
      throw new Error(
        `Can not sort languages ${languageToString(
          currentLanguages[0]
        )} and ${languageToString(currentLanguages[1])} by locale ${locale}`
      );
    }

    return (a: WordPair, b: WordPair): number => {
      const aSpelling =
        a.left.language === locale ? a.left.spelling : a.right.spelling;
      const bSpelling =
        b.left.spelling === locale ? b.left.spelling : b.right.spelling;
      return aSpelling.localeCompare(bSpelling, locale, {
        sensitivity: 'base',
      });
    };
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

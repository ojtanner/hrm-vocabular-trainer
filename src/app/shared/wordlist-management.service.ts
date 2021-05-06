import { EventEmitter, Injectable, Output } from '@angular/core';
import { WordList } from '../shared/models/WordList';
import { WordPair } from '../shared/models/WordPair';
import { Word } from '../shared/models/Word';
import { Language } from '../shared/models/Language.enum';

@Injectable({
  providedIn: 'root',
})
export class WordlistManagementService {
  public wordList: WordList;

  constructor() {
    this.wordList = new WordList();
    this.wordList.addWordPair(
      new WordPair(
        new Word(Language.German, 'Pferd'),
        new Word(Language.English, 'Horse')
      )
    );
  }

  public addWordPair(wordPair: WordPair): void {
    this.wordList.addWordPair(wordPair);
  }

  public getWordList(): WordList {
    return this.wordList;
  }
}

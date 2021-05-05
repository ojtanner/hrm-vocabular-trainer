import { WordPair } from './WordPair';
import { GradedWordPair } from './GradedWordPair';
import { WordList } from './WordList';
import { Grade } from './Grade.enum';

export class GradedWordList {
  private _wordPairs: GradedWordPair[];

  constructor() {
    this._wordPairs = [];
  }

  public get wordPairs(): GradedWordPair[] {
    return this._wordPairs;
  }

  public set wordPairs(value: GradedWordPair[]) {
    this._wordPairs = value;
  }

  public static fromWordList(wordList: WordList): GradedWordList {
    const gradedWordList = new GradedWordList();

    gradedWordList._wordPairs = wordList.wordPairs.map((wordPair: WordPair) => {
      return GradedWordPair.fromWordPair(wordPair);
    });

    return gradedWordList;
  }

  public getFailedWordPairs(): GradedWordList {
    const gradedWordList = new GradedWordList();

    gradedWordList._wordPairs = this._wordPairs.filter(
      (gradedWordPair: GradedWordPair) => {
        return gradedWordPair.grade === Grade.Failed;
      }
    );

    return gradedWordList;
  }
}

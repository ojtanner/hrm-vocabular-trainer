import { Word } from './Word';
import { WordPair } from './WordPair';
import { Grade } from './Grade.enum';

export class GradedWordPair extends WordPair {
  private _grade: Grade;

  constructor(left: Word, right: Word, grade: Grade) {
    super(left, right);
    this._grade = grade;
  }

  public get grade(): Grade {
    return this._grade;
  }
  public set grade(value: Grade) {
    this._grade = value;
  }

  public static fromWordPair(
    wordPair: WordPair,
    grade = Grade.NotGraded
  ): GradedWordPair {
    return new GradedWordPair(wordPair.left, wordPair.right, grade);
  }
}

import { Word } from './Word';

export class WordPair {
  private _left: Word;
  private _right: Word;

  constructor(left: Word, right: Word) {
    this._left = left;
    this._right = right;
    this.validate();
  }

  public get left(): Word {
    return this._left;
  }
  public set left(value: Word) {
    this._left = value;
  }

  public get right(): Word {
    return this._right;
  }
  public set right(value: Word) {
    this._right = value;
  }

  private validate(): void {
    if (this._left.language === this.right.language) {
      throw new Error(
        'WordPair Instantiation Error: Both words of pair are of the same language'
      );
    }
  }
}

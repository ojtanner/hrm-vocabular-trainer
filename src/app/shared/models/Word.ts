import { Language } from './Language.enum';

export class Word {
  private _language: Language;
  private _spelling: string;

  constructor(language: Language, spelling: string) {
    this._language = language;
    this._spelling = spelling;
    this.validate();
  }

  public get language(): Language {
    return this._language;
  }
  public set language(value: Language) {
    this._language = value;
  }

  public get spelling(): string {
    return this._spelling;
  }
  public set spelling(value: string) {
    this._spelling = value;
  }

  private validate(): void {
    if (this._spelling.length < 2) {
      throw new Error(
        'Word Instantiation Error: Word must be at least 2 characters long.'
      );
    }

    if (this._language === undefined) {
      throw new Error('Word Instantiation Error: No Languages specified');
    }
  }
}

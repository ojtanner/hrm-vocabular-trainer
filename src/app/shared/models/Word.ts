import { Language } from './Language.enum';

export class Word {
  private _language: Language;
  private _spelling: string;

  constructor(language: Language, spelling: string) {
    this.validate(language, spelling);
    this._language = language;
    this._spelling = spelling;
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

  private validate(language: Language, spelling: string): void {
    if (spelling === undefined || spelling.length < 2) {
      throw new Error(
        'Word Instantiation Error: Word must be at least 2 characters long.'
      );
    }

    if (language === undefined) {
      throw new Error('Word Instantiation Error: No Languages specified');
    }
  }
}

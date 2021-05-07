import { Word } from "./Word";

export class WordPairQuestion {
  private _questionWord: Word;
  private _answerWord: Word;

  constructor(questionWord: Word, answerWord: Word) {
    this._questionWord = questionWord;
    this._answerWord = answerWord;
  }

  public get questionWord(): Word {
    return this._questionWord;
  }
  public set questionWord(value: Word) {
    this._questionWord = value;
  }

  public get answerWord(): Word {
    return this._answerWord;
  }
  public set answerWord(value: Word) {
    this._answerWord = value;
  }
}

import { Word } from './Word';
import { WordPairQuestion } from './WordPairQuestion';

export class IncorrectWordPairQuestion extends WordPairQuestion {
  private _incorrectAnswer: string;

  constructor(questionWord: Word, answerWord: Word, incorrectAnswer: string) {
    super(questionWord, answerWord);
    this._incorrectAnswer = incorrectAnswer;
  }

  public get incorrectAnswer_1(): string {
    return this._incorrectAnswer;
  }
  public set incorrectAnswer_1(value: string) {
    this._incorrectAnswer = value;
  }

  public toString(): string {
    return `Question: ${this.questionWord.spelling} | Answer: ${this.answerWord.spelling} | Your Answer: ${this._incorrectAnswer}`;
  }
}

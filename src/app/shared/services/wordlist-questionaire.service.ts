import { Injectable } from '@angular/core';
import { WordPair } from '../models/WordPair';
import { WordPairQuestion } from '../models/WordPairQuestion';
import { WordlistManagementService } from './wordlist-management.service';

@Injectable({
  providedIn: 'root',
})
export class WordlistQuestionaireService {
  /**
   * Was macht der?
   * Fragen-Liste initialisieren
   * Momentane Frage aufbereiten
   * Antwort überprüfen
   * Nächste Frage geben
   *
   */

  private questions: WordPair[] = [];
  private currentQuestion: WordPairQuestion | null = null;

  private numberOfQuestionsTotal = 0;
  private numberOfQuestionsAnswered = 0;

  private isInProgress = false;
  private isTraining = true;

  constructor(private wordlistManagementService: WordlistManagementService) {
    console.log(this);
  }

  public questionaireIsInProgress(): boolean {
    return this.isInProgress;
  }

  public questionaireIsTraining(): boolean {
    return this.isTraining;
  }

  public canBeStarted(): boolean {
    return this.wordlistManagementService.getWordPairs().length > 0;
  }

  public getNumberOfQuestionsTotal(): number {
    return this.numberOfQuestionsTotal;
  }

  public getNumberOfQuestionsAnswered(): number {
    return this.numberOfQuestionsAnswered;
  }

  public isLastQuestion(): boolean {
    return this.numberOfQuestionsAnswered + 1 === this.numberOfQuestionsTotal;
  }

  public startQuestionaire(isTraining = true): void {
    this.questions = this.wordlistManagementService.getWordPairsCopy();

    if (this.questions.length > 0) {
      this.numberOfQuestionsTotal = this.questions.length;
      this.isInProgress = true;
      this.isTraining = isTraining;
      this.setNextQuestion();
    }
  }

  public stopQuestionaire(): void {
    this.questions = [];
    this.numberOfQuestionsTotal = 0;
    this.numberOfQuestionsAnswered = 0;
    this.isInProgress = false;
    this.isTraining = true;
    this.currentQuestion = null;
  }

  public getCurrentQuestion(): WordPairQuestion | null {
    return this.currentQuestion;
  }

  public processAnswer(answer: string): boolean {
    console.log('Provided answer: ' + answer);
    this.numberOfQuestionsAnswered += 1;
    const result = this.checkAnswer(answer);
    this.setNextQuestion();
    return result;
  }

  private checkAnswer(answer: string): boolean {
    const correctAnswer = this.currentQuestion?.questionWord.spelling;

    if (correctAnswer !== undefined) {
      return answer.toUpperCase() == correctAnswer.toUpperCase();
    } else {
      return false;
    }
  }

  private setNextQuestion(): void {
    const randomWordPair: WordPair | null = this.extractRandomWordPair();

    if (randomWordPair === null) {
      this.currentQuestion = null;
      this.isInProgress = false;
      return;
    }

    const leftWord = randomWordPair.left;
    const rightWord = randomWordPair.right;

    const randomZeroOrOne: number = Math.random() < 0.5 ? 0 : 1;

    if (randomZeroOrOne === 0) {
      this.currentQuestion = new WordPairQuestion(leftWord, rightWord);
    } else {
      this.currentQuestion = new WordPairQuestion(rightWord, leftWord);
    }
  }

  private extractRandomWordPair(): WordPair | null {
    if (this.questions.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return this.questions.splice(randomIndex, 1)[0];
  }

  /*
  private wordPairs: WordPair[];
  private totalNumberOfWordPairs: number;
  public currentQuestion: WordPairQuestion | null;
  public inProgress: boolean;
  public isTraining: boolean;

  constructor(private wordlistManagementService: WordlistManagementService) {
    this.wordPairs = [];
    this.currentQuestion = null;
    this.totalNumberOfWordPairs = 0;
    this.inProgress = false;
    this.isTraining = true;
  }

  public startQuestionaire(isTraining = true): void {
    this.wordPairs = [...this.wordlistManagementService.getWordPairs()];
    this.totalNumberOfWordPairs = this.wordPairs.length;
    this.setNextQuestion();
    this.inProgress = true;
    this.isTraining = isTraining;
  }

  public nextQuestion(): WordPairQuestion | null {
    const currentQuestion = this.currentQuestion;
    this.setNextQuestion();
    return currentQuestion;
  }

  public getTotalNumberOfWordPairs(): number {
    return this.totalNumberOfWordPairs;
  }

  public getRemainingNumberOfWordPairs(): number {
    return this.wordPairs.length;
  }

  public isQuestionaireInProgress(): boolean {
    return this.inProgress;
  }

  private setNextQuestion(): void {
    const randomWordPair: WordPair | null = this.extractRandomWordPair();

    if (randomWordPair === null) {
      this.currentQuestion = null;
      this.inProgress = false;
      return;
    }

    const leftWord = randomWordPair.left;
    const rightWord = randomWordPair.right;

    const randomZeroOrOne: number = Math.random() < 0.5 ? 0 : 1;

    if (randomZeroOrOne === 0) {
      this.currentQuestion = new WordPairQuestion(leftWord, rightWord);
    } else {
      this.currentQuestion = new WordPairQuestion(rightWord, leftWord);
    }
  }

  private extractRandomWordPair(): WordPair | null {
    if (this.wordPairs.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * this.wordPairs.length);

    return this.wordPairs.splice(randomIndex, 1)[0];
  }
  */
}

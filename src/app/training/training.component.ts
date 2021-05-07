import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Language } from '../shared/models/Language.enum';
import { WordPairQuestion } from '../shared/models/WordPairQuestion';
import { WordlistTrainingService } from '../shared/services/wordlist-training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  private currentQuestion: WordPairQuestion | null;
  public questionLanguage: Language | null;
  public questionSpelling: string | null;
  public answerLanguage: Language | null;
  public answerSpelling: string | null;

  public hasStarted: boolean;
  public questionMode: boolean;
  public display: string;
  public totalQuestions: number;
  public answeredQuesetions: number;

  constructor(private wordlistTrainingService: WordlistTrainingService) {
    // Note: TS does not recognize initialization method here and complains about uninitialized instance variables.
    this.currentQuestion = null;
    this.questionLanguage = null;
    this.questionSpelling = null;
    this.answerLanguage = null;
    this.answerSpelling = null;
    this.hasStarted = false;
    this.questionMode = false;
    this.display = '';
    this.totalQuestions = 0;
    this.answeredQuesetions = 0;
  }

  ngOnInit(): void {}

  public getQuestionProgress(): string {
    return `${this.answeredQuesetions} of ${this.totalQuestions} questions answered`;
  }

  public getQuestionDisplay(): string {
    return `${this.answerLanguage}: ${this.answerSpelling} | ${this.questionLanguage}: `;
  }

  public startTraining(): void {
    this.wordlistTrainingService.startTraining();
    this.currentQuestion = this.wordlistTrainingService.nextQuestion();

    if (this.currentQuestion === null) {
      this.display =
        'Your WordList is empty. Please add some WordPairs to start your training.';
      return;
    }

    this.setQuestionAndAnswerWordInformation();

    this.hasStarted = true;
    this.questionMode = true;

    this.totalQuestions = this.wordlistTrainingService.getTotalNumberOfWordPairs();
    this.answeredQuesetions = 0;
  }

  private setQuestionAndAnswerWordInformation(): void {
    if (this.currentQuestion === null) {
      return;
    }
    this.answerLanguage = this.currentQuestion.answerWord.language;
    this.answerSpelling = this.currentQuestion.answerWord.spelling;
    this.questionLanguage = this.currentQuestion.questionWord.language;
    this.questionSpelling = '';
  }

  public stopTraining(): void {
    this.resetInitialState();
    this.display = 'Training was stopped.';
  }

  public nextQuestion(): void {
    console.log('Next question');
    const nextQuestion: WordPairQuestion | null = this.wordlistTrainingService.nextQuestion();
    this.display = '';

    if (nextQuestion === null) {
      this.resetInitialState();
      this.display = '';
      return;
    }

    this.currentQuestion = nextQuestion;
    this.setQuestionAndAnswerWordInformation();
    this.questionMode = true;
    this.answeredQuesetions += 1;
  }

  public checkAnswer(): void {
    const answer = this.questionSpelling;
    if (answer === null || answer === undefined || answer.length < 2) {
      this.display =
        'Please enter a word that is at least two characters long.';
      return;
    }

    if (
      answer.toLowerCase() ===
      this.currentQuestion?.questionWord.spelling.toLowerCase()
    ) {
      this.display = 'Correct answer. Good job!';
    } else {
      this.display = `Incorrect answer. You entered ${answer} but the correct answer is ${this.currentQuestion?.questionWord.spelling}`;
    }

    this.questionMode = false;
  }

  private resetInitialState(): void {
    this.currentQuestion = null;
    this.questionLanguage = null;
    this.questionSpelling = null;
    this.answerLanguage = null;
    this.answerSpelling = null;
    this.hasStarted = false;
    this.questionMode = false;
    this.display = '';
  }
}

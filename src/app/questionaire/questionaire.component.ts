import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../shared/models/Language.enum';
import { WordPairQuestion } from '../shared/models/WordPairQuestion';
import { WordlistQuestionaireService } from '../shared/services/wordlist-questionaire.service';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css'],
})
export class QuestionaireComponent implements OnInit {
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
  @Input() public isTraining!: boolean;

  constructor(
    private wordListQuestionaireService: WordlistQuestionaireService
  ) {
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

  public problemMessage(): string {
    if (this.totalQuestions === 0) {
      return 'Empty WordList. Please enter at least one WordPair so that you can start.';
    } else {
      return '';
    }
  }

  public greetingText(): string {
    return this.isTraining === true
      ? 'Click Start Training to begin your training. You can stop at any time.'
      : 'Click Start Assessment to begin your assessment. Keep in mind that you will have to stay on this page until you finish or prematurely end your assessment.';
  }

  public startQuestionaireText(): string {
    return this.isTraining === true ? 'Start Training' : 'Start Assessment';
  }

  public stopQuestionaireText(): string {
    return this.isTraining === true ? 'Stop Training' : 'Stop Assessment';
  }

  public nextQuestionText(): string {
    return 'Next Question';
  }

  public getQuestionDisplay(): string {
    return `${this.answerLanguage}: ${this.answerSpelling} | ${this.questionLanguage}: `;
  }

  public startQuestionaire(): void {
    this.wordListQuestionaireService.startQuestionaire();
    this.currentQuestion = this.wordListQuestionaireService.nextQuestion();

    if (this.currentQuestion === null) {
      this.totalQuestions = -1;
      return;
    }

    this.setQuestionAndAnswerWordInformation();

    this.hasStarted = true;
    this.questionMode = true;
    this.display = '';
    this.totalQuestions = this.wordListQuestionaireService.getTotalNumberOfWordPairs();
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

  public stopQuestionaire(): void {
    this.resetInitialState();
  }

  public nextQuestion(): void {
    console.log('Next question');
    const nextQuestion: WordPairQuestion | null = this.wordListQuestionaireService.nextQuestion();
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

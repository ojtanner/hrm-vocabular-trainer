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
  private currentQuestion: WordPairQuestion | null = null;
  public questionLanguage: Language | null;
  public questionSpelling: string | null;
  public answerLanguage: Language | null;
  public answerSpelling: string | null;

  public display: string;
  @Input() public isTraining!: boolean;

  constructor(
    private wordListQuestionaireService: WordlistQuestionaireService
  ) {
    // Note: TS does not recognize initialization method here and complains about uninitialized instance variables.
    this.questionLanguage = null;
    this.questionSpelling = null;
    this.answerLanguage = null;
    this.answerSpelling = null;
    this.display = '';
  }

  ngOnInit(): void {}

  // Messages Start
  public getAnswerSubmitText(): string {
    if (this.wordListQuestionaireService.isLastQuestion()) {
      return 'Submit answer and finish Questionaire';
    } else {
      return 'Submit answer';
    }
  }

  public getProgressMessage(): string {
    return `Question ${
      this.wordListQuestionaireService.getNumberOfQuestionsAnswered() + 1
    } of ${this.wordListQuestionaireService.getNumberOfQuestionsTotal()}`;
  }

  public getProblemMessage(): string {
    if (!this.wordListQuestionaireService.canBeStarted()) {
      return 'Empty WordList. Please enter at least one WordPair so that you can start.';
    } else {
      return '';
    }
  }

  public getGreetingMessage(): string {
    return this.isTraining === true
      ? 'Click Start Training to begin your training. You can stop at any time.'
      : 'Click Start Assessment to begin your assessment. Keep in mind that you will have to stay on this page until you finish or prematurely end your assessment.';
  }

  public getStartQuestionaireText(): string {
    return this.isTraining === true ? 'Start Training' : 'Start Assessment';
  }

  public getStopQuestionaireText(): string {
    return this.isTraining === true ? 'Stop Training' : 'Stop Assessment';
  }

  public getQuestionDisplayText(): string {
    return `${this.answerLanguage}: ${this.answerSpelling} | ${this.questionLanguage}: `;
  }
  // Messages End

  public hasStarted(): boolean {
    return this.wordListQuestionaireService.questionaireIsInProgress();
  }

  public startQuestionaire(): void {
    this.wordListQuestionaireService.startQuestionaire(this.isTraining);
    this.currentQuestion = this.wordListQuestionaireService.getCurrentQuestion();
    console.log('Current question');
    console.log(this.currentQuestion);

    if (this.currentQuestion === null) {
      return;
    }

    this.setQuestionAndAnswerWordInformation();

    this.display = '';
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
    this.wordListQuestionaireService.stopQuestionaire();
  }

  public checkAnswer(): void {
    const answer = this.questionSpelling;

    if (answer === null || answer === undefined || answer.length < 2) {
      this.display =
        'Please enter a word that is at least two characters long.';
      return;
    }

    const result = this.wordListQuestionaireService.processAnswer(answer);

    if (result === true) {
      this.display = 'Correct answer. Good job!';
    } else {
      this.display = `Incorrect answer. You entered ${answer} but the correct answer is ${this.currentQuestion?.questionWord.spelling}`;
    }

    this.currentQuestion = this.wordListQuestionaireService.getCurrentQuestion();
    this.setQuestionAndAnswerWordInformation();
    this.questionSpelling = '';
  }

  private resetInitialState(): void {
    this.currentQuestion = null;
    this.questionLanguage = null;
    this.questionSpelling = null;
    this.answerLanguage = null;
    this.answerSpelling = null;
    this.display = '';
  }
}

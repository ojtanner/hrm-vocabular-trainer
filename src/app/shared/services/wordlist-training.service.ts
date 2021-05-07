import { Injectable } from '@angular/core';
import { Language } from '../models/Language.enum';
import { WordList } from '../models/WordList';
import { WordPair } from '../models/WordPair';
import { WordPairQuestion } from '../models/WordPairQuestion';
import { WordlistManagementService } from './wordlist-management.service';

@Injectable({
  providedIn: 'root',
})
export class WordlistTrainingService {
  private wordPairs: WordPair[];
  public currentQuestion: WordPairQuestion | null;

  constructor(private wordlistManagementService: WordlistManagementService) {
    this.wordPairs = [];
    this.currentQuestion = null;
  }

  public startTraining(): void {
    this.wordPairs = [...this.wordlistManagementService.getWordPairs()];
    this.setNextQuestion();
  }

  public nextQuestion(): WordPairQuestion | null {
    console.log('nextQuestion() start');
    const currentQuestion = this.currentQuestion;

    this.setNextQuestion();

    return currentQuestion;
  }

  private setNextQuestion(): void {
    const randomWordPair: WordPair | null = this.extractRandomWordPair();

    if (randomWordPair === null) {
      this.currentQuestion = null;
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
}

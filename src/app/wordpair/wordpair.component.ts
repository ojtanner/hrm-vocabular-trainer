import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { languageToString } from '../shared/models/Language.enum';
import { Word } from '../shared/models/Word';
import { WordPair } from '../shared/models/WordPair';

@Component({
  selector: 'app-wordpair',
  templateUrl: './wordpair.component.html',
  styleUrls: ['./wordpair.component.css'],
})
export class WordpairComponent implements OnInit {
  @Input() wordPair!: WordPair;
  @Input() index!: number;
  @Output() wordPairChanged: EventEmitter<{
    wordPair: WordPair;
    index: number;
  }> = new EventEmitter();

  @Output() wordPairDeleted: EventEmitter<number> = new EventEmitter();

  public leftWordSpelling = '';
  public rightWordSpelling = '';
  public isEditable = false;
  public errorDisplay = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.wordPair);
    this.isEditable = false;
    this.leftWordSpelling = this.wordPair.left.spelling;
    this.rightWordSpelling = this.wordPair.right.spelling;
    this.errorDisplay = '';
  }

  public hasErrorDisplay(): boolean {
    return this.errorDisplay.length > 0;
  }

  public getLeftLanguageText(): string {
    return languageToString(this.wordPair.left.language);
  }

  public getRightLanguageText(): string {
    return languageToString(this.wordPair.right.language);
  }

  public editWordPair(): void {
    this.isEditable = true;
  }

  public deleteWordPair(): void {
    this.wordPairDeleted.emit(this.index);
  }

  public cancelEdit(): void {
    this.isEditable = false;
    this.leftWordSpelling = this.wordPair.left.spelling;
    this.rightWordSpelling = this.wordPair.right.spelling;
    this.errorDisplay = '';
  }

  public updateWordPair(): void {
    try {
      const leftWord = new Word(
        this.wordPair.left.language,
        this.leftWordSpelling
      );
      const rightWord = new Word(
        this.wordPair.right.language,
        this.rightWordSpelling
      );

      const newWordPair = new WordPair(leftWord, rightWord);
      this.wordPairChanged.emit({ wordPair: newWordPair, index: this.index });
    } catch (e) {
      console.log(e);
      this.errorDisplay = e.message;
    }
  }
}

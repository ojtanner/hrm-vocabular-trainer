import { Component, OnInit } from '@angular/core';
import { Language } from '../../shared/models/Language.enum';
import { Word } from '../../shared/models/Word';
import { WordPair } from '../../shared/models/WordPair';
import { WordlistManagementService } from '../../shared/services/wordlist-management.service';

@Component({
  selector: 'app-wordlist-input',
  templateUrl: './wordlist-input.component.html',
  styleUrls: ['./wordlist-input.component.css'],
})
export class WordlistInputComponent implements OnInit {
  public leftLanguage!: Language;
  public leftSpelling!: string;

  public rightLanguage!: Language;
  public rightSpelling!: string;

  public errorMessage: string;

  public language: typeof Language = Language;

  constructor(private wordlistManagementService: WordlistManagementService) {
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  public submitWordPair(): void {
    try {
      const newWordPair = new WordPair(
        new Word(this.leftLanguage, this.leftSpelling),
        new Word(this.rightLanguage, this.rightSpelling)
      );
      this.wordlistManagementService.addWordPair(newWordPair);
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  public hasErrorMessage(): boolean {
    return this.errorMessage.length > 0;
  }
}

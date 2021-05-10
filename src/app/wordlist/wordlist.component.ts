import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Language } from '../shared/models/Language.enum';
import { WordList } from '../shared/models/WordList';
import { WordlistManagementService } from '../shared/services/wordlist-management.service';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css'],
})
export class WordlistComponent implements OnInit, OnDestroy {
  public wordlist: WordList;
  public wordListLanguages: [Language, Language] | null;
  public sortingLanguage: Language | null;
  private subscription: Subscription;

  constructor(private wordListManagementService: WordlistManagementService) {
    this.wordlist = this.wordListManagementService.getWordList();
    this.wordListLanguages = null;
    this.subscription = new Subscription();
    this.sortingLanguage = null;
  }

  ngOnInit(): void {
    this.subscription = this.wordListManagementService.currentLanguages$.subscribe(
      (currentLanguages) => {
        console.log(`Got changes to ${currentLanguages}`);
        this.wordListLanguages = currentLanguages;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public sortWordList(): void {
    this.wordlist = this.wordListManagementService.getSortedWordList(
      this.sortingLanguage
    );
  }

  public removeWordPair(index: number): void {
    this.wordListManagementService.removeWordPair(index);
  }

  public clearWordPairs(): void {
    this.wordListManagementService.clearWordPairs();
  }
}

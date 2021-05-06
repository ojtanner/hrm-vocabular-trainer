import { Component, Input, OnInit } from '@angular/core';
import { WordList } from '../shared/models/WordList';
import { WordlistManagementService } from '../shared/wordlist-management.service';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css'],
})
export class WordlistComponent implements OnInit {
  public wordlist: WordList;
  public title = 'Test';

  constructor(private wordListManagementService: WordlistManagementService) {
    this.wordlist = this.wordListManagementService.getWordList();
    console.log(this.wordlist);
  }

  ngOnInit(): void {}

  public removeWordPair(index: number): void {
    this.wordListManagementService.removeWordPair(index);
  }

  public clearWordPairs(): void {
    this.wordListManagementService.clearWordPairs();
  }
}

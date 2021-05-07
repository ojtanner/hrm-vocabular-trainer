import { TestBed } from '@angular/core/testing';

import { WordlistTrainingService } from './wordlist-training.service';

describe('WordlistTrainingService', () => {
  let service: WordlistTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordlistTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

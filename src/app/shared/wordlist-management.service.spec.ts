import { TestBed } from '@angular/core/testing';

import { WordlistManagementService } from './wordlist-management.service';

describe('WordlistManagementService', () => {
  let service: WordlistManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordlistManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

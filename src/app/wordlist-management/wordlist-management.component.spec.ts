import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlistManagementComponent } from './wordlist-management.component';

describe('WordlistManagementComponent', () => {
  let component: WordlistManagementComponent;
  let fixture: ComponentFixture<WordlistManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlistManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlistInputComponent } from './wordlist-input.component';

describe('WordlistInputComponent', () => {
  let component: WordlistInputComponent;
  let fixture: ComponentFixture<WordlistInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlistInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordlistInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

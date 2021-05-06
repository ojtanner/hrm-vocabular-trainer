import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpairComponent } from './wordpair.component';

describe('WordpairComponent', () => {
  let component: WordpairComponent;
  let fixture: ComponentFixture<WordpairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordpairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { WordlistQuestionaireService } from '../services/wordlist-questionaire.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateAssessment implements CanActivate {
  constructor(
    private wordListQuestionaireService: WordlistQuestionaireService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    return (
      !this.wordListQuestionaireService.questionaireIsInProgress() ||
      this.wordListQuestionaireService.questionaireIsTraining()
    );
  }
}

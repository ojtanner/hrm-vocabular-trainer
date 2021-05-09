import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment/assessment.component';
import { TrainingComponent } from './training/training.component';
import { WordlistManagementComponent } from './wordlist-management/wordlist-management.component';
import { CanActivateAssessment } from './shared/guards/CanActivateAssessment';

const routes: Routes = [
  {
    path: 'wordlist-management',
    component: WordlistManagementComponent,
    canActivate: [CanActivateAssessment],
  },
  {
    path: 'training',
    component: TrainingComponent,
    canActivate: [CanActivateAssessment],
  },
  { path: 'assessment', component: AssessmentComponent },
  { path: '', redirectTo: 'wordlist-management', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

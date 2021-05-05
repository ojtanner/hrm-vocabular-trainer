import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment/assessment.component';
import { TrainingComponent } from './training/training.component';
import { WordlistManagementComponent } from './wordlist-management/wordlist-management.component';

const routes: Routes = [
  { path: 'wordlist-management', component: WordlistManagementComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'assessment', component: AssessmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './assessment/assessment.component';
import { TrainingComponent } from './training/training.component';
import { WordlistManagementComponent } from './wordlist-management/wordlist-management.component';

const routes: Routes = [
  { path: 'wordlist-management', component: WordlistManagementComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'assessment', component: AssessmentComponent },
  { path: '', redirectTo: 'wordlist-management', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

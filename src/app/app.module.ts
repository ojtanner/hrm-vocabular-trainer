import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { WordlistManagementComponent } from './wordlist-management/wordlist-management.component';
import { TrainingComponent } from './training/training.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { WordlistComponent } from './wordlist/wordlist.component';
import { WordpairComponent } from './wordpair/wordpair.component';
import { WordlistInputComponent } from './wordlist-input/wordlist-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WordlistManagementComponent,
    TrainingComponent,
    AssessmentComponent,
    WordlistComponent,
    WordpairComponent,
    WordlistInputComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoteService } from './note.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './myComponents/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [NoteService],
  bootstrap: [AppComponent],
})
export class AppModule {}

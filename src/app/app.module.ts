import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteModule } from './myComponents/note/note.component';
import { ErrorComponent } from './myComponents/error/error.component';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [BrowserModule, AppRoutingModule, NoteModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

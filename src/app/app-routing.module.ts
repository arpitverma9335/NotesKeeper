import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './myComponents/home/home.component';
import { NoteComponent } from './myComponents/note/note.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Your Notes',
    },
  },
  {
    path: 'add-note',
    component: NoteComponent,
    data: {
      title: 'Add a Note',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, NgModule, OnInit } from '@angular/core';
import { Note } from 'src/app/note';
import { NoteElementModule } from '../../myComponents/note-element/note-element.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  localItem: string | null;
  public notes!: Note[];
  constructor() {
    this.localItem = localStorage.getItem('notes');
    if (this.localItem == null) {
      this.notes = [];
    } else {
      this.notes = JSON.parse(this.localItem);
    }
  }

  ngOnInit(): void {}

  noteAddition(note: Note) {
    console.log(note);
    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}

@NgModule({
  declarations: [NoteComponent],
  exports: [NoteComponent],
  imports: [NoteElementModule],
})
export class NoteModule {}

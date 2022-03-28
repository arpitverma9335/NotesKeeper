import { CommonModule } from '@angular/common';
import { Component, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.css'],
})
export class NoteElementComponent implements OnChanges {
  message: string = '';
  constructor(private noteService: NoteService) {}
  noteForm = new FormGroup({
    heading: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  onSubmit() {
    const note = {
      heading: this.noteForm.get('heading')?.value,
      content: this.noteForm.get('content')?.value,
    };
    this.noteService.addNote(note);
    this.message = 'success';
    this.noteForm.reset();
  }

  close() {
    this.message = '';
  }
  ngOnChanges(changes: SimpleChanges): void {}
}

@NgModule({
  declarations: [NoteElementComponent],
  exports: [NoteElementComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class NoteElementModule {}

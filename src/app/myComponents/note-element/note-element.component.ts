import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

import { Note } from 'src/app/note';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.css'],
})
export class NoteElementComponent implements OnChanges {
  message: string = '';
  @Output() noteAdd: EventEmitter<Note> = new EventEmitter();
  constructor() {}
  noteForm = new FormGroup({
    heading: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  onSubmit() {
    const note = {
      heading: this.noteForm.get('heading')?.value,
      content: this.noteForm.get('content')?.value,
    };
    this.noteAdd.emit(note);
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

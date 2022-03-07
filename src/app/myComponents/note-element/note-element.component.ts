import {
  Component,
  EventEmitter,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Note } from 'src/app/note';

@Component({
  selector: 'app-note-element',
  templateUrl: './note-element.component.html',
  styleUrls: ['./note-element.component.css'],
})
export class NoteElementComponent implements OnInit {
  heading!: string;
  content!: string;
  message!: string;
  @Output() noteAdd: EventEmitter<Note> = new EventEmitter();
  constructor() {}
  onSubmit() {
    const note = {
      heading: this.heading,
      content: this.content,
    };
    const isheading = new FormControl(this.heading, Validators.required);
    const isContent = new FormControl(this.content, Validators.required);
    if (isContent.status === 'VALID') {
      if (isheading.status === 'VALID') {
        this.noteAdd.emit(note);
        this.message = 'Saved Successfully';
      } else {
        this.message = 'Check Your Heading';
        return;
      }
    } else {
      this.message = 'Check Your Content';
      return;
    }
  }
  ngOnInit(): void {}
}

@NgModule({
  declarations: [NoteElementComponent],
  exports: [NoteElementComponent],
  imports: [FormsModule],
})
export class NoteElementModule {}

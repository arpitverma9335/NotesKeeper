import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Note } from 'src/app/note';
import { NoteComponent, NoteModule } from '../note/note.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Pipe({ name: 'compress' })
export class CompressionPipe implements PipeTransform {
  transform(content: string): string {
    return content.slice(0, 42);
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends NoteComponent {
  index!: number;
  targetIndex: number = -1;
  noteList!: Note[];
  isCompressed: Boolean = true;
  @Output() deleteIndex: EventEmitter<Number> = new EventEmitter();
  constructor() {
    super();
    this.noteList = this.notes;
    // console.log(this.noteList);
  }

  expand(index: number) {
    // console.log('expand', index);
    this.targetIndex = index;
  }

  contract(index: number) {
    // console.log('Contract', index);
    this.targetIndex = -1;
  }
}

@NgModule({
  declarations: [HomeComponent, CompressionPipe],
  imports: [NoteModule, CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class HomeModule {}

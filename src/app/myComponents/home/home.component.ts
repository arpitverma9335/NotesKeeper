import {
  Component,
  NgModule,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from 'src/app/note.service';

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
export class HomeComponent implements OnInit {
  index!: number;
  targetIndex: number = -1;
  filterResult: Boolean = false;
  noteList!: {
    heading: string;
    content: string;
  }[];
  isCompressed: Boolean = true;
  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteList = this.noteService.getNoteList();
  }

  searchFunc(str: string) {
    if (str.length === 0) {
      this.filterResult = false;
      this.noteList = this.noteService.getNoteList();
    } else {
      this.filterResult = true;
      var strRegExPattern: RegExp = new RegExp(str, 'gi');
      this.noteList = this.noteService
        .getNoteList()
        .filter((note) => note.heading.match(strRegExPattern));
    }
  }

  expand(index: number) {
    this.targetIndex = index;
  }

  contract(index: number) {
    this.targetIndex = -1;
  }

  deleteNote(index: number) {
    this.noteService.deleteNote(index);
  }
}

@NgModule({
  declarations: [HomeComponent, CompressionPipe],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class HomeModule {}

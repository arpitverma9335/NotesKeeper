import { Injectable } from '@angular/core';

@Injectable()
export class NoteService {
  noteList: {
    heading: string;
    content: string;
  }[] = [];

  addNote(note: { heading: string; content: string }) {
    this.noteList.push(note);
    localStorage.setItem('notes', JSON.stringify(this.noteList));
    console.log('Note Added successfully!');
  }

  getNoteList() {
    let localItem = localStorage.getItem('notes');
    if (localItem == null) {
      this.noteList = [];
    } else {
      this.noteList = JSON.parse(localItem);
    }
    return this.noteList;
  }

  deleteNote(index: number) {
    this.noteList.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.noteList));
    console.log('Note deleted Successfully!');
  }
}

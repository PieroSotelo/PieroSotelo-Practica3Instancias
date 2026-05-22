import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../interfaces/person.interface';

@Component({
  selector: 'app-person-list',
  standalone: false,
  templateUrl: './person-list.html',
  styleUrls: ['./person-list.css'],
})
export class PersonList {
  @Input() persons: Person[] = [];
  @Output() onEdit = new EventEmitter<Person>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onRestore = new EventEmitter<number>();

  edit(person: Person): void {
    this.onEdit.emit(person);
  }

  delete(id: number): void {
    this.onDelete.emit(id);
  }

  restore(id: number): void {
    this.onRestore.emit(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../services/personas.service';
import { Person } from '../interfaces/person.interface';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.html',
  styleUrls: ['./personas.css'],
  standalone: false,
})
export class PersonasComponent implements OnInit {
  persons: Person[] = [];
  editingPerson: Person | null = null;
  isFormOpen = false;

  constructor(private service: PersonasService) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.service.getAllPersonas().subscribe((persons) => {
      this.persons = persons;
    });
  }

  openForm(person?: Person): void {
    this.editingPerson = person ?? null;
    this.isFormOpen = true;
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.editingPerson = null;
  }

  onSaved(): void {
    this.loadPersons();
    this.closeForm();
  }

  deletePerson(id: number): void {
    if (!confirm('¿Estás seguro de que deseas desactivar esta persona?')) return;

    this.service.softDeletePersona(id).subscribe(() => {
      this.loadPersons();
    });
  }

  restorePerson(id: number): void {
    this.service.restorePersona(id).subscribe(() => {
      this.loadPersons();
    });
  }
}

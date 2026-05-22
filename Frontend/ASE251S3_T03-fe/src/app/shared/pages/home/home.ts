import { Component } from '@angular/core';
import { CrudLayoutCard } from '../../components/crud-layout/crud-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: false,
})
export class Home {
  selectedSection: string | null = null;
  cards: CrudLayoutCard[] = [
    { id: 'productos', label: 'Productos', tone: 'blue' },
    { id: 'personas', label: 'Personas', tone: 'green' },
    { id: 'suppliers', label: 'Proveedores', tone: 'yellow' },
  ];

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  goBack(): void {
    this.selectedSection = null;
  }
}

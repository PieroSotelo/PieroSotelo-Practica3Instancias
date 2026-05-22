import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface CrudLayoutCard {
  id: string;
  label: string;
  tone: 'blue' | 'green' | 'yellow';
}

@Component({
  selector: 'app-crud-layout',
  templateUrl: './crud-layout.html',
  styleUrls: ['./crud-layout.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudLayout {
  @Input() title = 'Secciones CRUD';
  @Input() subtitle = 'Elige el módulo que quieres administrar.';
  @Input() menuLabel = 'CRUD';
  @Input() selectedSection: string | null = null;
  @Input() cards: CrudLayoutCard[] = [];

  @Output() sectionSelected = new EventEmitter<string>();

  selectSection(sectionId: string): void {
    this.sectionSelected.emit(sectionId);
  }
}
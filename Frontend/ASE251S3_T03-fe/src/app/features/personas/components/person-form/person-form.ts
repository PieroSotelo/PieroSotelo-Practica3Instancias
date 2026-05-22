import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { Person } from '../../interfaces/person.interface';

@Component({
  selector: 'app-person-form',
  standalone: false,
  templateUrl: './person-form.html',
  styleUrls: ['./person-form.css'],
})
export class PersonForm implements OnChanges {
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Input() personEdit: Person | null = null;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PersonasService
  ) {
    this.form = this.fb.group({
      ubigeo_code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      document_type: ['DNI', [Validators.required]],
      document_number: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['CLI', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      password: [''],
      state: ['A', [Validators.required]],
    });
  }

  ngOnChanges(): void {
    if (this.personEdit) {
      this.form.patchValue(this.personEdit);
      return;
    }

    this.form.reset({
      ubigeo_code: '',
      name: '',
      last_name: '',
      document_type: 'DNI',
      document_number: '',
      phone: '',
      email: '',
      role: 'CLI',
      street: '',
      password: '',
      state: 'A',
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload = this.form.value as Omit<Person, 'id'>;

    if (this.personEdit) {
      this.service.updatePersona(this.personEdit.id, payload).subscribe(() => {
        this.saved.emit();
        this.form.reset();
      });
      return;
    }

    this.service.createPersona(payload).subscribe(() => {
      this.saved.emit();
      this.form.reset();
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

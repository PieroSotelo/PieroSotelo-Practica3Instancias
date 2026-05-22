import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: false, // Usamos NgModule
    templateUrl: './header.html',
    styleUrls: ['./header.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

    //Controla si se muestra el botón de regresar
    @Input() showBackButton = false;

    //Emite cuando el usuario hace click en el botón atrás
    @Output() onBack = new EventEmitter<void>();

    //Título del sistema
    readonly title = 'Sistema de Gestión de Los Queens Agro';
    readonly subtitle = 'Administra los Productos, Personas y Proveedores';

    //Evento hacia el componente padre
    goBack() {
        this.onBack.emit();
    }
}
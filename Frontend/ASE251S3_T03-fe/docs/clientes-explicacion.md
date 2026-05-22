# Modulo Clientes - Explicacion Completa

## 1. Objetivo del modulo
El modulo de clientes permite realizar un CRUD completo con eliminacion logica:
- Crear clientes.
- Listar clientes.
- Editar clientes.
- Eliminar logicamente (marcar como eliminado e inactivo).
- Restaurar clientes eliminados o inactivos.

No se elimina fisicamente de la base en la operacion de borrar, solo se actualizan los campos de estado.

## 2. Estructura del frontend (Angular)
La funcionalidad esta separada por responsabilidad:

- Contenedor principal del modulo: [src/app/clients/clients.ts](../src/app/clients/clients.ts)
- Vista principal del modulo: [src/app/clients/clients.html](../src/app/clients/clients.html)
- Formulario de alta/edicion: [src/app/components/client-form/client-form.ts](../src/app/components/client-form/client-form.ts)
- Vista del formulario: [src/app/components/client-form/client-form.html](../src/app/components/client-form/client-form.html)
- Tabla/listado de clientes: [src/app/components/client-list/client-list.ts](../src/app/components/client-list/client-list.ts)
- Vista de tabla/listado: [src/app/components/client-list/client-list.html](../src/app/components/client-list/client-list.html)
- Servicio HTTP de clientes: [src/app/services/api.ts](../src/app/services/api.ts)

## 3. Modelo de datos
La interfaz Client define la entidad de negocio:

- id: identificador unico.
- nombre: nombre del cliente.
- apellido: apellido del cliente.
- email: correo del cliente.
- telefono: numero de contacto.
- activo: indica si esta activo.
- eliminado: indica eliminacion logica.

Referencia: [src/app/services/api.ts](../src/app/services/api.ts)

## 4. Flujo de pantalla
En la vista del modulo se renderizan dos bloques:

1. Formulario (<app-client-form>) para crear o editar.
2. Listado (<app-client-list>) para visualizar y accionar.

Referencia: [src/app/clients/clients.html](../src/app/clients/clients.html)

## 5. Estado y logica en clients.ts
El componente [src/app/clients/clients.ts](../src/app/clients/clients.ts) usa senales para manejar estado:

- clients: lista completa traida del backend.
- selectedClientId: id del cliente en edicion.
- currentFilter: filtro actual ('active', 'inactive', 'deleted').
- visibleClients (computed): lista derivada segun filtro.
- selectedClient (computed): cliente seleccionado para editar.

Al iniciar (ngOnInit), se llama a loadClients() para traer datos desde API.

## 6. Operaciones CRUD
### Crear
- Se ejecuta cuando selectedClientId es null.
- Llama a createClient() en el servicio.
- Al finalizar: recarga lista y limpia edicion.

### Editar
- Al pulsar Editar en la tabla, se guarda selectedClientId.
- El formulario recibe el cliente por Input y rellena campos.
- Al guardar, llama a updateClient().
- Al finalizar: recarga lista y limpia edicion.

### Eliminar logico
- Llama a softDeleteClient(id).
- Backend cambia activo=0 y eliminado=1.
- Luego se recarga la lista.

### Restaurar
- Llama a restoreClient(id).
- Backend cambia activo=1 y eliminado=0.
- Luego se recarga la lista.

## 7. Filtros de visualizacion
El listado se divide en 3 vistas:

- Activos: !eliminado && activo
- Inactivos: !eliminado && !activo
- Eliminados: eliminado

La seleccion de filtro actualiza currentFilter y visibleClients se recalcula automaticamente.

Referencias:
- [src/app/clients/clients.ts](../src/app/clients/clients.ts)
- [src/app/clients/clients.html](../src/app/clients/clients.html)

## 8. Validaciones del formulario
El formulario aplica validaciones reactivas:

- nombre: requerido, minimo 2.
- apellido: requerido, minimo 2.
- email: requerido y formato valido.
- telefono: requerido y patron numerico con simbolos permitidos.
- activo: seleccion de estado.

Si hay errores, se muestran mensajes debajo de cada control.

Referencias:
- [src/app/components/client-form/client-form.ts](../src/app/components/client-form/client-form.ts)
- [src/app/components/client-form/client-form.html](../src/app/components/client-form/client-form.html)

## 9. Servicio API y endpoints
El frontend consume HTTP en base URL:
- http://localhost:3000/api/clients

Metodos usados en [src/app/services/api.ts](../src/app/services/api.ts):

- getAllClients() -> GET /api/clients
- findClientById(id) -> GET /api/clients/:id
- createClient(data) -> POST /api/clients
- updateClient(id, data) -> PUT /api/clients/:id
- softDeleteClient(id) -> PATCH /api/clients/:id/delete
- restoreClient(id) -> PATCH /api/clients/:id/restore

## 10. Flujo de eventos entre componentes
1. Usuario llena formulario y envia.
2. client-form emite evento save.
3. clients.ts recibe evento y decide crear o actualizar.
4. Se llama al servicio HTTP.
5. Si responde OK, se vuelve a cargar la lista.
6. client-list se vuelve a renderizar con datos nuevos.

## 11. Comportamiento esperado para pruebas
Casos minimos para validar:

1. Crear un cliente nuevo y verificar que aparece en Activos.
2. Editar un cliente y verificar cambios en la tabla.
3. Eliminar un cliente y verificar que desaparece de Activos y aparece en Eliminados.
4. Restaurar un cliente y verificar que vuelve a Activos.

## 12. Resumen tecnico
El modulo clientes ya esta desacoplado por capas:
- UI (formulario + tabla).
- Estado (signals/computed en el contenedor).
- Datos (servicio HTTP).
- Persistencia (API + SQL Server en backend).

Esto facilita mantenimiento, pruebas y extension futura (por ejemplo busqueda, paginacion o auditoria).
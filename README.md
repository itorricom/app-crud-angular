# Proyecto Final - CRUD Angular - Modulo 2

Proyecto desarrollado con Angular 20

## Descripción del Proyecto

Aplicación web que implementa:
- Gestión de Tareas con formularios reactivos
- Validaciones
- Persistencia de datos con localStorage
- JSON Server para API REST simulada

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Instalación

1. **Clonar el repositorio ->  branch: proyecto-final**
```bash
git clone https://github.com/itorricom/app-crud-angular.git
cd app-crud-angular
```

2. **Instalar dependencias:**
```bash
npm install
```

## Ejecución del Proyecto

Para ejecutar correctamente el proyecto, necesitas levantar DOS servidores:

### 1. Servidor JSON (API REST)

En una terminal, ejecuta:
```bash
npm run server
```

Esto iniciará JSON Server en `http://localhost:3000`

**Endpoints disponibles:**
- `http://localhost:3000/users` - Gestión de usuarios
- `http://localhost:3000/tasks` - Gestión de tareas

### 2. Servidor de Desarrollo Angular

En una **segunda terminal**, ejecuta:
```bash
ng serve
```
Una vez iniciado, abre tu navegador en `http://localhost:4200/`

**Recuerda:** Debes tener ambos servidores corriendo simultáneamente:
1. JSON Server (puerto 3000)
2. Angular Dev Server (puerto 4200)

Si el puerto 4200 está ocupado, Angular CLI te ofrecerá usar otro puerto automáticamente.

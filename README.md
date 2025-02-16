# 📌 MoonTech User Panel (Frontend)

Este es el frontend del panel de administración de usuarios de **MoonTech**, desarrollado con **Angular**. Permite gestionar usuarios, realizar autenticaciones y visualizar los logs de actividad.

## 🚀 Tecnologías utilizadas

- **Angular** (Framework principal)
- **TypeScript** (Lenguaje de programación)
- **Bootstrap** (Estilización y componentes)
- **ngx-lottie** (Animaciones con Lottie)
- **ngx-toastr** (Notificaciones)
- **Socket.IO** (WebSockets para comunicación en tiempo real)

## 📂 Estructura del Proyecto

```
MOONTECH_USER_PANEL
│── src/
│   ├── app/
│   │   ├── guards/  # Guardias de autenticación
│   │   ├── interceptors/  # Interceptores HTTP
│   │   ├── pages/
│   │   │   ├── login/  # Módulo de autenticación
│   │   │   ├── users/  # Módulo de gestión de usuarios
│   │   ├── routes/  # Configuración de rutas
│   │   ├── services/  # Servicios para la API y WebSockets
│   │   ├── utils/  # Configuración general de la aplicación
│   ├── assets/  # Recursos estáticos
│   ├── index.html  # Archivo base HTML
│   ├── main.ts  # Punto de entrada de Angular
```

## 🛠️ Funcionalidades

### 🔑 Autenticación de Usuarios
- Pantalla de login con validación de credenciales.
- Almacena el token JWT en **localStorage**.
- Implementa **interceptores** para enviar el token en cada petición.

### 🧑‍💼 Gestión de Usuarios (CRUD)
- Lista de usuarios con colores aleatorios en los avatares.
- Edición y eliminación de usuarios.
- Creación de nuevos usuarios mediante un modal.
- Desactivación de usuarios con restricciones para **administradores**.

### 📜 Registro de Actividad (Logs)
- Modal con lista de logs de actividad (login, logout, cambios en usuarios).
- Uso de **WebSockets** para actualización en tiempo real.

### 🏗️ Otras características
- **Diseño Responsive** con Bootstrap.
- **Uso de Toastr** para mostrar notificaciones.
- **Protección de rutas** con **AuthGuard**.

## 🏁 Instalación y Ejecución

### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/usuario/moontech-user-panel.git
cd moontech-user-panel
```

### 2️⃣ Instalar dependencias
```sh
npm install
```

### 3️⃣ Configurar el backend
Asegúrate de que el **backend** está corriendo en una URL accesible.
Modifica `app.config.ts` para apuntar a la URL correcta:
```ts
export const API_URL = 'https://moontech-back.onrender.com/api';
```

### 4️⃣ Ejecutar el proyecto
```sh
ng serve
```
Accede en: **http://localhost:4200**

### 5️⃣ Autenticación

Si bien el codigo esta pensado para que ene caso de que no 
haya ningún usuario se cree uno por defecto; 
us: admin@example.com 
contra: admin123

Ya hay un usuario admin creado el cual es:
us: aaaaa@gmail.com
contra: 123456



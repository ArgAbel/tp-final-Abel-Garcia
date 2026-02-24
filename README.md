# tp-final-Abel-Garcia

Front End

🐾 Sistema de Gestión Veterinaria "Patitas Felices"Documentación Técnica de Software (Frontend & API Integration)Este proyecto es una aplicación web robusta diseñada para la gestión integral de clínicas veterinarias, permitiendo el control de usuarios, mascotas, dueños e historias clínicas mediante una interfaz SPA (Single Page Application).🛠️ Stack Tecnológico y DependenciasCoreReact 18: Librería base para la interfaz de usuario.TypeScript: Superset de JavaScript para tipado estático y reducción de errores.Vite: Tooling para el desarrollo rápido y empaquetado.Dependencias de UI & UXMaterial UI (MUI) v5: Framework de componentes para un diseño profesional y responsive.MUI Icons: Librería de iconografía oficial.React Router DOM v6: Gestión de rutas y navegación dinámica.ComunicaciónFetch API: Para peticiones HTTP asíncronas.JWT (JSON Web Tokens): Sistema de autenticación mediante headers.🚀 Instalación y ConfiguraciónSigue estos pasos para desplegar el entorno de desarrollo:Clonar el repositorio e instalar paquetes:Bashgit clone <url-del-repo>
cd patitas-felices
npm install
Dependencias clave a instalar (si empiezas de cero):Bashnpm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom
Variables de Entorno:Asegúrate de que el backend esté corriendo en http://localhost:3000 o actualiza la constante API_BASE en Dashboard.tsx.Iniciar el proyecto:Bashnpm run dev
📐 Arquitectura de la SoluciónEl sistema implementa un Master CRUD Component, un patrón de diseño donde un único componente genérico maneja múltiples entidades basándose en esquemas dinámicos.Entidades SoportadasEntidadCampos PrincipalesUsuariosusername, email, password, roleMascotasname, race, b_date, dueno_idDueñosname, lastname, adress, phoneH. Clínicatext, user_id, mascotaid🔌 Integración de API y Ejemplos curlLa comunicación con el backend requiere un token de seguridad almacenado en localStorage.1. Obtener todos los registros (GET)Se ejecuta automáticamente al cargar la sección o al presionar "Refrescar".Bashcurl -X GET "http://localhost:3000/mascotas" \
 -H "Authorization: Bearer <TU_TOKEN_AQUÍ>" \
 -H "Content-Type: application/json" 2. Crear nuevo registro (POST)Utilizado por el modal dinámico de creación.Bashcurl -X POST "http://localhost:3000/usuarios" \
 -H "Authorization: Bearer <TU_TOKEN_AQUÍ>" \
 -H "Content-Type: application/json" \
 -d '{
"username": "vet_admin",
"email": "admin@patitas.com",
"password": "secretpassword",
"role": "admin"
}' 3. Actualizar registro (PUT)Se activa tras seleccionar un checkbox y modificar los campos en la tabla.Bashcurl -X PUT "http://localhost:3000/duenos/5" \
 -H "Authorization: Bearer <TU_TOKEN_AQUÍ>" \
 -H "Content-Type: application/json" \
 -d '{
"phone": "999-888-777",
"adress": "Nueva Calle 123"
}' 4. Eliminación Lógica/Física (DELETE)Bashcurl -X DELETE "http://localhost:3000/hclinica/12" \
 -H "Authorization: Bearer <TU_TOKEN_AQUÍ>"
🔐 Seguridad y AutenticaciónEl sistema incluye un helper de seguridad centralizado para todas las peticiones:TypeScript// utils/headers.ts
export const getAuthHeaders = () => {
const token = localStorage.getItem('token');
return {
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
};
};
[!IMPORTANT]Si el servidor responde con un status 401 o 403, el componente MasterCRUD disparará el callback onAuthError, notificando al usuario mediante un Snackbar global que su sesión ha expirado.📂 Estructura de Rutas/: Landing page informativa./index: Página de bienvenida post-login./login: Acceso al sistema./Dashboard: Panel administrativo principal (CRUD).

Back end
🐾 Sistema de Gestión Veterinaria API
Esta es una API robusta construida con Node.js, Express, y TypeScript, diseñada para la gestión de una clínica veterinaria. Incluye autenticación mediante JWT, control de acceso basado en roles (RBAC) con permisos cargados en memoria y validación de datos estricta.

🛠 Tecnologías y Dependencias
Core
Node.js & Express: Entorno de ejecución y framework web.

TypeScript: Lenguaje para tipado estático y mejor mantenibilidad.

MySQL2: Driver para la conexión con la base de datos SQL.

Seguridad y Auth
jsonwebtoken (JWT): Generación y validación de tokens de acceso.

bcrypt: Hash de contraseñas para almacenamiento seguro.

cors: Configuración de seguridad para peticiones entre dominios.

Utilidades
express-validator: Middleware para validación y sanitización de cuerpos de peticiones.

dotenv: Manejo de variables de entorno.

🚀 Instalación y Configuración

1. Requisitos previos
   Node.js (v16 o superior)

Instancia de MySQL corriendo.

2. Clonar e Instalar
   Bash
   git clone <tu-repositorio>
   cd <nombre-carpeta>
   npm install
3. Variables de Entorno
   Crea un archivo .env en la raíz del proyecto basándote en lo siguiente:

Fragmento de código
PORT=3000
JWT_SECRET=tu_secreto_mas_seguro_aqui
JWT_EXPIRES_IN=1h

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=stock_db
DB_CONNECTION_LIMIT=10 4. Ejecución
Bash

# Desarrollo (con recompilación automática)

npm run dev

# Producción

npm run build
npm start
🔐 Autenticación y Roles
El sistema utiliza un middleware de RBAC. Los permisos se cargan desde la base de datos a la RAM al iniciar el servidor para optimizar el rendimiento.

Estructura de Permiso: Rol:Acción (Ej: SuperAdmin:read).

📑 Documentación de Endpoints y Ejemplos (cURL)

1. Autenticación
   Registro de Usuario
   POST /login/register

Body: { "username": "admin", "email": "admin@vet.com", "password": "Password123!" }

Bash
curl -X POST http://localhost:3000/login/register \
 -H "Content-Type: application/json" \
 -d '{"username": "abel_garcia", "email": "abel@example.com", "password": "Password123!"}'
Login
POST /login

Body: { "email": "abel@example.com", "password": "Password123!" }

Bash
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"email": "abel@example.com", "password": "Password123!"}' 2. Mascotas (Protegido por JWT)
Obtener todas las mascotas
GET /mascotas

Permisos: veterinario:read o Dveterinario:read

Bash
curl -X GET http://localhost:3000/mascotas \
 -H "Authorization: Bearer <TU_TOKEN_AQUI>"
Crear nueva mascota
POST /mascotas

Body: { "name": "Firulais", "race": "Labrador", "b_date": "2022-01-01", "dueno_id": 1 }

Bash
curl -X POST http://localhost:3000/mascotas \
 -H "Authorization: Bearer <TU_TOKEN_AQUI>" \
 -H "Content-Type: application/json" \
 -d '{"name": "Rex", "race": "Pastor Alemán", "b_date": "2021-05-10", "dueno_id": 1}' 3. Dueños y Usuarios
Listar Usuarios (Solo SuperAdmin)
GET /usuarios

Permisos: SuperAdmin:read

Bash
curl -X GET http://localhost:3000/usuarios \
 -H "Authorization: Bearer <TU_TOKEN_AQUI>"
🛠 Manejo de Errores
La API cuenta con un manejador de errores global que centraliza las respuestas fallidas:

400 Bad Request: Errores de validación (express-validator) o sintaxis JSON.

401 Unauthorized: Token faltante o inválido.

403 Forbidden: El usuario no tiene el rol o permiso necesario.

404 Not Found: Recurso o ruta no encontrada.

500 Internal Server Error: Errores críticos del servidor.

💡 Notas del Desarrollador Senior
Seguridad CORS: El origen está restringido a http://localhost:5173. Si despliegas el frontend, asegúrate de actualizar esta lista blanca en app.ts.

Soft Delete: El sistema utiliza eliminación lógica (activo = 0) para preservar la integridad de los datos históricos.

Bootstrapping: El servidor no iniciará si la función loadPermissions() falla, garantizando que el sistema de seguridad siempre esté íntegro.

📦 Comandos de Instalación
Ejecuta estos comandos en la terminal de tu proyecto para asegurar que todo esté en su sitio:

1. Dependencias de Producción (las que tu API necesita para funcionar):
   npm install express mysql2 dotenv cors jsonwebtoken bcrypt express-validator
2. Dependencias de Desarrollo (herramientas de tipado y compilación):
   npm install -D typescript ts-node-dev @types/express @types/node @types/cors @types/jsonwebtoken @types/bcrypt @types/mysql2
   🛠️ Desglose de Tecnologías UsadasHe aquí la justificación técnica de cada una según el código que proporcionaste:DependenciaPropósito en tu ProyectoexpressEl framework base que gestiona tus rutas (/usuarios, /mascotas, etc.) y el ciclo de vida de las peticiones.mysql2Driver para conectar con tu base de datos MySQL. Usas la versión promise para manejar async/await en tus modelos.typescriptProporciona tipado fuerte. En tu código lo vemos en las interfaces de los DTOs y modelos.dotenvCarga las variables de entorno (DB_USER, JWT_SECRET) desde el archivo .env para que no estén "hardcodeadas".corsCrucial para que tu frontend en Vite (localhost:5173) pueda consumir la API sin ser bloqueado por el navegador.jsonwebtokenImplementa la seguridad. Genera el token en el login y lo verifica en el middleware authenticate.bcryptEncripta las contraseñas antes de guardarlas en la DB y las compara durante el inicio de sesión.express-validatorLa librería que usas en tus archivos de validators/ para asegurar que el email sea válido y el password sea fuerte.ts-node-dev(Desarrollo) Permite ejecutar archivos .ts directamente y reinicia el servidor automáticamente cuando haces cambios.

🏗️ Arquitectura de Datos (Flujo de Dependencias)
Tu proyecto sigue un flujo de N-Capas, donde cada dependencia actúa en un punto específico:

Capa de Entrada (Express + Express-validator): Recibe la petición y valida los datos.

Capa de Lógica (Services + JWT/Bcrypt): Procesa la lógica de negocio y maneja la seguridad.

Capa de Datos (MySQL2 + Pool): Ejecuta las queries SQL hacia la base de datos.

Gemini ha dicho
Entendido. Como desarrollador Senior, te he organizado las dependencias por categorías para que sepas exactamente qué hace cada una en tu arquitectura.

Para dejar tu proyecto listo, aquí tienes la lista de comandos de instalación y el desglose técnico.

📦 Comandos de Instalación
Ejecuta estos comandos en la terminal de tu proyecto para asegurar que todo esté en su sitio:

1. Dependencias de Producción (las que tu API necesita para funcionar):

Bash
npm install express mysql2 dotenv cors jsonwebtoken bcrypt express-validator 2. Dependencias de Desarrollo (herramientas de tipado y compilación):

Bash
npm install -D typescript ts-node-dev @types/express @types/node @types/cors @types/jsonwebtoken @types/bcrypt @types/mysql2
🛠️ Desglose de Tecnologías Usadas
He aquí la justificación técnica de cada una según el código que proporcionaste:

Dependencia Propósito en tu Proyecto
express El framework base que gestiona tus rutas (/usuarios, /mascotas, etc.) y el ciclo de vida de las peticiones.
mysql2 Driver para conectar con tu base de datos MySQL. Usas la versión promise para manejar async/await en tus modelos.
typescript Proporciona tipado fuerte. En tu código lo vemos en las interfaces de los DTOs y modelos.
dotenv Carga las variables de entorno (DB_USER, JWT_SECRET) desde el archivo .env para que no estén "hardcodeadas".
cors Crucial para que tu frontend en Vite (localhost:5173) pueda consumir la API sin ser bloqueado por el navegador.
jsonwebtoken Implementa la seguridad. Genera el token en el login y lo verifica en el middleware authenticate.
bcrypt Encripta las contraseñas antes de guardarlas en la DB y las compara durante el inicio de sesión.
express-validator La librería que usas en tus archivos de validators/ para asegurar que el email sea válido y el password sea fuerte.
ts-node-dev (Desarrollo) Permite ejecutar archivos .ts directamente y reinicia el servidor automáticamente cuando haces cambios.
🏗️ Arquitectura de Datos (Flujo de Dependencias)
Tu proyecto sigue un flujo de N-Capas, donde cada dependencia actúa en un punto específico:

Capa de Entrada (Express + Express-validator): Recibe la petición y valida los datos.

Capa de Lógica (Services + JWT/Bcrypt): Procesa la lógica de negocio y maneja la seguridad.

Capa de Datos (MySQL2 + Pool): Ejecuta las queries SQL hacia la base de datos.

📄 Script de package.json sugerido
Para que el proyecto arranque profesionalmente, asegúrate de tener estos scripts:

JSON
"scripts": {
"dev": "ts-node-dev --respawn --transpile-only src/app.ts",
"build": "tsc",
"start": "node dist/app.js"
}

El modelo MVC (Modelo-Vista-Controlador) es el patrón de arquitectura de software más utilizado para separar las responsabilidades de una aplicación. Su objetivo principal es que el código sea organizado, escalable y fácil de mantener.

Aquí tienes el desglose de sus tres componentes:

1. El Modelo (Model)
   Es la capa de los datos y la lógica de negocio.

Se encarga de interactuar con la base de datos.

Define las reglas: qué es un "Usuario", qué campos tiene una "Mascota", etc.

No sabe nada de cómo se verá la aplicación; solo maneja la información pura.

2. La Vista (View)
   Es la capa de la interfaz de usuario (lo que el cliente ve).

En tu proyecto, las vistas son los componentes de React.

Su única función es mostrar los datos que recibe del modelo y enviar los eventos del usuario (clicks, envíos de formulario) al controlador.

3. El Controlador (Controller)
   Es el intermediario o el "cerebro".

Recibe las peticiones del usuario desde la vista.

Pide la información necesaria al Modelo.

Envía esa información de vuelta a la Vista para que se actualice.

En el desarrollo con Node.js/Express, los controladores son las funciones que definen tus rutas (las que responden a los GET, POST, etc.).

¿Cómo funciona el flujo?
El Usuario realiza una acción (ej. click en "Ver Mascotas").

El Controlador capta esa ruta y le pide al Modelo la lista de mascotas de la base de datos SQL.

El Modelo devuelve los datos al controlador.

El Controlador le entrega los datos a la Vista.

La Vista se renderiza y el usuario ve su lista actualizada.

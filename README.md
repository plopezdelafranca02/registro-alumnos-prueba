# Registro de Alumnos

Prueba técnica realizada con las tecnologías Node.js Express y MySQL. La temática elegida es registro de alumnos.

## Instalación de dependencias

Para instalar las dependencias del proyecto, ejecute el siguiente comando en la raíz del proyecto (desde la terminal):
```bash
npm install express mysql2 body-parser ejs
```

### Configuración de la base de datos

1. MySQL debe estar instalado y ejecutándose en la máquina.
2. Acceda a phpMyAdmin y cree una base de datos llamada registro_alumnos.
3. Importe el archivo crear_tabla_alumnos.sql en la base de datos para crear la tabla alumnos (el archivo se encuentra en la raíz del proyecto).
4. Asegúrese de que el servidor MySQL esté corriendo en el puerto 3307. El archivo app.js está configurado para conectarse a la base de datos usando este puerto.

#### Ejecución del proyecto

Para ejecutar el proyecto, utilice el siguiente comando:
```bash
node app.js
```

El servidor escuchará en http://localhost:3000. Puede acceder a la aplicación en su navegador.

##### Estructura del proyecto

registro-alumnos-prueba/
│
├── node_modules/
├── views/
│   ├── alumnos.ejs
│   └── index.ejs
├── app.js
├── package.json
├── package-lock.json
└── crear_tabla_alumnos.sql
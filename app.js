// Importar dependencias
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Configuracion middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar conexion a la BDD
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'registro_alumnos',
    port: 3307
});

// Conectar a la BDD
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Ruta para mostrar formulario
app.get('/', (req, res) => {
    res.render('index'); 
});

// Ruta para manejar registros
app.post('/register', (req, res) => {
    const { nombre, email, telefono, edad, grado, fecha_inscripcion } = req.body;

    // Validaciones del lado del servidor
    if (!nombre || !email || !telefono || !edad || !grado || !fecha_inscripcion) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Validacion del formato del correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).send('Por favor, introduce un correo electrónico válido.');
    }

    // Validacion del formato del telefono
    const telefonoPattern = /^\d{9}$/;
    if (!telefonoPattern.test(telefono)) {
        return res.status(400).send('El teléfono debe contener exactamente 9 números.');
    }

    // Validacion de la edad
    const edadNum = parseInt(edad, 10); // Convertir la edad a numero
    if (edadNum < 0) {
        return res.status(400).send('La edad no puede ser negativa.'); // Respuesta si la edad es negativa
    }

    const sql = `INSERT INTO alumnos (nombre, email, telefono, edad, grado, fecha_inscripcion) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nombre, email, telefono, edad, grado, fecha_inscripcion], (err, result) => {
        if (err) {
            console.error('Error al registrar el alumno:', err);
            return res.status(500).send('Error al registrar el alumno.');
        }
        res.send('Alumno registrado exitosamente.');
    });
});

// Ruta para mostrar todos los registros
app.get('/alumnos', (req, res) => {
    const sql = 'SELECT * FROM alumnos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener los registros:', err);
            return res.status(500).send('Error al obtener los registros.');
        }
        res.render('alumnos', { alumnos: results }); // Pasar los registros a la vista
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

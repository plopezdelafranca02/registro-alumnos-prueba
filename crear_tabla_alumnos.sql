CREATE TABLE alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    edad INT NOT NULL,
    grado VARCHAR(50) NOT NULL,
    fecha_inscripcion DATE NOT NULL
);
const express = require('express');
const cors = require('cors');
const path = require('path'); // Para manejar rutas de archivos
const app = express();
const PORT = 3000;

let tasks = []; // Array para almacenar las tareas temporalmente

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname)));

// Servir el archivo index.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rutas de la API

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const newTask = { id: Date.now(), taskName: req.body.taskName, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Actualizar una tarea (toggle completado)
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
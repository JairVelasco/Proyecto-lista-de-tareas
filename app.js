document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const emptyTaskAlert = document.getElementById("emptyTaskAlert");

    const API_URL = "http://localhost:3000/api/tasks";

    // Función para renderizar tareas
    const renderTasks = async () => {
        taskList.innerHTML = ""; // Limpiar la lista
        try {
            const response = await fetch(API_URL);
            const tasks = await response.json();

            tasks.forEach(task => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.textContent = task.taskName;

                // Botón para eliminar la tarea
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-danger btn-sm";
                deleteBtn.textContent = "Eliminar";
                deleteBtn.addEventListener("click", () => deleteTask(task.id));

                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        } catch (error) {
            console.error("Error al obtener las tareas:", error);
        }
    };

    // Función para añadir una tarea
    const addTask = async () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            emptyTaskAlert.classList.remove("d-none");
            return;
        }

        emptyTaskAlert.classList.add("d-none");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taskName: taskText }),
            });

            if (response.ok) {
                taskInput.value = ""; // Limpiar el campo de entrada
                renderTasks(); // Actualizar la lista de tareas
            }
        } catch (error) {
            console.error("Error al añadir la tarea:", error);
        }
    };

    // Función para eliminar una tarea
    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                renderTasks(); // Actualizar la lista de tareas
            }
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    // Evento para añadir tarea al hacer clic en el botón
    addTaskBtn.addEventListener("click", addTask);

    // Evento para añadir tarea al presionar Enter
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Renderizar las tareas al cargar la página
    renderTasks();
});
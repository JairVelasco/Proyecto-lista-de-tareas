document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const emptyTaskAlert = document.getElementById("emptyTaskAlert");

    // Función para renderizar tareas en la lista
    const renderTask = (taskText, taskId) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = taskText;

        // Botón para eliminar la tarea
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(li); // Eliminar tarea de la lista
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Función para añadir una tarea
    const addTask = () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            emptyTaskAlert.classList.remove("d-none"); // Mostrar alerta
            return;
        }

        emptyTaskAlert.classList.add("d-none"); // Ocultar alerta
        renderTask(taskText); // Renderizar la nueva tarea
        taskInput.value = ""; // Limpiar el campo de entrada
    };

    // Evento para añadir tarea al hacer clic en el botón
    addTaskBtn.addEventListener("click", addTask);

    // Evento para añadir tarea al presionar Enter
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });
});
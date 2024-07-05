const inputTask = document.querySelector("#taskInput");
const btnTask = document.querySelector("#addTaskButton");
const amountT = document.querySelector("#amounttasks");
const finishedT = document.querySelector("#finishedtasks");
const list = document.querySelector("#tasks");
let proximoId = 4;

let tareas = [
    {id: 1, text: "hacer ejercicio", completa: true},
    {id: 2, text: "Estudiar para el examen", completa: false},
    {id: 3, text: "Limpiar la cocina", completa: true},
];


btnTask.addEventListener("click", () => {
    const tarea = inputTask.value.trim();
    if (tarea) {
        const nuevaTarea = {
            id: proximoId,
            text: tarea,
            completa: false
        };

        tareas.push(nuevaTarea);
        proximoId++;
        inputTask.value = "";

        renderTareas(tareas);
    }
});

function renderTareas(tareas) {
    list.innerHTML = "";
    const fragment = document.createDocumentFragment();

    for (const tarea of tareas) {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = tarea.id;
        tr.appendChild(tdId);

        const tdNombre = document.createElement("td");
        tdNombre.textContent = tarea.text; 
        tr.appendChild(tdNombre);

        const tdCompleta = document.createElement("td");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = tarea.completa;
        checkbox.addEventListener("click", () => estadoCompletado(tarea.id));

        tdCompleta.appendChild(checkbox);
        tr.appendChild(tdCompleta);

        const tdEliminar = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = "Eliminar";
        button.addEventListener("click", () => borrarTarea(tarea.id));
        tdEliminar.appendChild(button);
        tr.appendChild(tdEliminar);

        fragment.appendChild(tr);
    }

    list.appendChild(fragment);
    amountT.textContent = `${tareas.length}`;
    finishedT.textContent = `${tareas.filter(t => t.completa).length}`;
}

function borrarTarea(id) {
    const index = tareas.findIndex(ele => ele.id === id);

    if (index !== -1) {
        tareas.splice(index, 1);
        renderTareas(tareas);
    }
}
function estadoCompletado(id) {
    const index = tareas.findIndex(t => t.id === id);

    if (index !== -1) {
        tareas[index].completa = !tareas[index].completa;
        renderTareas(tareas);
    }
}

renderTareas(tareas);

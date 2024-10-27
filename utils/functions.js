export function addTask(newTask, nomInput, dateDebutInput, dureeTacheInput, descriptionInput, submitFormButton, tableElement, taskList) {

    // création des éléments du DOM pour la nouvelle tâche
    let trElement = document.createElement("tr");
    let tdElementNom = document.createElement("td");
    let tdElementDateDebut = document.createElement("td");
    let tdElementDuree = document.createElement("td");
    let tdElementDescription = document.createElement("td");
    let tdElementEdit = document.createElement("td");
    let tdElementDelete = document.createElement("td");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    // définition du contenu textuel et des attributs class
    tdElementNom.textContent = newTask.nom;
    tdElementNom.classList = ["px-2"];
    tdElementDateDebut.textContent = newTask.dateDebut;
    tdElementDateDebut.classList = ["px-2"];
    tdElementDuree.textContent = newTask.dureeTache;
    tdElementDuree.classList = ["px-2"];
    tdElementDescription.textContent = newTask.description;
    tdElementDescription.classList = ["px-2"];
    editButton.textContent = "Modifier";
    editButton.classList = ["bg-neutral-500 hover:bg-neutral-700 text-white font-bold px-2 rounded"];
    deleteButton.textContent = "Supprimer";
    deleteButton.classList = ["bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded"];

    // ajout d'éléments du DOM
    tdElementEdit.appendChild(editButton);
    tdElementDelete.appendChild(deleteButton);
    trElement.appendChild(tdElementNom);
    trElement.appendChild(tdElementDateDebut);
    trElement.appendChild(tdElementDuree);
    trElement.appendChild(tdElementDescription);
    trElement.appendChild(tdElementEdit);
    trElement.appendChild(tdElementDelete);
    tableElement.appendChild(trElement);

    if (localStorage.getItem("taskList").includes(JSON.stringify(newTask))) {

        console.log("Tâche déjà présente en stockage local");

    } else {

        // ajout de la nouvelle tâche dans ma taskList
        taskList.push(newTask);
        console.log("taskList :", taskList);
        // mais aussi dans le localStorage
        localStorage.setItem("taskList", JSON.stringify(taskList));
        console.log("localStorage :", localStorage);

        // Les valeurs des champs sont réinitialisées
        nomInput.value = "";
        dateDebutInput.value = "";
        dureeTacheInput.value = "";
        descriptionInput.value = "";

    }

    return [editButton, deleteButton, tdElementNom, tdElementDateDebut, tdElementDuree, tdElementDescription, trElement];

}

export function editTask(updatingTaskTableElements, updatingTask, nomInput, dateDebutInput, dureeTacheInput, descriptionInput, taskList) {

    let updatedTask = {
        nom: nomInput.value,
        dateDebut: dateDebutInput.value,
        dureeTache: dureeTacheInput.value,
        description: descriptionInput.value
    };

    let localStTaskList = localStorage.getItem("taskList");
    localStTaskList = localStTaskList.replace(JSON.stringify(updatingTask), JSON.stringify(updatedTask));
    localStorage.setItem("taskList", localStTaskList);
    taskList = JSON.parse(localStorage.getItem("taskList"));
    console.log(localStorage);
    console.log(taskList);

    updatingTaskTableElements.nom.textContent = nomInput.value;
    updatingTaskTableElements.dateDebut.textContent = dateDebutInput.value;
    updatingTaskTableElements.dureeTache.textContent = dureeTacheInput.value;
    updatingTaskTableElements.description.textContent = descriptionInput.value;

}

export function deleteTask(trElement, taskList, newTask) {
    trElement.remove();

    let localStTaskList = localStorage.getItem("taskList");
    if (taskList.length === 1) {
        localStTaskList = localStTaskList.replace(JSON.stringify(newTask), "");
    } else {
        localStTaskList = localStTaskList.replace("," + JSON.stringify(newTask), "");
    }

    localStorage.setItem("taskList", localStTaskList);
    taskList = JSON.parse(localStorage.getItem("taskList"));
    console.log(localStorage);
    console.log(taskList);
}
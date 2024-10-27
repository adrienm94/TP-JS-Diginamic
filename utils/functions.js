export function addTask(newTask, nomInput, dateDebutInput, dureeTacheInput ,descriptionInput, submitFormButton, tableElement, taskList) {

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
        console.log("taskList :",taskList);
        // mais aussi dans le localStorage
        localStorage.setItem("taskList", JSON.stringify(taskList));
        console.log("localStorage :", localStorage);

        // Les valeurs des champs sont réinitialisées
        nomInput.value = "";
        dateDebutInput.value = "";
        dureeTacheInput.value = "";
        descriptionInput.value = "";

    }

    return [editButton, deleteButton, tdElementNom, tdElementDateDebut, tdElementDuree, tdElementDescription];

}

export function editTask(newTask, nomInput, dateDebutInput, dureeTacheInput, descriptionInput, submitFormButton, tdElementNom, tdElementDateDebut, tdElementDuree, tdElementDescription, taskList) {

    // Le bouton de soumission change de texte
    submitFormButton.textContent = "Enregistrer";

    // Remplissage des champs de formulaire par les valeurs de la tâche à modifier
    nomInput.value = newTask.nom;
    dateDebutInput.value = newTask.dateDebut;
    dureeTacheInput.value = newTask.dureeTache;
    descriptionInput.value = newTask.description;

    let updatingTaskTableElements = {
        nom: tdElementNom,
        dateDebut: tdElementDateDebut,
        dureeTache: tdElementDuree,
        description: tdElementDescription
    }

    let updatingTask = {
        nom: nomInput.value,
        dateDebut: dateDebutInput.value,
        dureeTache: dureeTacheInput.value,
        description: descriptionInput.value
    }

    return [updatingTaskTableElements,updatingTask];

}
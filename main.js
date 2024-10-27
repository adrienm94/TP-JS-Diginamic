import { addTask, editTask } from "./utils/functions.js";

// Récupère nos éléments HTML et on les stocke
let formElement = document.getElementById("form");
let nomInput = formElement.querySelector("#nom");
let dateDebutInput = formElement.querySelector("#date-debut");
let dureeTacheInput = formElement.querySelector("#duree-tache");
let descriptionInput = formElement.querySelector("#description");
let submitFormButton = document.getElementById("submit-btn");
let tableElement = document.getElementById("tasks");

// Tableau qui stockera nos taches
let taskList;
// Objet qui servira pour récupérer ce que retourne la fonction editTask
let resEditTask = {};

// utilisation du localStorage pour stocker les tâches afin qu'elles restent disponibles après
// un rechargement de la page
console.log(localStorage.getItem("taskList"));
if (!localStorage.getItem("taskList")) {
    taskList = [];
    localStorage.setItem("taskList", taskList.toString());
} else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
    for (const task of taskList) {

        let newTask = {
            nom: task.nom,
            dateDebut: task.dateDebut,
            dureeTache: task.dureeTache,
            description: task.description
        };

        let resAddTask = addTask(newTask, nomInput, dateDebutInput, dureeTacheInput ,descriptionInput, submitFormButton, tableElement, taskList);
        console.log(taskList);
        let editButton = resAddTask[0];
        let deleteButton = resAddTask[1];
        let tdElementNom = resAddTask[2];
        let tdElementDateDebut = resAddTask[3];
        let tdElementDuree = resAddTask[4];
        let tdElementDescription = resAddTask[5];

        // Gestion des événements pour le bouton Modifier
        editButton.addEventListener("click", (event) => {

            resEditTask = editTask(newTask, nomInput, dateDebutInput, dureeTacheInput, descriptionInput, submitFormButton, tdElementNom, tdElementDateDebut, tdElementDuree, tdElementDescription, taskList);
            
        })

        // Gestion des événements pour le bouton Supprimer
        deleteButton.addEventListener("click", (event) => {
            trElement.remove();
            let localStTaskList = localStorage.getItem("taskList");
            if (taskList.length === 1) {
                localStTaskList = localStTaskList.replace(JSON.stringify(newTask), "");
            } else {
                localStTaskList = localStTaskList.replace(","+JSON.stringify(newTask), "");
            }
            localStorage.setItem("taskList", localStTaskList);
            taskList = JSON.parse(localStorage.getItem("taskList"));
            console.log(localStorage);
            console.log(taskList);
        })
    }
}

// Depuis la variable form, je lui affecte un évènement de type submit (soumission de formulaire)
formElement.addEventListener("submit", (event) => {

    // empêche le rechargement de la page
    event.preventDefault();

    // Si formulaire d'ajout
    if (submitFormButton.textContent === "Ajouter une tâche") {

        if (!(nomInput.value !== "" && dateDebutInput.value !== "" && dureeTacheInput.value !== "" && descriptionInput.value !== "")) {
            alert("Les champs ne doivent pas être vides !");
        } else {

            let newTask = {
                nom: nomInput.value,
                dateDebut: dateDebutInput.value,
                dureeTache: dureeTacheInput.value,
                description: descriptionInput.value
            };

            let resAddTask = addTask(newTask, nomInput, dateDebutInput, dureeTacheInput ,descriptionInput, submitFormButton, tableElement, taskList);
            console.log(taskList);
            let editButton = resAddTask[0];
            let deleteButton = resAddTask[1];
            let tdElementNom = resAddTask[2];
            let tdElementDateDebut = resAddTask[3];
            let tdElementDuree = resAddTask[4];
            let tdElementDescription = resAddTask[5];

            // Gestion des événements pour le bouton Modifier
            editButton.addEventListener("click", (event) => {

                resEditTask = editTask(newTask, nomInput, dateDebutInput, dureeTacheInput, descriptionInput, submitFormButton, tdElementNom, tdElementDateDebut, tdElementDuree, tdElementDescription, taskList);
                
            });

            // Gestion des événements pour le bouton Supprimer
            deleteButton.addEventListener("click", (event) => {
                trElement.remove();
                let localStTaskList = localStorage.getItem("taskList");
                if (taskList.length === 1) {
                    localStTaskList = localStTaskList.replace(JSON.stringify(newTask), "");
                } else {
                    localStTaskList = localStTaskList.replace(","+JSON.stringify(newTask), "");
                }
                
                localStorage.setItem("taskList", localStTaskList);
                taskList = JSON.parse(localStorage.getItem("taskList"));
                console.log(localStorage);
                console.log(taskList);
            });
        }



    } else if (submitFormButton.textContent === "Enregistrer") {

        if (!(nomInput.value !== "" && dateDebutInput.value !== "" && dureeTacheInput.value !== "" && descriptionInput.value !== "")) {
            alert("Les champs ne doivent pas être vides !");
        } else {

            let updatingTaskTableElements = resEditTask[0];
            let updatingTask = resEditTask[1];

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
    
            submitFormButton.textContent = "Ajouter une tâche";
        }       
}

})
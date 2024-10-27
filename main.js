import { addTask, editTask, deleteTask } from "./utils/functions.js";

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

// Objets qui serviront à récupérer les tâches à mettre à jour
let updatingTaskTableElements = {};
let updatingTask = {};

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

        let resAddTask = addTask(newTask, nomInput, dateDebutInput, dureeTacheInput, descriptionInput, submitFormButton, tableElement, taskList);
        console.log(taskList);
        let editButton = resAddTask[0];
        let deleteButton = resAddTask[1];
        let tdElementNom = resAddTask[2];
        let tdElementDateDebut = resAddTask[3];
        let tdElementDuree = resAddTask[4];
        let tdElementDescription = resAddTask[5];
        let trElement = resAddTask[6];

        // Gestion des événements pour le bouton Modifier
        editButton.addEventListener("click", (event) => {

            // Le bouton de soumission change de texte
            submitFormButton.textContent = "Enregistrer";

            // Remplissage des champs de formulaire par les valeurs de la tâche à modifier
            nomInput.value = newTask.nom;
            dateDebutInput.value = newTask.dateDebut;
            dureeTacheInput.value = newTask.dureeTache;
            descriptionInput.value = newTask.description;

            updatingTaskTableElements = {
                nom: tdElementNom,
                dateDebut: tdElementDateDebut,
                dureeTache: tdElementDuree,
                description: tdElementDescription
            }

            updatingTask = {
                nom: nomInput.value,
                dateDebut: dateDebutInput.value,
                dureeTache: dureeTacheInput.value,
                description: descriptionInput.value
            }

        })

        // Gestion des événements pour le bouton Supprimer
        deleteButton.addEventListener("click", (event) => {

            deleteTask(trElement, taskList, newTask);

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

            let resAddTask = addTask(newTask, nomInput, dateDebutInput, dureeTacheInput, descriptionInput, submitFormButton, tableElement, taskList);
            console.log(taskList);
            let editButton = resAddTask[0];
            let deleteButton = resAddTask[1];
            let tdElementNom = resAddTask[2];
            let tdElementDateDebut = resAddTask[3];
            let tdElementDuree = resAddTask[4];
            let tdElementDescription = resAddTask[5];
            let trElement = resAddTask[6];

            // Gestion des événements pour le bouton Modifier
            editButton.addEventListener("click", (event) => {

                // Le bouton de soumission change de texte
                submitFormButton.textContent = "Enregistrer";

                // Remplissage des champs de formulaire par les valeurs de la tâche à modifier
                nomInput.value = newTask.nom;
                dateDebutInput.value = newTask.dateDebut;
                dureeTacheInput.value = newTask.dureeTache;
                descriptionInput.value = newTask.description;

                updatingTaskTableElements = {
                    nom: tdElementNom,
                    dateDebut: tdElementDateDebut,
                    dureeTache: tdElementDuree,
                    description: tdElementDescription
                }

                updatingTask = {
                    nom: nomInput.value,
                    dateDebut: dateDebutInput.value,
                    dureeTache: dureeTacheInput.value,
                    description: descriptionInput.value
                }

            });

            // Gestion des événements pour le bouton Supprimer
            deleteButton.addEventListener("click", (event) => {
                
                deleteTask(trElement, taskList, newTask);

            });
        }



    } else if (submitFormButton.textContent === "Enregistrer") {

        if (!(nomInput.value !== "" && dateDebutInput.value !== "" && dureeTacheInput.value !== "" && descriptionInput.value !== "")) {
            alert("Les champs ne doivent pas être vides !");
        } else {
            editTask(updatingTaskTableElements, updatingTask, nomInput, dateDebutInput, dureeTacheInput, descriptionInput, taskList);
            submitFormButton.textContent = "Ajouter une tâche";
        }
    }

})
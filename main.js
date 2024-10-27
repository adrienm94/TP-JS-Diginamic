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

let updatingTask = {};
let updatingTaskTableElements = {};

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
        tdElementNom.textContent = task.nom;
        tdElementNom.classList = ["px-2"];
        tdElementDateDebut.textContent = task.dateDebut;
        tdElementDateDebut.classList = ["px-2"];
        tdElementDuree.textContent = task.dureeTache;
        tdElementDuree.classList = ["px-2"];
        tdElementDescription.textContent = task.description;
        console.log(tdElementDescription.textContent);
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

            // ajout de la nouvelle tâche dans ma taskList
            taskList.push(newTask);
            // mais aussi dans le localStorage
            localStorage.setItem("taskList", JSON.stringify(taskList));
            console.log(localStorage);

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
            tdElementNom.textContent = nomInput.value;
            tdElementNom.classList = ["px-2"];
            tdElementDateDebut.textContent = dateDebutInput.value;
            tdElementDateDebut.classList = ["px-2"];
            tdElementDuree.textContent = dureeTacheInput.value;
            tdElementDuree.classList = ["px-2"];
            tdElementDescription.textContent = descriptionInput.value;
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

            // Les valeurs des champs sont réinitialisées
            nomInput.value = "";
            dateDebutInput.value = "";
            dureeTacheInput.value = "";
            descriptionInput.value = "";

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
                };

                updatingTask = {
                    nom: nomInput.value,
                    dateDebut: dateDebutInput.value,
                    dureeTache: dureeTacheInput.value,
                    description: descriptionInput.value
                };
                
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
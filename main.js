

const loadBtn = document.getElementById("loadBtn");
const promiseBtn = document.getElementById("promiseBtn");

const status = document.getElementById("status");
const usersContainer = document.getElementById("usersContainer");


const API_URL = "https://jsonplaceholder.typicode.com/users";



function validateEmail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}



function renderUsersRecursive(users, index = 0) {

    if (index >= users.length) {
        return;
    }

    const user = users[index];


    const card = document.createElement("div");
    card.className = "user-card";

    
    const name = document.createElement("h3");
    name.textContent = user.name;


    const username = document.createElement("p");
    username.textContent = "Username: " + user.username;


    const email = document.createElement("p");
    email.textContent = "Email: " + user.email;

  
    const emailCheck = document.createElement("p");

    if (validateEmail(user.email)) {
        emailCheck.textContent = "Email корректный";
        emailCheck.className = "valid";
    } else {
        emailCheck.textContent = "Email некорректный";
        emailCheck.className = "invalid";
    }

   
    const company = document.createElement("p");
    company.textContent = "Компания: " + user.company.name;

    
    card.appendChild(name);
    card.appendChild(username);
    card.appendChild(email);
    card.appendChild(emailCheck);
    card.appendChild(company);

    usersContainer.appendChild(card);

    renderUsersRecursive(users, index + 1);
}



function showUsers(users) {

  
    usersContainer.innerHTML = "";

    
    renderUsersRecursive(users);

}


async function loadUsers() {

    try {

        
        status.textContent = "Загрузка данных...";
        status.className = "";

       
        usersContainer.innerHTML = "";

       
        loadBtn.disabled = true;
        promiseBtn.disabled = true;

        const response = await fetch(API_URL);

   
        if (!response.ok) {
            throw new Error("Ошибка сервера: " + response.status);
        }

       
        const users = await response.json();

     
        showUsers(users);

        
        status.textContent =
            "Успешно загружено пользователей: " + users.length;

        status.className = "success";

    } catch (error) {

        
        status.textContent =
            "Ошибка загрузки: " + error.message;

        status.className = "error";

        console.log(error);

    } finally {

       
        loadBtn.disabled = false;
        promiseBtn.disabled = false;

    }
}



function loadUsersPromise() {

   
    status.textContent = "Загрузка через Promise...";
    status.className = "";

    usersContainer.innerHTML = "";

    
    loadBtn.disabled = true;
    promiseBtn.disabled = true;

  
    fetch(API_URL)

        .then(response => {

            if (!response.ok) {
                throw new Error("Ошибка сервера: " + response.status);
            }

            return response.json();

        })

        .then(users => {

            
            showUsers(users);

            status.textContent =
                "Успешно загружено через Promise: " + users.length;

            status.className = "success";

        })

        .catch(error => {

            status.textContent =
                "Ошибка: " + error.message;

            status.className = "error";

            console.log(error);

        })

        .finally(() => {

   
            loadBtn.disabled = false;
            promiseBtn.disabled = false;

        });
}





loadBtn.addEventListener("click", loadUsers);


promiseBtn.addEventListener("click", loadUsersPromise);



async function loadUsers() {
    const response = await fetch(API_URL);
    const users = await response.json();
}



fetch(API_URL)
    .then(response => response.json())
    .then(users => console.log(users))
    .catch(error => console.log(error));


    function renderUsersRecursive(users, index = 0) {

    if (index >= users.length) {
        return;
    }

    console.log(users[index].name);

    renderUsersRecursive(users, index + 1);
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(emailRegex.test("test@gmail.com"));

try {
    const response = await fetch(API_URL);
    const users = await response.json();

} catch (error) {
    console.log(error);
}
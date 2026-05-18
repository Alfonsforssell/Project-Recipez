function tagInput() {
    const input = document.getElementById("ingredientInput");
    const tagsContainer = document.getElementById("tags");

    let ingredients = [];

    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && input.value.trim() !== "") {
            e.preventDefault();

            const value = input.value.trim();
            ingredients.push(value);

            createTag(value);
            input.value = "";
        }
    });

    function createTag(text) {
        const tag = document.createElement("div");
        tag.classList.add("tag");

        tag.innerHTML = `
        ${text}
        <span>&times;</span>
    `;

        tag.querySelector("span").addEventListener("click", () => {
            tag.remove();
            ingredients = ingredients.filter(i => i !== text);
        });

        tagsContainer.appendChild(tag);
    }
}

function getDietaryImgById(id) {
    for (let diet of dietary) {
        if (diet.id === id) {
            return diet.imageUrl;
        }
    }
}

function createProducts() {
    let cards = document.getElementById("cards");

    for (let dish of dishes) {
        let div = document.createElement("a");
        div.innerHTML = `
        <img class="cardImg" src="${dish.imageUrl}" alt="">
                <h1>${dish.name}</h1>
                <p>${dish.description}</p>
                <div class="info">
                    <h2>${dish.time} min</h2>
                    <h2>${dish.country}</h2>
                </div>
        `;

        for (let i = 1; i < 8; i++) {
            if (dish.dietary.includes(i)) {
                let info = div.querySelector(".info");
                let img = document.createElement("img");
                img.src = getDietaryImgById(i);
                img.classList.add("icon");
                info.appendChild(img);
            }
        }
        cards.appendChild(div);
        div.classList.add("card");
    }
}

function createForm(){

}

function submitFilter(){

}

function createProductPage(){

}

function createProfilePage(user){

}

function signUp() {
    let signUpForm = document.getElementById("signUpForm");
    signUpForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        let userData = saveData();

        let username = signUpForm.elements.username.value; 
        let password = signUpForm.elements.password.value; 
        let repeatPassword = signUpForm.elements.repeatPassword.value; 

        if (password != repeatPassword) {
            console.log("Lösenorden matchar inte!");
            return;
        }

        let body = {
            name: username,
            password: password,
            repeatPassword: repeatPassword
        }

        try {
            await postRequest("http://localhost:8000/api/users", body);
            console.log("Konto skapat!"); 
        }
        catch(err) {
            console.log(err.message);
        }
    })
}

function login() {
    let loginForm = document.getElementById("loginForm"); 
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault(); 

        let body = {
            name: loginForm.elements.username.value,
            password: loginForm.elements.password.value
        }

        try {
            await postRequest("http://localhost:8000/api/login", body); 
        } catch (err) {
            console.log(err.message);
        }
    })
}
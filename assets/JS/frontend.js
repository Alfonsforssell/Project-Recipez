async function saveData() {
    dishes = await getRequest("http://localhost:8000/api/dishes");
    dietaries = await getRequest("http://localhost:8000/api/dietary");
    countries = await getRequest("http://localhost:8000/api/dishes/countries");
}

function tagInput() {
    const input = document.getElementById("ingredientInput");
    const tagsContainer = document.getElementById("tags");

    let ingredients = [];

    input.addEventListener("keydown", function (e) {
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
    for (let diet of dietaries) {
        if (diet.id === id) {
            return diet.imageUrl;
        }
    }
}

function createProducts() {
    let cards = document.getElementById("cards");

    for (let dish of dishes) {
        let div = document.createElement("a");
        div.href = "productPage.html?id=" + dish.id;
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

function createForm() {
    let form = document.querySelector("form");
    let selectCountry = form.elements.country;
    let selectTime = form.elements.time;
    let selectDietary = form.elements.preference;

    for (let country of countries) {
        let option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        selectCountry.appendChild(option);
    }

    for (let diet of dietaries) {
        let option = document.createElement("option");
        option.value = diet.name;
        option.textContent = diet.name;
        selectDietary.appendChild(option);
    }
}

function submitFilter() {

}

function createProductPage() {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let chosenDish;

    for (let dish of dishes) {
        if (dish.id == id) {
            chosenDish = dish;
        }
    }
    let container = document.getElementById("container")

    if (!chosenDish) {
        container.innerHTML = `
        <a href="index.html">← Back to dishes</a>
            <h1>dish not found</h1>`;
        return;
    }

    let ingredientsHtml = "";
    for (let ingredient of chosenDish.ingredients) {
        ingredientsHtml += `<li><h2>${ingredient}</h2></li>
        `;
    }

    let dietHtml = "";
    for (let diet of chosenDish.dietary) {
        let imageUrl = getDietaryImgById(diet);

        if (imageUrl) {
            dietHtml += `
            <img src="${imageUrl}" alt="">
            `;
        }
    }


    container.innerHTML = `
    <div class="image">
    <img src="${chosenDish.imageUrl}" alt="${chosenDish.name}">
    </div>
    <div class="text">
        <div id="info">
            <h1>${chosenDish.name}</h1>
            <div class="stats">
                <h2>${chosenDish.country}</h2>
                <h2>${chosenDish.time}</h2>
                ${dietHtml}
        </div>

        <p>${chosenDish.description}</p>
    </div>

    <div id="cook">
        <div class="ingredients">
            <h1>Ingredients</h1>
            <ul>
            ${ingredientsHtml}
            </ul>
        </div> 
        <div class="instructions">
            <h1>Instructions</h1>
            <h2>${chosenDish.instructions}</h2>
        </div>
    </div>
    </div>
    </div>
    `;
}

function createProfilePage(user) {
    let profileCard = document.querySelector(".profileCard");
    let cards = document.getElementById("cards");

    if (!user) {
        profileCard.innerHTML = `
            <h2>Du är inte inloggad</h2>
            <a href="login.html" class="editPageBtn">Logga in</a>
        `;

        cards.innerHTML = "";
        return;
    }

    profileCard.innerHTML = `
    <h2>${user.name}</h2>
    


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
        catch (err) {
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
            window.location.href = "profilePage.html";
        } catch (err) {
            console.log(err.message);
        }
    })
}

let countries = [];
let dishes = [];
let dietaries = [];

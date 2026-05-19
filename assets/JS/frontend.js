async function saveData() {
    dishes = await getRequest("http://localhost:8000/api/dishes");
    dietaries = await getRequest("http://localhost:8000/api/dietary");
    countries = await getRequest("http://localhost:8000/api/dishes/countries");
}

function tagInput() {
    const input = document.getElementById("ingredientInput");
    const tagsContainer = document.getElementById("tags");

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && input.value.trim() !== "") {
            e.preventDefault();

            const value = input.value.trim();
            ingredients.push(value);

            createTagAdd(value);
            input.value = "";
        }
    });
}

function createTagAdd(text) {
    const input = document.querySelector("#addDish #ingredientInput");
    const tagsContainer = document.querySelector("#addDish #tags");
    const tag = document.createElement("div");
    tag.classList.add("tag");

    tag.innerHTML = `
        ${text}
        <span>✖</span>
    `;

    tag.querySelector("span").addEventListener("click", () => {
        tag.remove();
        let newIngredients = [];
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i] !== text) {
                newIngredients.push(ingredients[i]);
            }
        }
        ingredients = newIngredients;
    });

    tagsContainer.appendChild(tag);
}

function createTagChange(text) {
    const input = document.querySelector("#changeDish #ingredientInput");
    const tagsContainer = document.querySelector("#changeDish #tags");
    const tag = document.createElement("div");
    tag.classList.add("tag");

    tag.innerHTML = `
        ${text}
        <span>✖</span>
    `;

    tag.querySelector("span").addEventListener("click", () => {
        tag.remove();
        let newIngredients = [];
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i] !== text) {
                newIngredients.push(ingredients[i]);
            }
        }
        ingredients = newIngredients;
    });

    tagsContainer.appendChild(tag);
}

function getDietaryImgById(id) {
    for (let diet of dietaries) {
        if (diet.id === id) {
            return diet.imageUrl;
        }
    }
}

function createProducts(filteredDishes = dishes) {
    let cards = document.getElementById("cards");
    cards.innerHTML = "";

    for (let dish of filteredDishes) {
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
        option.value = diet.id;
        option.textContent = diet.name;
        selectDietary.appendChild(option);
    }
}

function submitFilter() {
    let button = document.getElementById("filterbutton");
    button.addEventListener("click", async function (e) {
        e.preventDefault();

        let form = document.querySelector("form");
        let countryValue = form.elements.country.value;
        let timeValue = form.elements.time.value;
        let dietaryValue = form.elements.preference.value;

        let queryParts = [];

        if (!countryValue.includes("All")) {
            queryParts.push("country=" + countryValue);
        }

        if (!timeValue.includes("All")) {
            queryParts.push("time=" + timeValue);
        }

        if (!dietaryValue.includes("All")) {
            queryParts.push("dietary=" + dietaryValue);
        }

        let queryString = queryParts.join("&");
        let url = "http://localhost:8000/api/dishes";

        if (queryString) {
            url += "?" + queryString;
        }

        try {
            let dishes = await getRequest(url);
            createProducts(dishes);
        } catch (err) {
            console.log(err.message);
        }
    })
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

    let instructions = chosenDish.instructions.split(".");
    let printInstructions = instructions.join(".<br>");

    container.innerHTML = `
    <div class="image">
    <img src="${chosenDish.imageUrl}" alt="${chosenDish.name}">
    </div>
    <div class="text">
        <div id="info">
            <h1>${chosenDish.name}</h1>
            <div class="stats">
                <h2>${chosenDish.country}</h2>
                <h2>${chosenDish.time} min</h2>
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
            <h2>${printInstructions}</h2>
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
    <p><span>Bio:</span> ${user.bio}</p>
    <p><span>Favoriter:</span> ${user.favourites.length} st</p>
    <p><span>Ursprung:</span> ${user.origin}</p>
    <a href="#" class="editPageBtn">Redigera rätter</a>
    <a href="#" class="logout">Logga ut</a>
    `;

    let favouritesHtml = "";
    for (let favouriteId of user.favourites) {
        for (let dish of dishes) {
            if (dish.id == favouriteId) {

                let dietHtml = "";

                for (let diet of dish.dietary) {
                    let imageUrl = getDietaryImgById(diet);

                    if (imageUrl) {
                        dietHtml += `
                            <img class="icon" src="${imageUrl}" alt="">
                        `;
                    }
                }

                favouritesHtml += `
                    <a class="card" href = "productPage.html?id=${dish.id}">
                        <img class="cardImg" src="${dish.imageUrl}" alt="${dish.name}">
                        <h1>${dish.name}</h1>
                        <p>${dish.description}</p>
                        <div class="info">
                        <h2>${dish.time}min</h2>
                        <h2>${dish.country}</h2>
                        ${dietHtml}
                        </div>
                        </a>
                        `;
            }
        }
    }
    if (favouritesHtml === "") {
        favouritesHtml = `
        <p> du har inga favoriträtter ännu.</p>
        `;
    }
    cards.innerHTML = favouritesHtml;
}

function signUp() {
    let signUpForm = document.getElementById("signUpForm");
    signUpForm.addEventListener("submit", async function (e) {
        e.preventDefault();

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
            let res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body)
            })

            if (!res.ok) {
                console.log("Login failed");
                return;
            }

            window.location.href = "profilePage.html";
        } catch (err) {
            console.log(err.message);
        }
    })
}

async function loadProfilePage() {
    try {
        let res = await fetch("http://localhost:8000/api/profile", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json"
            }
        }); 

        if (!res.ok) {
            window.location.href = "login.html";
            return; 
        }
        let user = await res.json();
        createProfilePage(user);
    } catch (err) {
        console.log(err.message);
    }
}

function search() {
    let searchBtn = document.getElementById("searchbutton");
    searchBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        let search = document.getElementById("searchValue").value;
        let result = await getRequest("http://localhost:8000/api/dishes/search?q=" + search);
        createProducts(result);
    })
}
async function addDish() {
    let addForm = document.getElementById("addDish");
    let addButton = document.querySelector(".btn");
    let selectCountry = document.querySelector("#addDish").elements.country;
    for (let dish of dishes) {
        let option = document.createElement("option");
        option.textContent = dish.country;
        option.value = dish.country;
        selectCountry.appendChild(option);
    }


    addButton.addEventListener("click", async function (e) {
        e.preventDefault()

        let dietary = [];
        let checkboxes = document.querySelectorAll(".dietary");
        
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                dietary.push(Number(checkbox.value));
            }
        }



        let body = {
            name: addForm.elements.name.value,
            description: addForm.elements.description.value,
            country: addForm.elements.country.value,
            time: Number(addForm.elements.time.value),
            dietary: dietary,
            ingredients: ingredients,
            instructions: addForm.elements.instructions.value,
            imageUrl: addForm.elements.image.value
        }

        console.log(body);

        await postRequest("http://localhost:8000/api/dishes", body);
        alert("Dish created");

    });
}

function autoFillInformationChangeDelete() {
    let form = document.querySelector("#changeDish");
    let name = form.elements.name;
    let selectCountry = form.elements.country;
    let inputDescription = form.elements.description;
    let inputTime = form.elements.time;
    let dietCheckboxes = [];
    let ingredientsTags = [];
    let inputInstructions = form.elements.instructions;
    let inputImage = form.elements.image;
    let checkBoxes = document.querySelectorAll("#changeDish .dietary");

    for (let dish of dishes) {
        let option = document.createElement("option");
        option.textContent = dish.name;
        option.value = dish.name;
        name.appendChild(option);
    }

    for (let dish of dishes) {
        let option = document.createElement("option");
        option.textContent = dish.country;
        option.value = dish.country;
        selectCountry.appendChild(option);
    }

    inputDescription.value = "";
    selectCountry.value = "none";
    inputTime.value = "";
    inputInstructions.value = "";
    inputImage.value = "";
    for (let box of checkBoxes) {
        box.checked = false;
    }

    name.addEventListener("change", function (e) {
        for (let dish of dishes) {
            if (dish.name == name.value) {
                inputDescription.value = dish.description;
                selectCountry.value = dish.country;
                inputTime.value = dish.time;
                inputInstructions.value = dish.instructions;
                inputImage.value = dish.imageUrl;

                for (let box of checkBoxes) {
                    box.checked = dish.dietary.includes(parseInt(box.value));
                }

                for (let ingredient of dish.ingredients) {
                    createTagChange(ingredient);
                }
            }
        }
    })
}

function deleteDish() {
    let btn = document.querySelector(".deleteBtn");
    btn.addEventListener("click", async function (e) {
        e.preventDefault();

        let form = document.querySelector("#changeDish");
        let selectedDish = form.elements.name.value;
        let selectedID;

        for (let dish of dishes) {
            if (dish.name == selectedDish) {
                selectedID = dish.id;
            }
        }
        
        await deleteRequest("http://localhost:8000/api/dishes/" + selectedID);
        alert("Dish removed");
    })
}

function changeDish() {
    let btn = document.querySelector(".changeBtn");
    btn.addEventListener("click", async function (e) {
        e.preventDefault();

        let form = document.querySelector("#changeDish");
        let selectedDish = form.elements.name.value;

        let dietary = [];
        let checkboxes = document.querySelectorAll(".dietary");

        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                dietary.push(Number(checkbox.value));
            }
        }

        let body = {
            name: form.elements.name.value,
            description: form.elements.description.value,
            country: form.elements.country.value,
            time: form.elements.time.value,
            dietary: dietary,
            ingredients: ingredients,
            instructions: form.elements.instructions.value,
            imageUrl: form.elements.image.value
        }
        console.log(body);
        await patchRequest("http://localhost:8000/api/dishes/" + selectedDish, body);
        alert("Dish changed");
    })
}

let countries = [];
let dishes = [];
let dietaries = [];
let ingredients = [];

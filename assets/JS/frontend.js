async function saveData() {
     dishes = await getRequest("http://localhost:8000/api/dishes");
     dietary = await getRequest("http://localhost:8000/api/dietary");
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
    let form = document.querySelector("form");
    let country = form.elements.country;
    let time = form.elements.time;
    let dietary = form.elements.preference;
}

function submitFilter() {

}

async function createProductPage() {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let dish = await getRequest("http://localhost:8000/api/dishes/" + id);
    let container = document.getElementById("container")

    if (!dish) {
        container.innerHTML = `
        <a href="products.html">← Back to dishes</a>
            <h1>dish not found</h1>`;
        return;
    }

}

function createProfilePage(user) {

}

function singUp() {

}

function login() {
    
}

let users = [];
let dishes = [];
let dietary = [];

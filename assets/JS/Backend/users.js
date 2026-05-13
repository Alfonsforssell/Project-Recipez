export function getAllUsers() {
    let users = Deno.readTextFileSync("users.json");
    return JSON.parse(users);
}

export function getUserById(id) {
    let users = getAllUsers();
    for (let user of users) {
        if (user.id == id) {
            return user;
        }
    }
}

export function getFavouritesByUserId(id) {
    let users = getAllUsers();
    for (let user of users) {
        if (user.id == id) {
            return user.favourites;
        }
    }
}

function getHighestId() {
    let users = getAllUsers();
    let max = 1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id > max) {
            max = users[i].id;
        }
    }
    return max;
}

export function signUp(object) {
    let data = Deno.readTextFileSync("users.json");
    let parsedData = JSON.parse(data);
    let highestId = getHighestId();
    object.id = parseInt(highestId + 1);
    parsedData.push(object);
    let stringifiedData = JSON.stringify(parsedData);
    Deno.writeTextFileSync("data.json", stringifiedData);
}


export function logIn(username, password) {
    let users = getAllUsers();
    for (let user of users) {
        if (username == user.name && password == user.password) {
            return user;
        }
    }
    let loginForm = document.querySelector("#loginForm");
    let div = document.createElement("div");
    div.innerHTML = `<p class="invalid">Ogiltigt användarnamn eller lösenord</p>`
}

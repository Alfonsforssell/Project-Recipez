export function getAllUsers() {
    let users = Deno.readTextFileSync("users.json");
    return JSON.parse(users);
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

export function addUser(object) {
    let data = Deno.readTextFileSync("users.json");
    let parsedData = JSON.parse(data);
    let highestId = getHighestId();
    object.id = parseInt(highestId + 1);
    parsedData.push(object);
    let stringifiedData = JSON.stringify(parsedData);
    Deno.writeTextFileSync("data.json", stringifiedData);
}

export function getFavouritesByUserId(id) {

}


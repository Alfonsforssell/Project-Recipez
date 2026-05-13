export function getAllDiets() {
    const text = Deno.readTextFileSync("../../JSON/data.json");
    const data = JSON.parse(text);
    let diets = data.dietary;

    return diets;
}

export function getDietById(id) {
    const text = Deno.readTextFileSync("../../JSON/data.json");
    const data = JSON.parse(text);
    let diets = data.dietary;
    let matchedDiet;

    for (let diet of diets) {
        if (diet.id == id) {
            matchedDiet = diet;
        }
    }
    return matchedDiet;
}

/*
export function getDishesByDietId(id, request) {
    const text = Deno.readTextFileSync("data.json");
    const data = JSON.parse(text);
    let diets = data.dietary;
    let dishes = data.dishes
}
*/
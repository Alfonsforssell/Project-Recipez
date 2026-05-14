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

export function getDishesByDietId(id) {
    const text = Deno.readTextFileSync("data.json");
    const data = JSON.parse(text);
    let dishes = data.dishes;
    let matchedDishes = [];
     
    for (let dish of dishes) {
        if (dish.id === id) {
            matchedDishes.push(dish); 
        }
    }

    return matchedDishes;
}
export function getAllDishes() {
    const text = Deno.readTextFileSync("JSON/data.json");
    const data = JSON.parse(text);
    return data.dishes;
}

export function getAllCountries() {
    let allDishes = getAllDishes();
    let allCountries = [];
    for (let dish of allDishes) {
        if (allCountries.includes(dish.country)) continue;
        allCountries.push(dish.country);
    }
    return allCountries;
}

export function getDishById(id) {
    let allDishes = getAllDishes();
    let matchedDish;
    for (let dish of allDishes) {
        if (dish.id === id) {
            matchedDish = dish;
        }
    }
    return matchedDish;
}

export function getDishesByCountry(dishes, country) {
    let matchedDishes = [];
    for (let dish of dishes) {
        if (dish.country === country) {
            matchedDishes.push(dish);
        }
    }
    return matchedDishes;
}

export function getDishesByTime(dishes, time) {
    let matchedDishes = [];
    for (let dish of dishes) {
        if (dish.time <= time) {
            matchedDishes.push(dish);
        }
    }
    return matchedDishes;
}

export function getDishesByDietsId(dishes, dietsId) {
    let matchedDishes = [];

    for (let dietId of dietsId) {
        for (let dish of dishes) {
            if (dish.dietary.includes(parseInt(dietId))) {
                matchedDishes.push(dish);
            }
        }
    }

    return matchedDishes;
}

export function getDishesBySearch(searchWord) {
    let allDishes = getAllDishes();
    let matchedDishes = [];
    for (let dish of allDishes) {
        if (dish.name.toLowerCase().includes(searchWord.toLowerCase())
            || dish.country.toLowerCase().includes(searchWord.toLowerCase())
            || dish.description.toLowerCase().includes(searchWord.toLowerCase())) {
            matchedDishes.push(dish);
        }
    }
    return matchedDishes;
}

export function createDish(newDish) {
    const text = Deno.readTextFileSync("JSON/data.json");
    const data = JSON.parse(text);
    let dishes = data.dishes;

    newDish.id = dishes.length + 1;

    data.dishes.push(newDish);

    Deno.writeTextFileSync(
        "JSON/data.json",
        JSON.stringify(data, null, 2)
    );

    return newDish;
}

export function updateDish(id, newValues) {
    const text = Deno.readTextFileSync("JSON/data.json");
    const data = JSON.parse(text);
    let dishes = data.dishes;

    let matchedDish;

    for (let dish of dishes) {
        if (dish.id === id) {
            matchedDish = dish;
        }
    }

    if (!matchedDish) return false;

    for (let key in newValues) {
        matchedDish[key] = newValues[key];
    }

    Deno.writeTextFileSync(
        "JSON/data.json",
        JSON.stringify(data)
    );

    return true;
}

export function deleteDish(id) {
    const text = Deno.readTextFileSync("JSON/data.json");
    const data = JSON.parse(text);
    let dishes = data.dishes;
    let remainingDishes = [];

    let found = false;

    for (let dish of dishes) {
        if (dish.id === id) {
            found = true;
        } else {
            remainingDishes.push(dish);
        }
    }

    data.dishes = remainingDishes;

    Deno.writeTextFileSync(
        "JSON/data.json",
        JSON.stringify(data, null, 2)
    );

    return found;
}
export function getAllDishes() {
    let data = Deno.readTextFileSync("data.json");
    return JSON.parse(data.dishes);
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

export function getDishesByCountry(country) {
    let allDishes = getAllDishes(); 
    let matchedDishes = []; 
    for (let dish of allDishes) {
        if (dish.country === country) {
            matchedDishes.push(dish); 
        }
    }
    return matchedDishes; 
}

export function getDishesByTime(time) {
    let allDishes = getAllDishes(); 
    let matchedDishes = []; 
    for (let dish of allDishes) {
        if (dish.time <= time) {
            matchedDishes.push(dish); 
        }
    }
    return matchedDishes; 
}

export function getDishesByDiets(diets) {
    let allDishes = getAllDishes(); 
    let matchedDishes = []; 
    for (let dish of allDishes) {
        if (dish.diets === diets) {
            matchedDishes.push(dish); 
        }
    }
    return matchedDishes; 
}

export function getDishesBySearch(searchWord) {
    let allDishes = getAllDishes(); 
    let matchedDishes = [];
    for (let dish of dishes) {
        if (dish.name.toLowerCase().includes(searchWord.toLowerCase())
            || dish.country.toLowerCase().includes(searchWord.toLowerCase())
            || dish.description.toLowerCase().includes(searchWord.toLowerCase())) {
            matchedDishes.push(dish);
        }
    }
    return matchedDishes;
}

export function createDish(newDish) {
    let data = JSON.parse(Deno.readTextFileSync("data.json"));
    let dishes = data.dishes;

    newDish.id = dishes.length + 1; 

    data.dishes.push(newDish);

    Deno.writeTextFileSync(
        "data.json", 
        JSON.stringify(data, null, 2)
    );

    return newDish; 
}

export function updateDish(id, newValues) {
    let data = JSON.parse(Deno.readTextFileSync("data.json"));
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
        "data.json", 
        JSON.stringify(data)
    );

    return true;
}

export function deleteDish(id) {
    let data = JSON.parse(Deno.readTextFileSync("data.json"));
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
        "data.json", 
        JSON.stringify(data, null, 2)
    );

    return found;
}
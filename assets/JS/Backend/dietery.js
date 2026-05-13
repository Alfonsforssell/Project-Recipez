export function getAllDiets() {
    const text = Deno.readTextFileSync("data.json");
    const data = JSON.parse(text);
    let diets = data.dietary;

    return new Response(JSON.stringify(diets), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });
}

export function getDietById(id) {
    const text = Deno.readTextFileSync("data.json");
    const data = JSON.parse(text);
    let diets = data.dietary;
    let matchedDiet;

    for (let diet of diets) {
        if (diet.id == id) {
           let matchedDiet = diet; 
        }
    }
   return matchedDiet;
}
/*
export function SearchDiet(request) {
    const text = Deno.readTextFileSync("data.json");
    const data = JSON.parse(text);
    let diets = data.dietary;
    let url = new URL(request.url);

    let q = url.searchParams.get("q");
    let result = [];

    if (!q) return new Response("bad request", {
        status: 400,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });

    let search = q.toLowerCase();
    
    for (let diet of diets) {
        if (diet.name.toLowerCase().includes(search)) {
            result.push(diet);
        }
    }

     return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });
}
export function findDishByDietId (id, request) {
    const text = Deno.readTextFileSync("data.json");
    const data = JSON.parse(text);
    let diets = data.dietary;
    let url = new URL(request.url);
    
    
}
*/

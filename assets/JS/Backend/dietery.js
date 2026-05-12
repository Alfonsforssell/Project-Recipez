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

    for (let diet of diets) {
        if (diet.id == id) {
            return new Response(JSON.stringify(diet), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization"
                }
            });

        }
    }
}

export function SearchDiet(request) {

}
export function createDiet(request) {

}
export function patchDiet(reqest, id) {

}
export function deleteDiet(id) {

}
import * as diets from "./dietrys.js";
import * as users from "./users.js";
import * as dishes from "./dishes.js";

async function handler (request) {
    let url = new URL(request.url);
    let dishIdRoute = new URLPattern({ pathname: "dishes/:id" }); 
    let dietaryIdRoute = new URLPattern({ pathname: "dietary/:id" }); 
    let dietaryDishesRoute = new URLPattern({ pathname: "dietary/:id/dishes" });
    let userIdRoute = new URLPattern({ pathname: "users/:id" });
    let userFavoritesRoute = new URLPattern({ pathname: "users/:id/favorites" });

    if (request.method === "GET") {
        
    }

    if (request.method === "POST") {

    }

    if (request.method === "DELETE") {

    }

    if (request.method === "PATCH") {

    }
}
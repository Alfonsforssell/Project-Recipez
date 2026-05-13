import * as diets from "./dietrys.js";
import * as users from "./users.js";
import * as dishes from "./dishes.js";
import { serveDir } from "jsr:@std/http/file-server";

function validateJsonContent(request) {
    let content = request.headers.get("Content-Type");
    return content && content.includes("application/json");
}

function validateJsonAccept(request) {
    let accept = request.headers.get("Accept");
    return accept && accept.includes("application/json");
}

const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

async function handler(request) {
    let url = new URL(request.url);
    let dishIdRoute = new URLPattern({ pathname: "dishes/:id" });
    let dietaryIdRoute = new URLPattern({ pathname: "dietary/:id" });
    let dietaryDishesRoute = new URLPattern({ pathname: "dietary/:id/dishes" });
    let userIdRoute = new URLPattern({ pathname: "users/:id" });
    let userFavoritesRoute = new URLPattern({ pathname: "users/:id/favorites" });
    let dishIdMatch = dishIdRoute.exec(url);

    if (request.method === "GET") {

    }

    if (request.method === "POST") {

    }


    if (request.method === "DELETE") {
        if (dishIdMatch) {
            let id = dishIdMatch.pathname.groups.id;
            let deletedDish = dishes.deleteDish(id);

            if (!deletedDish) {
                return new Response(JSON.stringify({ error: "Dish not found" }), {
                    status: 404,
                    headers: HEADERS
                });
            }
            return new Response(JSON.stringify(deletedDish), {
                status: 200,
                headers: HEADERS
            });
        }
    }

    if (request.method === "PATCH") {

        
    }
}

Deno.serve(handler);
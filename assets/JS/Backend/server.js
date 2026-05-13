import * as diets from "./dietery.js";
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

    if (url.pathname.startsWith("/api/")) {
        if (request.method === "GET") {
            if (url.pathname === "/api/dishes") {
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406,
                    });
                }
                let filteredProducts = dishes.getAllDishes();
                let country = url.searchParams.get("country");
                let time = url.searchParams.get("time");
                let dietary = url.searchParams.get("dietary");
                if (country != null) {
                    filteredProducts = dishes.getDishesByCountry(filteredProducts, country);
                }
                if (time != null) {
                    filteredProducts = dishes.getDishesByTime(filteredProducts, time);
                }
                if (dietary != null) {
                    filteredProducts = dishes.getDishesByDietsId(filteredProducts, dietary);
                }

                return new Response(JSON.stringify(filteredProducts), {
                    status: 200,
                    headers: HEADERS,
                });
            }
            return new Response(JSON.stringify({ error: "Not found" }), {
                status: 404,
                headers: HEADERS,
            });
        }

        if (request.method === "POST") {
            if (url.pathname === "/api/dish") {
                if (!validateJsonContent(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 404
                    })
                }

                let newDish;
                try {
                    newDish = await request.json();
                } catch {
                    return new Response(JSON.stringify({ Error: "Bad Request" }), {
                        headers: HEADERS,
                        status: 400
                    });
                }

                if (!newDish.name || !newDish.description || !newDish.country ||
                    !newDish.time || !newDish.dietary || !newDish.ingredients ||
                    !newDish.instructions || !newDish.imageUrl) {
                    return new Response(JSON.stringify({ Error: "Bad Request" }), {
                        headers: HEADERS,
                        status: 400
                    });
                } else {
                    dishes.createDish(newDish);
                    return new Response(JSON.stringify({}), {
                        headers: HEADERS,
                        status: 201
                    });
                }
            }

            if (url.pathname === "/api/user") {
                if (!validateJsonContent(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 404
                    });
                }

                let newUser;
                try {
                    newUser = await request.json();
                } catch {
                    return new Response(JSON.stringify({ Error: "Bad Request" }), {
                        headers: HEADERS,
                        status: 400
                    });
                }

                if (!newUser.name || !newUser.password) {
                    return new Response(JSON.stringify({ Error: "Bad Request" }), {
                        headers: HEADERS,
                        status: 400
                    });
                }

                let allUsers = users.getAllUsers();
                for (let user of allUsers) {
                    if (newUser.name === user.name) {
                        return new Response(JSON.stringify({ Error: "Username already exists" }), {
                            headers: HEADERS,
                            status: 409
                        });
                    }
                }

                if (newUser.password !== newUser.repeatPassword) {
                    return new Response(JSON.stringify({ Error: "Password and repeat password not the same" }), {
                        headers: HEADERS,
                        status: 409
                    });
                } else {
                    users.signUp(newUser);
                    return new Response(JSON.stringify({}), {
                        headers: HEADERS,
                        status: 201
                    });
                }

            }
        }

        if (request.method === "DELETE") {
            if (dishIdMatch) {
                let id = dishIdMatch.pathname.groups.id;
                let deletedDish = dishes.deleteDish(id);

                if (!deletedDish) {
                    return new Response(JSON.stringify("Dish not found"), {
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
            if (dishIdMatch) {
                if (!validateJsonContent(request)) {
                    return new Response(JSON.stringify("Not acceptable"), {
                        status: 406,
                        headers: HEADERS
                    });
                }

                let id = dishIdMatch.pathname.groups.id;
                let newValues = await request.json()
                let updatedDish = dishes.updateDish(id, newValues);

                if (!updatedDish) {
                    return new Response(JSON.stringify("Not found"), {
                        status: 404,
                        headers: HEADERS
                    });
                }

                return new Response(JSON.stringify(updatedDish), {
                    status: 200,
                    headers: HEADERS
                });
            }
        }
    }
}


Deno.serve(handler);
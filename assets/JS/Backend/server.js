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
    let dishIdRoute = new URLPattern({ pathname: "/api/dishes/:id" });
    let dietaryIdRoute = new URLPattern({ pathname: "/api/dietary/:id" });
    let dietaryDishesRoute = new URLPattern({ pathname: "/api/dietary/:id/dishes" });
    let userIdRoute = new URLPattern({ pathname: "/api/users/:id" });
    let userFavoritesRoute = new URLPattern({ pathname: "/api/users/:id/favorites" });

    if (url.pathname.startsWith("/api/")) {
        if (request.method === "GET") {

            if (url.pathname === "/api/dishes") {       //Fungerar
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406,
                    });
                }
                let filteredProducts = dishes.getAllDishes();
                let country = url.searchParams.get("country");      //Fungerar
                let time = url.searchParams.get("time");      //Fungerar
                let dietary = url.searchParams.getAll("dietary");       //Fungerar
                if (country != null) {
                    filteredProducts = dishes.getDishesByCountry(filteredProducts, country);
                }
                if (time != null) {
                    filteredProducts = dishes.getDishesByTime(filteredProducts, time);
                }
                if (dietary.length > 0) {
                    filteredProducts = dishes.getDishesByDietsId(filteredProducts, dietary);
                }

                return new Response(JSON.stringify(filteredProducts), {
                    status: 200,
                    headers: HEADERS,
                });
            }

            if (url.pathname === "/api/dishes/search") {      //Fungerar
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406,
                    });
                }

                let query = url.searchParams.get("q");

                if (!query) {
                    return new Response(JSON.stringify({ Error: "Bad Request" }), {
                        headers: HEADERS,
                        status: 400
                    });
                }

                let matchedDishes = dishes.getDishesBySearch(query);

                return new Response(JSON.stringify(matchedDishes), {
                    headers: HEADERS,
                    status: 200
                })
            }

            if (url.pathname === "/api/dishes/countries") {      //Fungerar
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406,
                    });
                }

                let countries = dishes.getAllCountries(); 

                return new Response(JSON.stringify(countries), {
                    headers: HEADERS,
                    status: 200
                })
            }

            if (dishIdRoute.test(url)) {      //Fungerar
                let match = dishIdRoute.exec(url);
                let id = parseInt(match.pathname.groups.id);

                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406,
                    });
                }

                let dish = dishes.getDishById(id);
                if (!dish) {
                    return new Response(JSON.stringify({ Error: "Not Found" }), {
                        headers: HEADERS,
                        status: 404
                    });
                }

                return new Response(JSON.stringify(dish), {
                    headers: HEADERS,
                    status: 200
                })
            }
        }

        if (request.method === "POST") {
            if (url.pathname === "/api/dishes") {
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

            if (url.pathname === "/api/users") {
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
                    delete newUser.repeatPassword;
                    users.signUp(newUser);
                    return new Response(JSON.stringify({}), {
                        headers: HEADERS,
                        status: 201
                    });
                }

            }
        }

        if (request.method === "DELETE") {
            if (dishIdRoute.test(url)) {
                let dishIdMatch = dishIdRoute.exec(url);
                let id = parseInt(dishIdMatch.pathname.groups.id);
                let deletedDish = dishes.deleteDish(id);

                if (!deletedDish) {
                    return new Response(JSON.stringify({ Error: "Dish not found" }), {
                        status: 404,
                        headers: HEADERS
                    });
                }
                return new Response(null, {
                    status: 204,
                    headers: HEADERS
                });
            }
        }

        if (request.method === "PATCH") {
            if (dishIdRoute.test(url)) {
                if (!validateJsonContent(request)) {
                    return new Response(JSON.stringify({ Error: "Not acceptable" }), {
                        status: 406,
                        headers: HEADERS
                    });
                }
                let dishIdMatch = dishIdRoute.exec(url);
                let id = parseInt(dishIdMatch.pathname.groups.id);
                try {
                    let newValues = await request.json();
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
                } catch (error) {
                    return new Response(JSON.stringify({ Error: "Not acceptable"}), {
                        status: 406,
                        headers: HEADERS
                    });
                }
            }
        }
        return new Response(JSON.stringify({ Error: "Not found" }), {
            status: 404,
            headers: HEADERS,
        });
    }
}

Deno.serve(handler);
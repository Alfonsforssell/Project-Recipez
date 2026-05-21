import * as diets from "./dietery.js";
import * as users from "./users.js";
import * as dishes from "./dishes.js";
import { serveDir, serveFile } from "jsr:@std/http/file-server";

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
};

function getLoggedInUser(request) {
    let cookieHeader = request.headers.get("cookie"); 

    if (!cookieHeader) {
        return null;
    }

    let match = cookieHeader.match(/session_id=([^;]+)/);

    if (!match) {
        return null;
    }
    
    let sessionId = match[1];
    let allUsers = users.getAllUsers();

    for (let user of allUsers) {
        if (user.cookie === sessionId) {
            return user;
        }
    }
    return null;
}

async function handler(request) {
    let url = new URL(request.url);
    let dishIdRoute = new URLPattern({ pathname: "/api/dishes/:id" });
    let dietaryIdRoute = new URLPattern({ pathname: "/api/dietary/:id" });
    let dietaryDishesRoute = new URLPattern({ pathname: "/api/dietary/:id/dishes" });

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
                let dietary = url.searchParams.getAll("dietary");
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

            if (url.pathname === "/api/dishes/search") {
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

            if (url.pathname === "/api/dishes/countries") {
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

            if (url.pathname === "/api/profile") {

                let user = getLoggedInUser(request);

                if (!user) {
                    return new Response(JSON.stringify({ Error: "Unauthorized" }), {
                        headers: HEADERS,
                        status: 401
                    });
                }

                return new Response(JSON.stringify(user), {
                    headers: HEADERS,
                    status: 200
                })
            }

            if (url.pathname === "/api/favourites") {
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406,
                    });
                }
                let user = getLoggedInUser(request); 
                
                if (!user) {
                    return new Response(JSON.stringify({ Error: "Unathorized" }), {
                        headers: HEADERS,
                        status: 401
                    })
                }

                return new Response(JSON.stringify(user.favorites), {
                    headers: HEADERS,
                    status: 200
                })
            }

            if (dishIdRoute.test(url)) {
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

            if (url.pathname === "/api/dietary") {
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406
                    });
                }
                let allDiets = diets.getAllDiets();

                return new Response(JSON.stringify(allDiets), {
                    headers: HEADERS,
                    status: 200
                });
            }
            if (dietaryDishesRoute.test(url)) {
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406
                    });
                }

                let match = dietaryDishesRoute.exec(url);
                let id = parseInt(match.pathname.groups.id);

                let diet = diets.getDietById(id);

                if (!diet) {
                    return new Response(JSON.stringify({ Error: "Not Found" }), {
                        headers: HEADERS,
                        status: 404
                    });
                }

                let matchedDishes = diets.getDishesByDietId(id);

                return new Response(JSON.stringify(matchedDishes), {
                    headers: HEADERS,
                    status: 200
                });
            }

            if (dietaryIdRoute.test(url)) {
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406
                    });
                }

                let match = dietaryIdRoute.exec(url);
                let id = parseInt(match.pathname.groups.id);

                let diet = diets.getDietById(id);

                if (!diet) {
                    return new Response(JSON.stringify({ Error: "Not Found" }), {
                        headers: HEADERS,
                        status: 404
                    });
                }

                return new Response(JSON.stringify(diet), {
                    headers: HEADERS,
                    status: 200
                });
            }

            if (url.pathname === "/api/users") {
                if (!validateJsonAccept(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406,
                    });
                }
                let usrs = users.getAllUsers();
                return new Response(JSON.stringify(usrs), {
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

                let user = getLoggedInUser(request);

                if (!user) {
                    return new Response(JSON.stringify({ Error: "Unauthorized" }), {
                        headers: HEADERS,
                        status: 401
                    });
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

            if (url.pathname === "/api/login") {
                if (!validateJsonContent(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 404
                    });
                }

                let userData;
                try {
                    userData = await request.json();
                } catch {
                    return new Response(JSON.stringify({ Error: "Bad Request" }), {
                        headers: HEADERS,
                        status: 400
                    });
                }

                let allUsers = users.getAllUsers();

                let matchedUser = null;

                for (let user of allUsers) {
                    if (user.name === userData.name &&
                        user.password === userData.password) {
                        matchedUser = user;
                    }
                }

                if (!matchedUser) {
                    return new Response(JSON.stringify({ Error: "Wrong username or password" }), {
                        headers: HEADERS,
                        status: 401
                    });
                }

                let sessionId = crypto.randomUUID();
                matchedUser.cookie = sessionId;
                users.saveUsers(allUsers);
                return new Response(JSON.stringify({ message: "Logged in" }), {
                    headers: {
                        "Content-Type": "application/json",
                        "Set-Cookie": `session_id=${sessionId}; Max-Age=86400; Path=/`
                    },
                    status: 200
                });
            }

            if (url.pathname === "/api/logout") {
                let user = getLoggedInUser(request);

                if (user) {
                    user.cookie = null;
                    users.saveUsers(users.getAllUsers());
                }
                console.log(user);
                return new Response(JSON.stringify({ message: "logout succeded" }), {
                    headers: {
                        "Content-Type": "application/json",
                        "Set-Cookie": "session_id=; Max-Age=0; Path=/"
                    },
                    status: 200 
                });
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
            if (url.pathname == "/api/favourites") {
                if (!validateJsonContent(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 404
                    });
                }
                let user = getLoggedInUser(request);

                if (!user) {
                    return new Response(JSON.stringify({ Error: "Unauthorized" }), {
                        headers: HEADERS,
                        status: 401
                    });
                }

                let body = await request.json();
                let updatedFav = users.addFav(user.id, body.id);

                if (!updatedFav) {
                    return new Response(JSON.stringify({ Error: "Bad Request" }), {
                        headers: HEADERS,
                        status: 400
                    });
                }
                return new Response(JSON.stringify(updatedFav), {
                    headers: HEADERS,
                    status: 200
                });

            }
        }

        if (request.method === "DELETE") {
            if (dishIdRoute.test(url)) {
                let dishIdMatch = dishIdRoute.exec(url);

                let user = getLoggedInUser(request);

                if (!user) {
                    return new Response(JSON.stringify({ Error: "Unauthorized" }), {
                        headers: HEADERS,
                        status: 401
                    });
                }

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
            if (url.pathname == "/api/favourites") {
                if (!validateJsonContent(request)) {
                    return new Response(JSON.stringify({ Error: "Not Acceptable" }), {
                        headers: HEADERS,
                        status: 406
                    });
                }
                let user = getLoggedInUser(request);

                if (!user) {
                    return new Response(JSON.stringify({ Error: "Unauthorized" }), {
                        headers: HEADERS,
                        status: 401
                    });
                }

                let body = await request.json();
                let updatedFav = users.removeFav(user.id, body.id);

                 if (!updatedFav) {
                    return new Response(JSON.stringify({ Error: "Bad Request" }), {
                        headers: HEADERS,
                        status: 400
                    });
                }
                return new Response(null, {
                    headers: HEADERS,
                    status: 204
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

                let user = getLoggedInUser(request);
                if (!user) {
                    return new Response(JSON.stringify({ Error: "Unauthorized" }), {
                        headers: HEADERS,
                        status: 401
                    });
                }

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
                    return new Response(JSON.stringify({ Error: "Not acceptable" }), {
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

    if (url.pathname == "/") {
        return serveFile(request, "assets/html/index.html");
    }

    return serveDir(request, {
        fsRoot: "assets",
        urlRoot: "assets",
        showIndex: true,
    });
}

Deno.serve(handler);
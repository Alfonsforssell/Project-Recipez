async function getRequest(url) {
    let response;
        try {
            response = await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                }
            })
            if (!response.ok) {
                console.log("HTTP ERROR: " + response.status);
                return;
            }
        }
        catch (error) {
            console.log("NETWORK ERROR: " + error);
            return;
        }
        return await response.json();
}

async function postRequest(url, body) {
        let response;
        try {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error("HTTP ERROR: " + response.status);
            }
        }
        catch (error) {
            throw new Error("NETWORK ERROR: " + error.message);
        }
    }

    async function patchRequest(url, body) {
        let response;
        try {
            response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),

            })
            if (!response.ok) {
                throw new Error("HTTP ERROR: " + response.status);
            }
        }
        catch (error) {
            throw new Error("NETWORK ERROR: " + error.message)
        }
    }

    async function deleteRequest(url) {
        let response;
        try {
            response = await fetch(url, {
                method: "DELETE",
                headers: {
                },
            });
            if (!response.ok) {
                throw new Error("HTTP ERROR: " + response.status);
            }
        }
        catch (error) {
            throw new Error("NETWORK ERROR: " + error.message);
        }
    }
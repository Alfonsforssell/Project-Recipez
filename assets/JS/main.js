async function init() {
    let container = document.querySelector("#body");
    try {
        container.innerHTML = "<p>Laddar ...</p>";
        await saveData();
        checkLoginStatus();
        createProducts();
        createForm();
        search();
        submitFilter();
        favorite();
    } catch (error) {
        container.innerHTML = ` 
        <h1>Kunde inte ladda sidan...</h1>
        <p>(Försök igen)</p>
        `;
    }
}

init();
async function init() {
    let container = document.getElementById("cards");
    try {
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